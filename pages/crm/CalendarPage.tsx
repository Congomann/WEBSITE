import React, { useState, useMemo } from 'react';
import { useCrm } from '../../contexts/CrmContext';
import { useAuth } from '../../contexts/AuthContext';
import SEO from '../../components/SEO';
import EventFormModal from '../../components/crm/EventFormModal';
import DayEventsModal from '../../components/crm/DayEventsModal';
import { CalendarEvent, EventType } from '../../types';

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 inline-block mr-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
    </svg>
);

const CalendarPage: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDayModalOpen, setIsDayModalOpen] = useState(false);
    const [selectedStartDateStr, setSelectedStartDateStr] = useState<string | null>(null);
    const [selectedDayData, setSelectedDayData] = useState<{ dateStr: string; events: CalendarEvent[] } | null>(null);
    const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);

    const { events, addEvent, updateEvent, deleteEvent, eventTypes, addEventType } = useCrm();
    const { user } = useAuth();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const monthName = currentDate.toLocaleString('default', { month: 'long' });

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Previous month's days
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const prevMonthDays = Array.from(
        { length: firstDayOfMonth },
        (_, i) => daysInPrevMonth - firstDayOfMonth + i + 1
    );

    // Current month's days
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // Next month's days to fill the grid (6 rows = 42 cells)
    const totalGridCells = 42;
    const nextMonthDaysCount = totalGridCells - (days.length + prevMonthDays.length);
    const nextMonthDays = Array.from({ length: nextMonthDaysCount }, (_, i) => i + 1);
    
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const eventsByDate = useMemo(() => {
        if (!user) return {};
        const dateMap: { [key: number]: CalendarEvent[] } = {};
        events.forEach(event => {
            if (event.isPublic || event.creatorId === user.id) {
                const start = new Date(event.startDate + 'T00:00:00');
                const end = event.endDate ? new Date(event.endDate + 'T00:00:00') : start;
                
                let current = new Date(start);
                while (current <= end) {
                    if (current.getFullYear() === year && current.getMonth() === month) {
                        const day = current.getDate();
                        if (!dateMap[day]) dateMap[day] = [];
                        dateMap[day].push(event);
                    }
                    current.setDate(current.getDate() + 1);
                }
            }
        });
        return dateMap;
    }, [events, year, month, user]);

    const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
    const handleToday = () => setCurrentDate(new Date());

    const handleDayClick = (day: number) => {
        const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const dayEvents = eventsByDate[day] || [];
        const dayDate = new Date(year, month, day);

        if (dayEvents.length > 0) {
            setSelectedDayData({ dateStr, events: dayEvents });
            setIsDayModalOpen(true);
        } else if (dayDate >= today) {
            setSelectedStartDateStr(dateStr);
            setEditingEvent(null);
            setIsCreateModalOpen(true);
        }
    };
    
    const handleAddEventFromDayModal = (dateStr: string) => {
        setIsDayModalOpen(false);
        setSelectedStartDateStr(dateStr);
        setEditingEvent(null);
        setIsCreateModalOpen(true);
    };

    const handleEditEventFromDayModal = (event: CalendarEvent) => {
        setIsDayModalOpen(false);
        setEditingEvent(event);
        setSelectedStartDateStr(event.startDate);
        setIsCreateModalOpen(true);
    };

    const handleDeleteEvent = (eventId: string) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            deleteEvent(eventId);
            setIsDayModalOpen(false);
        }
    };
    
    const handleSaveEvent = (data: Omit<CalendarEvent, 'id' | 'creatorId'> & { id?: string }) => {
        if (!user) return;
        if (data.id) {
            const eventToUpdate = events.find(e => e.id === data.id);
            if (eventToUpdate) {
                updateEvent({ ...eventToUpdate, ...data });
            }
        } else {
            addEvent({ ...data, creatorId: user.id });
        }
        setIsCreateModalOpen(false);
        setEditingEvent(null);
    };

    const handleSaveEventType = (eventType: EventType) => addEventType(eventType);

    return (
        <div className="animate-fade-in">
            <SEO title="Calendar" description="Team and personal calendar." noIndex={true} />
            <h1 className="text-3xl font-bold text-brand-blue mb-6">Team Calendar</h1>

            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                        <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-200" aria-label="Previous month">&lt;</button>
                        <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-200" aria-label="Next month">&gt;</button>
                        <button onClick={handleToday} className="px-4 py-1.5 text-sm font-semibold border rounded-md hover:bg-gray-100">Today</button>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-brand-blue text-center">{monthName} {year}</h2>
                    <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-xs sm:text-sm justify-end">
                        {eventTypes.map(type => (
                            <span key={type.name} className="flex items-center gap-1">
                                <span style={{ backgroundColor: type.color }} className="w-3 h-3 rounded-sm"></span>
                                {type.name}
                            </span>
                        ))}
                        <span className="flex items-center gap-1"><LockIcon /> Private</span>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-px bg-gray-200 border-t border-l border-gray-200">
                    {weekdays.map(day => (
                        <div key={day} className="text-center font-semibold text-xs sm:text-sm py-2 bg-gray-50 border-r border-b border-gray-200">{day}</div>
                    ))}
                    
                    {prevMonthDays.map((day, i) => (
                        <div key={`prev-${i}`} className="relative min-h-[120px] p-1.5 border-r border-b border-gray-200 bg-gray-50 text-gray-400">
                            <span className="text-sm font-semibold">{day}</span>
                        </div>
                    ))}
                    
                    {days.map(day => {
                        const dayDate = new Date(year, month, day);
                        const isPast = dayDate < today;
                        const isToday = dayDate.toDateString() === today.toDateString();
                        const dayEvents = eventsByDate[day] || [];
                        const isClickable = dayEvents.length > 0 || !isPast;

                        return (
                            <div 
                                key={day} 
                                onClick={() => isClickable && handleDayClick(day)}
                                className={`relative min-h-[120px] p-1.5 border-r border-b border-gray-200 transition-colors ${
                                    isClickable
                                    ? 'bg-white cursor-pointer hover:bg-brand-light'
                                    : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                                }`}
                            >
                                <span className={`text-sm font-semibold flex items-center justify-center h-6 w-6 ${
                                    isToday ? 'bg-brand-blue text-white rounded-full' : 'text-gray-800'
                                }`}>
                                    {day}
                                </span>
                                <div className="mt-1 space-y-1">
                                    {dayEvents.map(event => (
                                        <div key={event.id} style={{ backgroundColor: event.color }} className="p-1 rounded text-white text-[11px] leading-tight truncate">
                                            {!event.isPublic && <LockIcon />}
                                            {event.title}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}

                    {nextMonthDays.map((day, i) => (
                        <div key={`next-${i}`} className="relative min-h-[120px] p-1.5 border-r border-b border-gray-200 bg-gray-50 text-gray-400">
                            <span className="text-sm font-semibold">{day}</span>
                        </div>
                    ))}
                </div>
            </div>
            
            {(isCreateModalOpen && selectedStartDateStr) && (
                <EventFormModal 
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    onSave={handleSaveEvent}
                    onSaveEventType={handleSaveEventType}
                    startDate={selectedStartDateStr}
                    eventToEdit={editingEvent}
                    eventTypes={eventTypes}
                />
            )}
            
            {isDayModalOpen && selectedDayData && (
                <DayEventsModal
                    isOpen={isDayModalOpen}
                    onClose={() => setIsDayModalOpen(false)}
                    dateStr={selectedDayData.dateStr}
                    events={selectedDayData.events}
                    onAddEvent={handleAddEventFromDayModal}
                    onEditEvent={handleEditEventFromDayModal}
                    onDeleteEvent={handleDeleteEvent}
                />
            )}
        </div>
    );
};

export default CalendarPage;