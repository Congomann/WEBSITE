
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleGenAI, LiveSession, LiveServerMessage, Modality, Blob, FunctionDeclaration, Type } from '@google/genai';
import SEO from '../components/SEO';
import { encode, decode, decodeAudioData } from '../utils/audioUtils';

// Function declaration for the navigation tool
const navigationFunctionDeclaration: FunctionDeclaration = {
  name: 'navigate',
  parameters: {
    type: Type.OBJECT,
    description: 'Navigates the user to a different page on the website.',
    properties: {
      path: {
        type: Type.STRING,
        description: `The path to navigate to. Must be one of the following: "/", "/about", "/advisors", "/resources", "/products", "/cart", "/contact", "/privacy-policy", "/join-our-team", "/services/life", "/services/auto", "/services/property", "/services/real-estate", "/services/health", "/services/group-benefits", "/ai-assistant"`,
      },
    },
    required: ['path'],
  },
};

type ConversationState = 'idle' | 'connecting' | 'active' | 'error';
interface Transcription {
    author: 'You' | 'Assistant';
    text: string;
}

const AVAILABLE_VOICES = ['Zephyr', 'Puck', 'Charon', 'Kore', 'Fenrir'];

const LiveAssistantPage: React.FC = () => {
    const [conversationState, setConversationState] = useState<ConversationState>('idle');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [transcriptionHistory, setTranscriptionHistory] = useState<Transcription[]>([]);
    const [currentTurn, setCurrentTurn] = useState<{ you: string; assistant: string }>({ you: '', assistant: '' });
    const [selectedVoice, setSelectedVoice] = useState<string>(() => localStorage.getItem('nhf-assistant-voice') || AVAILABLE_VOICES[0]);

    const navigate = useNavigate();
    
    const sessionPromiseRef = useRef<Promise<LiveSession> | null>(null);
    const inputAudioContextRef = useRef<AudioContext | null>(null);
    const outputAudioContextRef = useRef<AudioContext | null>(null);
    const microphoneStreamRef = useRef<MediaStream | null>(null);
    const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
    const mediaSourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const outputSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
    const nextStartTimeRef = useRef(0);
    const historyEndRef = useRef<HTMLDivElement>(null);

    const stopSession = useCallback(async () => {
        setConversationState('idle');
        
        // Stop microphone processing
        if (microphoneStreamRef.current) {
            microphoneStreamRef.current.getTracks().forEach(track => track.stop());
            microphoneStreamRef.current = null;
        }
        if (scriptProcessorRef.current) {
            scriptProcessorRef.current.disconnect();
            scriptProcessorRef.current = null;
        }
        if (mediaSourceNodeRef.current) {
            mediaSourceNodeRef.current.disconnect();
            mediaSourceNodeRef.current = null;
        }
        if (inputAudioContextRef.current && inputAudioContextRef.current.state !== 'closed') {
            await inputAudioContextRef.current.close();
        }
        inputAudioContextRef.current = null;

        // Stop audio output
        if (outputAudioContextRef.current && outputAudioContextRef.current.state !== 'closed') {
            await outputAudioContextRef.current.close();
        }
        outputAudioContextRef.current = null;
        outputSourcesRef.current.forEach(source => source.stop());
        outputSourcesRef.current.clear();
        nextStartTimeRef.current = 0;

        // Close Gemini session
        if (sessionPromiseRef.current) {
            try {
                const session = await sessionPromiseRef.current;
                session.close();
            } catch (error) {
                console.error("Error closing session:", error);
            } finally {
                sessionPromiseRef.current = null;
            }
        }
    }, []);

    const startSession = useCallback(async () => {
        stopSession(); // Ensure any previous session is cleaned up
        setConversationState('connecting');
        setErrorMessage(null);
        setTranscriptionHistory([]);
        setCurrentTurn({ you: '', assistant: '' });

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            
            // Set up audio contexts
            inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
            outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            
            const sessionPromise = ai.live.connect({
                model: 'gemini-2.5-flash-native-audio-preview-09-2025',
                config: {
                    responseModalities: [Modality.AUDIO],
                    systemInstruction: `You are a friendly and helpful customer support agent for New Holland Financial Group. Answer questions about insurance products (life, auto, home, health, group benefits), financial planning, and real estate. Keep your answers concise and clear. Do not provide financial advice, but explain concepts and product features. You can also help users navigate the website. For example, if a user asks 'take me to the about page', you should call the navigate function with the path '/about'.`,
                    tools: [{ functionDeclarations: [navigationFunctionDeclaration] }],
                    speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: selectedVoice } } },
                    inputAudioTranscription: {},
                    outputAudioTranscription: {},
                },
                callbacks: {
                    onopen: async () => {
                        setConversationState('active');
                        microphoneStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
                        const source = inputAudioContextRef.current!.createMediaStreamSource(microphoneStreamRef.current);
                        mediaSourceNodeRef.current = source;
                        const scriptProcessor = inputAudioContextRef.current!.createScriptProcessor(4096, 1, 1);
                        scriptProcessorRef.current = scriptProcessor;

                        scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
                            const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                            const pcmBlob: Blob = {
                                data: encode(new Uint8Array(new Int16Array(inputData.map(x => x * 32768)).buffer)),
                                mimeType: 'audio/pcm;rate=16000',
                            };
                            sessionPromise.then((session) => {
                                session.sendRealtimeInput({ media: pcmBlob });
                            });
                        };
                        source.connect(scriptProcessor);
                        scriptProcessor.connect(inputAudioContextRef.current!.destination);
                    },
                    onmessage: async (message: LiveServerMessage) => {
                        // Handle transcriptions
                        if (message.serverContent?.inputTranscription) {
                            setCurrentTurn(prev => ({ ...prev, you: prev.you + message.serverContent!.inputTranscription.text }));
                        }
                        if (message.serverContent?.outputTranscription) {
                            setCurrentTurn(prev => ({ ...prev, assistant: prev.assistant + message.serverContent!.outputTranscription.text }));
                        }
                        if (message.serverContent?.turnComplete) {
                            setTranscriptionHistory(prev => [...prev, { author: 'You', text: currentTurn.you }, { author: 'Assistant', text: currentTurn.assistant }]);
                            setCurrentTurn({ you: '', assistant: '' });
                        }

                        // Handle audio output
                        const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
                        if (base64Audio && outputAudioContextRef.current) {
                            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputAudioContextRef.current.currentTime);
                            const audioBuffer = await decodeAudioData(decode(base64Audio), outputAudioContextRef.current, 24000, 1);
                            const source = outputAudioContextRef.current.createBufferSource();
                            source.buffer = audioBuffer;
                            source.connect(outputAudioContextRef.current.destination);
                            source.addEventListener('ended', () => { outputSourcesRef.current.delete(source); });
                            source.start(nextStartTimeRef.current);
                            nextStartTimeRef.current += audioBuffer.duration;
                            outputSourcesRef.current.add(source);
                        }

                        // Handle function calls
                        if (message.toolCall?.functionCalls) {
                            for (const fc of message.toolCall.functionCalls) {
                                if (fc.name === 'navigate' && typeof fc.args.path === 'string') {
                                    setTimeout(() => navigate(fc.args.path), 100);
                                    sessionPromise.then((session) => {
                                        session.sendToolResponse({ functionResponses: { id: fc.id, name: fc.name, response: { result: "ok" } } });
                                    });
                                }
                            }
                        }
                    },
                    onerror: (e: ErrorEvent) => {
                        console.error('Session error:', e);
                        setErrorMessage('A connection error occurred. Please try again.');
                        stopSession();
                    },
                    onclose: (e: CloseEvent) => {
                        console.log('Session closed');
                        stopSession();
                    },
                },
            });
            sessionPromiseRef.current = sessionPromise;

        } catch (error: any) {
            console.error("Failed to start session:", error);
            setErrorMessage(error.message || "Could not start the assistant. Please check microphone permissions.");
            setConversationState('error');
        }
    }, [navigate, selectedVoice, stopSession]);
    
    useEffect(() => {
        return () => {
            stopSession();
        };
    }, [stopSession]);
    
    useEffect(() => {
      historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [transcriptionHistory, currentTurn]);

    const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newVoice = e.target.value;
        setSelectedVoice(newVoice);
        localStorage.setItem('nhf-assistant-voice', newVoice);
    };

    const MicIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8h-1a6 6 0 11-5.002 5.917L11 15v2.071a1 1 0 01-2 0V15l-.002-.083z" clipRule="evenodd" /></svg> );

    let statusText: string;
    switch (conversationState) {
        case 'connecting': statusText = 'Connecting...'; break;
        case 'active': statusText = 'Listening...'; break;
        case 'error': statusText = 'An error occurred'; break;
        default: statusText = 'Ready to assist';
    }

    return (
        <div className="bg-brand-light min-h-[calc(100vh-200px)]">
            <SEO title="AI Assistant" description="Talk to our AI-powered financial assistant for real-time answers to your questions." />
            <section className="bg-white py-12 shadow-sm">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl font-extrabold text-brand-blue">AI-Powered Financial Assistant</h1>
                    <p className="text-lg text-gray-600 mt-2 max-w-3xl mx-auto">
                        Get instant answers by speaking with our real-time AI assistant.
                    </p>
                    <div className="mt-6 max-w-xs mx-auto">
                        <label htmlFor="voice-select" className="block text-sm font-medium text-gray-700 mb-1">Assistant Voice</label>
                        <select
                            id="voice-select"
                            value={selectedVoice}
                            onChange={handleVoiceChange}
                            disabled={conversationState !== 'idle'}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm rounded-md disabled:bg-gray-200 bg-white text-gray-900"
                        >
                           {AVAILABLE_VOICES.map(voice => <option key={voice} value={voice}>{voice}</option>)}
                        </select>
                    </div>
                </div>
            </section>
            <div className="container mx-auto px-6 py-12">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-lg shadow-xl p-4 flex flex-col h-[60vh]">
                         <div className="flex-grow overflow-y-auto space-y-4 p-4">
                            {transcriptionHistory.length === 0 && !currentTurn.you && !currentTurn.assistant ? (
                                <div className="flex items-center justify-center h-full text-gray-500">
                                    <p>Your conversation will appear here...</p>
                                </div>
                            ) : (
                                <>
                                    {transcriptionHistory.map((item, index) => (
                                        <div key={index} className={`flex ${item.author === 'You' ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[80%] p-3 rounded-lg shadow-sm ${item.author === 'You' ? 'bg-brand-blue text-white' : 'bg-gray-200 text-gray-800'}`}>
                                                <p className="font-bold text-sm mb-1">{item.author}</p>
                                                <p>{item.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {currentTurn.you && (
                                         <div className="flex justify-end">
                                            <div className="max-w-[80%] p-3 rounded-lg shadow-sm bg-brand-blue/80 text-white/90">
                                                <p className="font-bold text-sm mb-1">You</p>
                                                <p className="italic">{currentTurn.you}</p>
                                            </div>
                                        </div>
                                    )}
                                    {currentTurn.assistant && (
                                         <div className="flex justify-start">
                                            <div className="max-w-[80%] p-3 rounded-lg shadow-sm bg-gray-200/80 text-gray-800/90">
                                                <p className="font-bold text-sm mb-1">Assistant</p>
                                                <p className="italic">{currentTurn.assistant}</p>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                            <div ref={historyEndRef} />
                        </div>
                         <div className="flex-shrink-0 pt-4 border-t flex flex-col items-center justify-center">
                            <p className="text-center text-sm text-gray-600 mb-4 h-5">{statusText}</p>
                            {errorMessage && (
                                <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-2 rounded-md mb-4 text-sm w-full" role="alert">
                                    <p>{errorMessage}</p>
                                </div>
                            )}
                            <button 
                                type="button"
                                onClick={conversationState === 'active' || conversationState === 'connecting' ? stopSession : startSession}
                                className={`relative w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-105 ${conversationState === 'active' ? 'bg-red-500 text-white' : 'bg-brand-gold text-brand-blue'}`}
                                aria-label={conversationState === 'active' ? 'Stop conversation' : 'Start conversation'}
                            >
                                {conversationState === 'active' && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>}
                                {conversationState === 'connecting' ? <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div> : <MicIcon />}
                            </button>
                            <p className="text-xs text-gray-500 mt-3">
                                {conversationState === 'active' || conversationState === 'connecting' ? "Click mic to stop" : "Click mic to speak"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveAssistantPage;