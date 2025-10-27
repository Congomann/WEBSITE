
import React, { useState, useMemo, useEffect, useRef } from 'react';
import SEO from '../../components/SEO';
import { useAuth } from '../../contexts/AuthContext';
import { useCrm } from '../../contexts/CrmContext';
import { users } from '../../data';
import type { Conversation } from '../../types';
import NewConversationModal from '../../components/crm/NewConversationModal';

const MessagingPage: React.FC = () => {
    const { user } = useAuth();
    const { conversations, messages, sendMessage, setActiveConversationId, markConversationAsRead } = useCrm();
    const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
    const [newMessage, setNewMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isNewConversationModalOpen, setIsNewConversationModalOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const userMap = useMemo(() => new Map(users.map(u => [u.id, u])), []);
    
    useEffect(() => {
        setActiveConversationId(selectedConversationId);
        if (selectedConversationId) {
            markConversationAsRead(selectedConversationId);
        }
        return () => setActiveConversationId(null);
    }, [selectedConversationId, setActiveConversationId, markConversationAsRead]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, selectedConversationId]);

    const getOtherParticipant = (conversation: Conversation) => {
        if (!user) return null;
        const otherId = conversation.participantIds.find(id => id !== user.id);
        return otherId ? userMap.get(otherId) : null;
    };

    const myConversations = useMemo(() => {
        if (!user) return [];
        return conversations
            .filter(c => c.participantIds.includes(user.id))
            .filter(c => {
                const otherUser = getOtherParticipant(c);
                return otherUser?.name.toLowerCase().includes(searchTerm.toLowerCase());
            })
            .sort((a, b) => new Date(b.lastMessageTimestamp).getTime() - new Date(a.lastMessageTimestamp).getTime());
    }, [conversations, user, searchTerm]);

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

    return (
        <div className="animate-fade-in h-full">
            <SEO title="Messaging" description="Internal messaging system." noIndex={true} />
            <div className="flex justify-between items-center mb-6">
                 <h1 className="text-3xl font-bold text-brand-blue">Messaging</h1>
                 <button onClick={() => setIsNewConversationModalOpen(true)} className="bg-brand-blue text-white font-bold py-2 px-4 rounded-full hover:bg-opacity-90">
                    New Message
                </button>
            </div>
            <div className="flex h-[calc(100vh-240px)] bg-white rounded-lg shadow-lg overflow-hidden border">
                {/* Conversation List */}
                <aside className="w-1/3 border-r border-gray-200 flex flex-col">
                    <div className="p-4 border-b">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Conversations</h2>
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md text-sm bg-white text-gray-900"
                        />
                    </div>
                    <div className="flex-grow overflow-y-auto">
                        {myConversations.map(conv => {
                            const otherUser = getOtherParticipant(conv);
                            const isUnread = conv.unreadCount > 0;
                            return (
                                <div
                                    key={conv.id}
                                    onClick={() => setSelectedConversationId(conv.id)}
                                    className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100 ${selectedConversationId === conv.id ? 'bg-brand-light' : ''}`}
                                >
                                    <div className="flex justify-between items-center">
                                        <p className={`font-bold text-gray-900 ${isUnread ? 'text-brand-blue' : ''}`}>{otherUser?.name || 'Unknown User'}</p>
                                        {isUnread && <span className="w-3 h-3 bg-brand-blue rounded-full"></span>}
                                    </div>
                                    <p className={`text-sm truncate ${isUnread ? 'text-gray-800 font-semibold' : 'text-gray-600'}`}>{conv.lastMessage}</p>
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
                            <header className="p-4 border-b bg-gray-50">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800">{getOtherParticipant(selectedConversation)?.name}</h2>
                                    <div className="text-xs text-gray-500 flex items-center gap-3 mt-1">
                                        <span>{getOtherParticipant(selectedConversation)?.email}</span>
                                        {getOtherParticipant(selectedConversation)?.phone && 
                                            <span>📞 {getOtherParticipant(selectedConversation)?.phone}</span>}
                                    </div>
                                </div>
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
                                        className="flex-grow px-4 py-2 border border-gray-300 rounded-full bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                                    />
                                    <button type="submit" className="bg-brand-blue text-white px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 disabled:bg-gray-400" disabled={!newMessage.trim()}>
                                        Send
                                    </button>
                                </form>
                            </footer>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500 bg-gray-50">
                            <p>Select a conversation or start a new one.</p>
                        </div>
                    )}
                </main>
            </div>
            <NewConversationModal 
                isOpen={isNewConversationModalOpen}
                onClose={() => setIsNewConversationModalOpen(false)}
                onSelectConversation={setSelectedConversationId}
            />
        </div>
    );
};

export default MessagingPage;