import React from 'react';

interface AccordionProps {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
}

const Accordion: React.FC<AccordionProps> = ({ title, children, isOpen, onToggle }) => {
    return (
        <div className="border-t border-gray-200 last:border-b">
            <h2>
                <button
                    type="button"
                    className="flex justify-between items-center w-full p-5 font-bold text-left text-brand-blue bg-gray-50 hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
                    onClick={onToggle}
                    aria-expanded={isOpen}
                >
                    <span className="text-xl">{title}</span>
                    <svg
                        className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
            </h2>
            <div
                className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                style={{ transitionProperty: 'grid-template-rows, opacity' }}
            >
                <div className="overflow-hidden">
                    <div className="p-5 bg-white">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Accordion;
