import React, { useState, useEffect } from 'react';
import type { EventType, CalendarEvent } from '../../types';

interface EventFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: Omit<CalendarEvent, 'creatorId' | 'id'> & { id?: string }) => void;
    onSaveEventType: (eventType: EventType) => void;
    startDate: string;
    eventToEdit?: CalendarEvent | null;
    eventTypes: EventType[];
}

const EventFormModal: React.FC<EventFormModalProps> = ({ isOpen, onClose, onSave, onSaveEventType, startDate, eventToEdit, eventTypes }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isPublic, setIsPublic] = useState(true);
    const [formStartDate, setFormStartDate] = useState(startDate);
    const [endDate, setEndDate] = useState('');
    const [selectedEventType, setSelectedEventType] = useState(eventTypes.length > 0 ? eventTypes[0].name : '');
    
    const [showNewTypeForm, setShowNewTypeForm] = useState(false);
    const [newTypeName, setNewTypeName] = useState('');
    const [newTypeColor, setNewTypeColor] = useState('#a0aec0');

    const todayStr = new Date().toISOString().split('T')[0];

    useEffect(() => {
        if (eventToEdit) {
            setTitle(eventToEdit.title);
            setDescription(eventToEdit.description || '');
            setIsPublic(eventToEdit.isPublic);
            setFormStartDate(eventToEdit.startDate);
            setEndDate(eventToEdit.endDate || '');
            setSelectedEventType(eventToEdit.type);
        } else {
            // Reset for new event
            setTitle('');
            setDescription('');
            setIsPublic(true);
            setFormStartDate(startDate);
            setEndDate('');
            setSelectedEventType(eventTypes.length > 0 ? eventTypes[0].name : '');
        }
    }, [eventToEdit, startDate, eventTypes]);
    
    if (!isOpen) return null;

    const handleEventTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value === '---new---') {
            setShowNewTypeForm(true);
            setSelectedEventType('');
        } else {
            setSelectedEventType(value);
            setShowNewTypeForm(false);
        }
    };
    
    const handleSaveNewType = () => {
        const trimmedName = newTypeName.trim();
        if (trimmedName && !eventTypes.some(et => et.name.toLowerCase() === trimmedName.toLowerCase())) {
            const newType = { name: trimmedName, color: newTypeColor };
            onSaveEventType(newType);
            setSelectedEventType(trimmedName);
            setShowNewTypeForm(false);
            setNewTypeName('');
            setNewTypeColor('#a0aec0');
        } else {
            alert('Event type name must be unique and not empty.');
        }
    };

    const handleSave = () => {
        const selectedStartDate = new Date(formStartDate + 'T00:00:00');
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (!eventToEdit && selectedStartDate < today) {
            alert("You cannot add an event to a past date.");
            return;
        }

        if (!title.trim() || !selectedEventType) {
            alert('Please provide a title and select an event type.');
            return;
        }
        const eventType = eventTypes.find(et => et.name === selectedEventType);
        if (!eventType) {
             alert('Invalid event type selected.');
             return;
        }
        
        const eventData = {
            id: eventToEdit?.id,
            title,
            description,
            isPublic,
            startDate: formStartDate,
            endDate: endDate || undefined,
            type: eventType.name,
            color: eventType.color,
        };
        onSave(eventData);
    };
    
    const formattedStartDate = new Date(formStartDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-2xl p-6 max-w-lg w-full" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-brand-blue mb-2">{eventToEdit ? 'Edit Event' : 'Add Event'}</h2>
                <p className="text-gray-600 mb-6">{formattedStartDate}</p>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="event-title" className="block text-sm font-medium text-gray-700">Event Title</label>
                        <input type="text" id="event-title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full input-style" placeholder="e.g., Follow up with Jane Doe" autoFocus />
                    </div>
                    <div>
                        <label htmlFor="event-description" className="block text-sm font-medium text-gray-700">Description / Notes (Optional)</label>
                        <textarea id="event-description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="mt-1 block w-full input-style" placeholder="Add more details about the event..."></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">Start Date</label>
                            <input type="date" id="start-date" value={formStartDate} onChange={e => setFormStartDate(e.target.value)} min={eventToEdit ? undefined : todayStr} className="mt-1 block w-full input-style" />
                        </div>
                        <div>
                            <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">End Date (Optional)</label>
                            <input type="date" id="end-date" value={endDate} onChange={(e) => setEndDate(e.target.value)} min={formStartDate} className="mt-1 block w-full input-style" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="event-type" className="block text-sm font-medium text-gray-700">Event Type</label>
                        <select id="event-type" value={selectedEventType} onChange={handleEventTypeChange} className="mt-1 block w-full input-style">
                             {eventTypes.map(type => <option key={type.name} value={type.name}>{type.name}</option>)}
                             <option value="---new---">-- Create New Type --</option>
                        </select>
                    </div>
                    {showNewTypeForm && (
                        <div className="p-3 bg-gray-50 rounded-md border space-y-2 animate-fade-in">
                             <label className="block text-sm font-medium text-gray-700">New Event Type</label>
                             <div className="flex gap-2">
                                <input type="text" value={newTypeName} onChange={e => setNewTypeName(e.target.value)} placeholder="Type name" className="flex-grow input-style" />
                                <input type="color" value={newTypeColor} onChange={e => setNewTypeColor(e.target.value)} className="h-10 rounded-md" />
                             </div>
                             <button onClick={handleSaveNewType} className="px-3 py-1 bg-brand-blue text-white text-sm rounded-md hover:bg-opacity-90">Save Type</button>
                        </div>
                    )}
                    <div className="flex items-center">
                        <input id="is-public" type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} className="h-4 w-4 text-brand-blue border-gray-300 rounded focus:ring-brand-blue" />
                        <label htmlFor="is-public" className="ml-2 block text-sm text-gray-900">Public (visible to everyone)</label>
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-semibold">Cancel</button>
                    <button onClick={handleSave} disabled={!title.trim() || showNewTypeForm} className="px-4 py-2 bg-brand-blue text-white rounded-md hover:bg-opacity-90 font-semibold disabled:bg-gray-400">Save Event</button>
                </div>
            </div>
            <style>{`.input-style { display: block; width: 100%; padding: 0.5rem 0.75rem; border: 1px solid #d1d5db; border-radius: 0.375rem; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); background-color: white; color: #111827; } .input-style:focus { outline: 2px solid transparent; outline-offset: 2px; --tw-ring-color: #0D2C54; box-shadow: 0 0 0 2px var(--tw-ring-color); }`}</style>
        </div>
    );
};

export default EventFormModal;