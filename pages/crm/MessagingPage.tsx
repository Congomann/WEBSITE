
import React, { useState, useMemo, useEffect, useRef } from 'react';
import SEO from '../../components/SEO';
import { useAuth } from '../../contexts/AuthContext';
import { useCrm } from '../../contexts/CrmContext';
import { users } from '../../data';
import type { Conversation } from '../../types';

const MessagingPage: React.FC = () => {
    const { user } = useAuth();
    const { conversations, messages, sendMessage } = useCrm();
    const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const userMap = useMemo(() => new Map(users.map(u => [u.id, u])), []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, selectedConversationId]);

    const myConversations = useMemo(() => {
        if (!user) return [];
        return conversations
            .filter(c => c.participantIds.includes(user.id))
            .sort((a, b) => new Date(b.lastMessageTimestamp).getTime() - new Date(a.lastMessageTimestamp).getTime());
    }, [conversations, user]);

    const selectedConversation = useMemo(() => {
        return myConversations.find(c => c.id === selectedConversationId);
    }, [myConversations, selectedConversationId]);

    const selectedConversationMessages = useMemo(() => {
        if (!selectedConversationId) return [];
        return messages.filter(m => m.conversationId === selectedConversationId)
            .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    }, [messages, selectedConversationId]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedConversationId || !user) return;
        sendMessage(selectedConversationId, user.id, newMessage.trim());
        setNewMessage('');
    };
    
    const getOtherParticipant = (conversation: Conversation) => {
        if (!user) return null;
        const otherId = conversation.participantIds.find(id => id !== user.id);
        return otherId ? userMap.get(otherId) : null;
    };

    return (
        <div className="animate-fade-in h-full">
            <SEO title="Messaging" description="Internal messaging system." noIndex={true} />
            <div className="flex justify-between items-center mb-6">
                 <h1 className="text-3xl font-bold text-brand-blue">Messaging</h1>
            </div>
            <div className="flex h-[calc(100vh-240px)] bg-white rounded-lg shadow-lg overflow-hidden border">
                {/* Conversation List */}
                <aside className="w-1/3 border-r border-gray-200 flex flex-col">
                    <div className="p-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800">Conversations</h2>
                    </div>
                    <div className="flex-grow overflow-y-auto">
                        {myConversations.map(conv => {
                            const otherUser = getOtherParticipant(conv);
                            return (
                                <div
                                    key={conv.id}
                                    onClick={() => setSelectedConversationId(conv.id)}
                                    className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100 ${selectedConversationId === conv.id ? 'bg-brand-light' : ''}`}
                                >
                                    <p className="font-bold text-gray-900">{otherUser?.name || 'Unknown User'}</p>
                                    <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                                    <p className="text-xs text-gray-400 text-right mt-1">{new Date(conv.lastMessageTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                            );
                        })}
                    </div>
                </aside>

                {/* Chat Window */}
                <main className="w-2/3 flex flex-col">
                    {selectedConversation ? (
                        <>
                            <header className="p-4 border-b border-gray-200 bg-gray-50">
                                <h2 className="text-lg font-semibold text-gray-800">{getOtherParticipant(selectedConversation)?.name}</h2>
                            </header>
                            <div className="flex-grow p-4 overflow-y-auto bg-gray-100 space-y-4">
                                {selectedConversationMessages.map(msg => (
                                    <div key={msg.id} className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-xs md:max-w-md p-3 rounded-lg shadow-sm ${msg.senderId === user?.id ? 'bg-brand-blue text-white' : 'bg-white text-gray-800'}`}>
                                            <p>{msg.text}</p>
                                            <p className="text-xs opacity-70 mt-1 text-right">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                            <footer className="p-4 border-t border-gray-200 bg-white">
                                <form onSubmit={handleSendMessage} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Type a message..."
                                        className="flex-grow px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-brand-blue"
                                    />
                                    <button type="submit" className="bg-brand-blue text-white px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 disabled:bg-gray-400" disabled={!newMessage.trim()}>
                                        Send
                                    </button>
                                </form>
                            </footer>
                             <div className="text-center text-xs text-gray-400 p-1 bg-gray-50 border-t">
                                Real-time messaging powered by Google Cloud Messaging.
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500 bg-gray-50">
                            <p>Select a conversation to start chatting.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default MessagingPage;