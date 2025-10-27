import React from 'react';
import { CalendarEvent } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

interface DayEventsModalProps {
    isOpen: boolean;
    onClose: () => void;
    dateStr: string;
    events: CalendarEvent[];
    onAddEvent: (dateStr: string) => void;
    onEditEvent: (event: CalendarEvent) => void;
    onDeleteEvent: (eventId: string) => void;
}

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1 text-gray-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
    </svg>
);

const DayEventsModal: React.FC<DayEventsModalProps> = ({ isOpen, onClose, dateStr, events, onAddEvent, onEditEvent, onDeleteEvent }) => {
    const { user, isAdmin } = useAuth();
    if (!isOpen) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const modalDate = new Date(dateStr + 'T00:00:00');
    const isPastDate = modalDate < today;

    const formattedDate = modalDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-2xl p-6 max-w-lg w-full max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex-shrink-0">
                    <h2 className="text-2xl font-bold text-brand-blue mb-1">Events</h2>
                    <p className="text-gray-600 mb-4">{formattedDate}</p>
                </div>
                
                <div className="flex-grow overflow-y-auto pr-2 -mr-2 space-y-3">
                    {events.map(event => {
                        const isEventPast = new Date(event.startDate + 'T00:00:00') < today;
                        const canModify = !isEventPast && (isAdmin || event.creatorId === user?.id);
                        const canDelete = isAdmin || canModify;

                        return (
                            <div key={event.id} className="p-3 rounded-lg border border-gray-200 bg-gray-50 flex justify-between items-start gap-3">
                                <div className="flex-grow">
                                    <div className="flex items-center mb-1">
                                        <span style={{ backgroundColor: event.color }} className="w-3 h-3 rounded-sm mr-2 flex-shrink-0"></span>
                                        <p className="font-bold text-gray-800">{event.title}</p>
                                    </div>
                                    {!event.isPublic && (
                                        <p className="text-xs text-gray-500 flex items-center"><LockIcon /> Private Event</p>
                                    )}
                                    {event.description && <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{event.description}</p>}
                                </div>
                                <div className="flex-shrink-0 flex items-center gap-2">
                                    {canModify && (
                                        <button onClick={() => onEditEvent(event)} className="text-sm font-semibold text-brand-blue hover:underline">Edit</button>
                                    )}
                                    {canDelete && (
                                        <button onClick={() => onDeleteEvent(event.id)} className="text-sm font-semibold text-red-500 hover:underline">Delete</button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-6 flex justify-between items-center flex-shrink-0 pt-4 border-t">
                    {!isPastDate && (
                         <button onClick={() => onAddEvent(dateStr)} className="px-4 py-2 bg-brand-blue text-white rounded-md hover:bg-opacity-90 font-semibold">
                            Add Event
                        </button>
                    )}
                    <div className="flex-grow" />
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-semibold">Close</button>
                </div>
            </div>
        </div>
    );
};

export default DayEventsModal;