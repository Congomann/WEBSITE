import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, LiveSession, LiveServerMessage, Modality, Blob } from '@google/genai';
import { encode, decode, decodeAudioData } from '../utils/audioUtils';
import SEO from '../components/SEO';

type ConversationState = 'idle' | 'connecting' | 'active' | 'error';
type SpeakingState = 'user' | 'model' | 'idle';

interface Transcription {
    author: 'You' | 'Assistant';
    text: string;
    isFinal: boolean;
}

function createPcmBlob(data: Float32Array): Blob {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
        int16[i] = data[i] * 32768;
    }
    return {
        data: encode(new Uint8Array(int16.buffer)),
        mimeType: 'audio/pcm;rate=16000',
    };
}

const LiveAssistantPage: React.FC = () => {
    const [conversationState, setConversationState] = useState<ConversationState>('idle');
    const [speakingState, setSpeakingState] = useState<SpeakingState>('idle');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [transcriptionHistory, setTranscriptionHistory] = useState<Transcription[]>([]);

    const sessionPromiseRef = useRef<Promise<LiveSession> | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const inputAudioContextRef = useRef<AudioContext | null>(null);
    const outputAudioContextRef = useRef<AudioContext | null>(null);
    const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
    const mediaStreamSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

    const nextStartTimeRef = useRef<number>(0);
    const audioSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

    const stopConversation = useCallback(() => {
        if (sessionPromiseRef.current) {
            sessionPromiseRef.current.then(session => {
                session.close();
            }).catch(e => console.error("Error closing session:", e));
            sessionPromiseRef.current = null;
        }

        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach(track => track.stop());
            mediaStreamRef.current = null;
        }

        if (scriptProcessorRef.current) {
            try {
                scriptProcessorRef.current.disconnect();
            } catch (e) {
                console.warn("Error disconnecting script processor:", e);
            }
            scriptProcessorRef.current = null;
        }

        if (mediaStreamSourceRef.current) {
            try {
                mediaStreamSourceRef.current.disconnect();
            } catch (e) {
                console.warn("Error disconnecting media stream source:", e);
            }
            mediaStreamSourceRef.current = null;
        }

        if (inputAudioContextRef.current && inputAudioContextRef.current.state !== 'closed') {
            inputAudioContextRef.current.close();
        }
        if (outputAudioContextRef.current && outputAudioContextRef.current.state !== 'closed') {
            outputAudioContextRef.current.close();
        }

        setConversationState('idle');
        setSpeakingState('idle');
    }, []);

    // Effect for cleanup on unmount
    useEffect(() => {
        return () => {
            stopConversation();
        };
    }, [stopConversation]);

    const handleStartConversation = async () => {
        setConversationState('connecting');
        setErrorMessage(null);
        setTranscriptionHistory([]);

        try {
            mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
        } catch (error) {
            console.error('Microphone access denied:', error);
            setErrorMessage('Microphone access is required to use the AI Assistant. Please enable it in your browser settings.');
            setConversationState('error');
            return;
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
        
        inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
        outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        
        const outputNode = outputAudioContextRef.current.createGain();
        outputNode.connect(outputAudioContextRef.current.destination);

        sessionPromiseRef.current = ai.live.connect({
            model: 'gemini-2.5-flash-native-audio-preview-09-2025',
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
                },
                systemInstruction: `You are a friendly and helpful customer support agent for New Holland Financial Group. Answer questions about insurance products (life, auto, home, health, group benefits), financial planning, and real estate. Keep your answers concise and clear. Do not provide financial advice, but explain concepts and product features.`,
                inputAudioTranscription: {},
                outputAudioTranscription: {},
            },
            callbacks: {
                onopen: () => {
                    setConversationState('active');
                    setSpeakingState('user');
                    
                    const source = inputAudioContextRef.current!.createMediaStreamSource(mediaStreamRef.current!);
                    mediaStreamSourceRef.current = source;
                    
                    const scriptProcessor = inputAudioContextRef.current!.createScriptProcessor(4096, 1, 1);
                    scriptProcessorRef.current = scriptProcessor;

                    scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
                        const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                        const pcmBlob = createPcmBlob(inputData);
                        
                        if (sessionPromiseRef.current) {
                           sessionPromiseRef.current.then((session) => {
                                session.sendRealtimeInput({ media: pcmBlob });
                           }).catch(e => console.error("Failed to send realtime input:", e));
                        }
                    };

                    source.connect(scriptProcessor);
                    scriptProcessor.connect(inputAudioContextRef.current!.destination);
                },
                onmessage: async (message: LiveServerMessage) => {
                    // Handle Transcription
                    if (message.serverContent?.inputTranscription) {
                        const { text, isFinal } = message.serverContent.inputTranscription;
                        setTranscriptionHistory(prev => {
                            const last = prev[prev.length - 1];
                            if (last && last.author === 'You' && !last.isFinal) {
                                return [...prev.slice(0, -1), { author: 'You', text, isFinal }];
                            }
                            return [...prev, { author: 'You', text, isFinal }];
                        });
                    }
                    if (message.serverContent?.outputTranscription) {
                        const { text, isFinal } = message.serverContent.outputTranscription;
                        setSpeakingState('model');
                        setTranscriptionHistory(prev => {
                            const last = prev[prev.length - 1];
                            if (last && last.author === 'Assistant' && !last.isFinal) {
                                return [...prev.slice(0, -1), { author: 'Assistant', text, isFinal }];
                            }
                            return [...prev, { author: 'Assistant', text, isFinal }];
                        });
                    }
                    if (message.serverContent?.turnComplete) {
                        setSpeakingState('user');
                    }

                    // Handle Audio
                    const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
                    if (base64Audio) {
                        const outputAudioContext = outputAudioContextRef.current!;
                        nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputAudioContext.currentTime);

                        const audioBuffer = await decodeAudioData(decode(base64Audio), outputAudioContext, 24000, 1);
                        
                        const source = outputAudioContext.createBufferSource();
                        source.buffer = audioBuffer;
                        source.connect(outputNode);
                        source.addEventListener('ended', () => {
                            audioSourcesRef.current.delete(source);
                            if (audioSourcesRef.current.size === 0) {
                                setSpeakingState('user');
                            }
                        });
                        
                        source.start(nextStartTimeRef.current);
                        nextStartTimeRef.current += audioBuffer.duration;
                        audioSourcesRef.current.add(source);
                    }

                    const interrupted = message.serverContent?.interrupted;
                    if (interrupted) {
                        for (const source of audioSourcesRef.current.values()) {
                            source.stop();
                        }
                        audioSourcesRef.current.clear();
                        nextStartTimeRef.current = 0;
                        setSpeakingState('user');
                    }
                },
                onerror: (e: ErrorEvent) => {
                    console.error('Live session error:', e);
                    setErrorMessage('A connection error occurred. Please try again.');
                    setConversationState('error');
                    stopConversation();
                },
                onclose: () => {
                    stopConversation();
                },
            },
        });
    };
    
    const renderMicButton = () => {
        const MicIcon = () => (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8h-1a6 6 0 11-5.002 5.917L11 15v2.071a1 1 0 01-2 0V15l-.002-.083z" clipRule="evenodd" />
            </svg>
        );

        let buttonText = "Start Conversation";
        let statusText = "Ready to assist";
        let buttonAction = handleStartConversation;
        let isButtonDisabled = false;
        let showPulse = false;

        switch (conversationState) {
            case 'connecting':
                buttonText = "Connecting...";
                statusText = "Initializing session...";
                isButtonDisabled = true;
                break;
            case 'active':
                buttonText = "Stop Conversation";
                statusText = speakingState === 'model' ? "Assistant is speaking..." : "Listening...";
                buttonAction = stopConversation;
                showPulse = speakingState === 'user';
                break;
            case 'error':
                 buttonText = "Try Again";
                 statusText = "An error occurred";
                 buttonAction = handleStartConversation;
                break;
        }

        return (
            <div className="flex flex-col items-center">
                 <button 
                    onClick={buttonAction} 
                    disabled={isButtonDisabled}
                    className="relative w-24 h-24 bg-brand-gold text-brand-blue rounded-full flex items-center justify-center shadow-lg transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
                 >
                    {showPulse && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>}
                    <MicIcon />
                </button>
                <p className="mt-4 text-lg font-semibold text-brand-blue">{buttonText}</p>
                <p className="text-gray-600">{statusText}</p>
            </div>
        );
    };

    return (
        <div className="bg-brand-light min-h-[calc(100vh-200px)]">
            <SEO title="AI Assistant" description="Talk to our AI-powered financial assistant for real-time answers to your questions." />
            <section className="bg-white py-12 shadow-sm">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl font-extrabold text-brand-blue">AI-Powered Financial Assistant</h1>
                    <p className="text-lg text-gray-600 mt-2 max-w-3xl mx-auto">
                        Get instant answers to your insurance and financial questions. Start a conversation with our real-time AI assistant.
                    </p>
                </div>
            </section>
            <div className="container mx-auto px-6 py-12">
                <div className="max-w-3xl mx-auto">
                    <div className="flex justify-center mb-8">
                        {renderMicButton()}
                    </div>
                    {errorMessage && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6" role="alert">
                            <p className="font-bold">Error</p>
                            <p>{errorMessage}</p>
                        </div>
                    )}
                    <div className="bg-white rounded-lg shadow-xl p-6 min-h-[20rem] max-h-[50vh] overflow-y-auto space-y-4">
                        {transcriptionHistory.length === 0 && conversationState === 'idle' && (
                            <div className="flex items-center justify-center h-full text-gray-500">
                                <p>Your conversation will appear here...</p>
                            </div>
                        )}
                        {transcriptionHistory.map((item, index) => (
                            <div key={index} className={`flex ${item.author === 'You' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-lg ${item.author === 'You' ? 'bg-brand-blue text-white' : 'bg-gray-200 text-gray-800'}`}>
                                    <p className="font-bold text-sm mb-1">{item.author}</p>
                                    <p>{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveAssistantPage;
