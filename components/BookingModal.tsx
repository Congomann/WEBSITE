import React, { useState, useEffect, useMemo } from 'react';
import type { Advisor } from '../types';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    advisor: Advisor;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, advisor }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    // Reset state when modal is closed or advisor changes
    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setSelectedDate(null);
                setSelectedTime(null);
            }, 300); // Delay reset to allow for closing animation
        }
    }, [isOpen]);

    // Keyboard navigation
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    // Generate next 7 days for selection
    const availableDates = useMemo(() => {
        const dates: Date[] = [];
        const today = new Date();
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            dates.push(date);
        }
        return dates;
    }, []);

    const getDayName = (date: Date): string => {
        return date.toLocaleDateString('en-US', { weekday: 'long' });
    };

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        setSelectedTime(null); // Reset time when date changes
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        
        if (!selectedDate) return;

        // Generate Google Calendar link and open it
        const [hours, minutes] = time.split(':').map(Number);
        const startTime = new Date(selectedDate);
        startTime.setHours(hours, minutes, 0, 0);

        const endTime = new Date(startTime);
        endTime.setHours(startTime.getHours() + 1); // Assume 1-hour consultation

        const toGoogleISO = (date: Date) => date.toISOString().replace(/[-:]/g, '').slice(0, -5) + 'Z';
        
        const eventDetails = `This is a 1-hour consultation with ${advisor.name} from New Holland Financial Group to discuss your financial needs.\n\nA Google Meet link will be automatically added to this event.`;
        
        const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Consultation with ${advisor.name}`)}&dates=${toGoogleISO(startTime)}/${toGoogleISO(endTime)}&details=${encodeURIComponent(eventDetails)}&location=${encodeURIComponent('Video conference via Google Meet')}&add=${encodeURIComponent(advisor.email || '')}`;
        
        window.open(googleCalendarUrl, '_blank');
        onClose();
    };

    if (!isOpen) return null;

    const advisorAvailability = advisor.availability || {};

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in" 
            style={{animationDuration: '300ms'}}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-lg shadow-2xl p-6 sm:p-8 max-w-lg w-full relative transform animate-fade-in-up" 
                style={{animationDuration: '400ms'}}
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-full p-1" aria-label="Close booking modal">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <h2 id="booking-modal-title" className="text-2xl sm:text-3xl font-bold text-brand-blue text-center mb-6">Schedule with {advisor.name}</h2>
                
                {/* Step 1: Date Selection */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">1. Select a Date</h3>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {availableDates.map(date => {
                            const dayName = getDayName(date);
                            const isAvailable = advisorAvailability[dayName] && advisorAvailability[dayName].length > 0;
                            const isSelected = selectedDate?.toDateString() === date.toDateString();
                            
                            return (
                                <button
                                    key={date.toString()}
                                    onClick={() => isAvailable && handleDateSelect(date)}
                                    disabled={!isAvailable}
                                    className={`p-3 rounded-lg text-center transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-blue ${
                                        isSelected 
                                            ? 'bg-brand-blue text-white font-bold shadow-md' 
                                            : isAvailable 
                                            ? 'bg-brand-light hover:bg-brand-gold hover:text-brand-blue' 
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                                >
                                    <span className="block text-sm font-medium">{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                                    <span className="block text-xl font-bold">{date.getDate()}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Step 2: Time Selection */}
                {selectedDate && (
                    <div className="animate-fade-in" style={{animationDuration: '500ms'}}>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">2. Select a Time for {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</h3>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {(advisorAvailability[getDayName(selectedDate)] || []).map(time => (
                                <button
                                    key={time}
                                    onClick={() => handleTimeSelect(time)}
                                    className="p-3 bg-brand-light rounded-lg text-brand-blue font-semibold hover:bg-brand-gold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-blue"
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                         <p className="text-xs text-gray-500 mt-4 text-center">
                            Note: Selecting a time will open Google Calendar in a new tab to create a 1-hour appointment with a <span className="font-semibold">Google Meet</span> video link included.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingModal;