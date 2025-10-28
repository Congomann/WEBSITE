import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface GeminiAiAssistantModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type Message = {
    role: 'user' | 'model';
    text: string;
};

const GeminiIcon = () => (
    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-lg flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.96 7.53c-1.3-2.25-4.62-2.25-5.92 0L4.2 12l2.84 4.47c1.3 2.25 4.62 2.25 5.92 0L15.8 12l-2.84-4.47zM8.34 3.34c3.46-6 12.87-6 16.33 0l-2.84 4.47c-1.3-2.25-4.62-2.25-5.92 0L13.07 12l2.84 4.47c1.3 2.25 4.62 2.25 5.92 0l2.84 4.47c-3.46 6-12.87 6-16.33 0l2.84-4.47c1.3 2.25 4.62 2.25 5.92 0L10.93 12 8.09 7.53 5.25 3.34h3.09z" />
        </svg>
    </div>
);

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
    </svg>
);


const GeminiAiAssistantModal: React.FC<GeminiAiAssistantModalProps> = ({ isOpen, onClose }) => {
    const { user } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            setMessages([
                { role: 'model', text: `Hello ${user?.name?.split(' ')[0]}! As your AI assistant, I have access to relevant CRM data for your role. How can I help you today?` }
            ]);
        } else {
            // Reset state on close
            setMessages([]);
            setInput('');
            setIsLoading(false);
        }
    }, [isOpen, user]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSendMessage = useCallback(async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!input.trim() || isLoading || !user) return;

        const userMessage: Message = { role: 'user', text: input.trim() };
        const newMessages = [...messages, userMessage];
        
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/ai-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: newMessages,
                    role: user.role,
                    userId: user.id,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to get response from AI.');
            }

            const data = await response.json();
            const aiMessage: Message = { role: 'model', text: data.text };
            setMessages(prev => [...prev, aiMessage]);

        } catch (err: any) {
            const errorMessage: Message = { role: 'model', text: `Sorry, an error occurred: ${err.message}` };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, [input, isLoading, user, messages]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4 animate-fade-in" style={{animationDuration: '300ms'}} onClick={onClose}>
            <div className="bg-white rounded-lg shadow-2xl p-6 max-w-2xl w-full h-full max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <GeminiIcon />
                        <h2 className="text-2xl font-bold text-brand-blue">AI Assistant</h2>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-200" aria-label="Close">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                
                <div className="flex-grow overflow-y-auto pr-4 -mr-4 space-y-4 mb-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex gap-3 items-start ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.role === 'model' && <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex-shrink-0" />}
                            <div className={`max-w-[85%] p-3 rounded-lg shadow-sm ${msg.role === 'user' ? 'bg-brand-blue text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
                                <p className="whitespace-pre-wrap text-sm">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start gap-3 items-start">
                             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex-shrink-0" />
                             <div className="max-w-[85%] p-3 rounded-lg shadow-sm bg-gray-100 text-gray-800 rounded-bl-none">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                
                <div className="mt-auto flex-shrink-0 border-t pt-4">
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder="Ask me anything about your CRM data..."
                            disabled={isLoading}
                            className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white text-gray-900"
                            aria-label="Chat input"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="bg-brand-blue text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 hover:bg-opacity-90 disabled:bg-gray-400 transition-colors"
                            aria-label="Send message"
                        >
                           <SendIcon />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GeminiAiAssistantModal;