
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCrm } from '../../contexts/CrmContext';

const CrmNotificationToast: React.FC = () => {
    const { toastNotification, dismissToastNotification } = useCrm();
    const navigate = useNavigate();

    useEffect(() => {
        if (toastNotification) {
            const timer = setTimeout(() => {
                dismissToastNotification();
            }, 8000); // Auto-hide after 8 seconds

            return () => clearTimeout(timer);
        }
    }, [toastNotification, dismissToastNotification]);

    const handleViewClick = () => {
        if (toastNotification) {
            // Navigate to the messaging page. The messaging page itself will handle selecting the conversation.
            // For a more direct approach, state could be passed via navigate.
            navigate('/crm/messaging', { state: { conversationId: toastNotification.conversationId } });
        }
        dismissToastNotification();
    };

    if (!toastNotification) {
        return null;
    }

    return (
        <div
            className="fixed top-4 right-6 w-full max-w-sm bg-white rounded-lg shadow-2xl p-4 z-[60] animate-fade-in-down"
            style={{ animationDuration: '500ms' }}
            role="alert"
            aria-live="polite"
        >
            <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                </div>

                {/* Content */}
                <div className="flex-grow">
                    <p className="font-bold text-brand-blue">New Message from {toastNotification.senderName}</p>
                    <p className="text-sm text-gray-700 truncate">{toastNotification.messageText}</p>
                    <button
                        onClick={handleViewClick}
                        className="mt-2 inline-block bg-brand-gold text-brand-blue font-bold py-1 px-4 rounded-full text-sm hover:bg-yellow-400 transition-colors duration-300"
                    >
                        View
                    </button>
                </div>

                {/* Close Button */}
                <button
                    onClick={dismissToastNotification}
                    className="p-1 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600 focus:outline-none"
                    aria-label="Close notification"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default CrmNotificationToast;