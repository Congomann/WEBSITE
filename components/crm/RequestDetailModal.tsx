
import React from 'react';
import { AdvisorRequest } from '../../types';

interface RequestDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    request: AdvisorRequest;
}

const RequestDetailModal: React.FC<RequestDetailModalProps> = ({ isOpen, onClose, request }) => {
    if (!isOpen) return null;

    const infoRowStyles = "py-3 sm:grid sm:grid-cols-3 sm:gap-4";
    const infoLabelStyles = "text-sm font-medium text-gray-600";
    const infoValueStyles = "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-2xl p-6 max-w-lg w-full" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-bold text-brand-blue mb-4">Request Details</h2>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-200" aria-label="Close">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="border-t border-gray-200">
                    <dl>
                        <div className={`${infoRowStyles} bg-gray-50`}><dt className={infoLabelStyles}>Name</dt><dd className={infoValueStyles}>{request.name}</dd></div>
                        <div className={infoRowStyles}><dt className={infoLabelStyles}>Phone</dt><dd className={infoValueStyles}>{request.phone}</dd></div>
                        <div className={`${infoRowStyles} bg-gray-50`}><dt className={infoLabelStyles}>Request Type</dt><dd className={infoValueStyles}>{request.type}</dd></div>
                        <div className={infoRowStyles}><dt className={infoLabelStyles}>Received</dt><dd className={infoValueStyles}>{new Date(request.createdAt).toLocaleString()}</dd></div>
                        <div className={`${infoRowStyles} bg-gray-50`}><dt className={infoLabelStyles}>Status</dt><dd className={infoValueStyles}>{request.status}</dd></div>
                        <div className={infoRowStyles}>
                            <dt className={infoLabelStyles}>Notes</dt>
                            <dd className={`${infoValueStyles} whitespace-pre-wrap`}>
                                {request.message || 'No notes provided.'}
                            </dd>
                        </div>
                    </dl>
                </div>

                <div className="mt-6 text-right">
                    <button onClick={onClose} className="px-4 py-2 bg-brand-blue text-white rounded-md hover:bg-opacity-90 font-semibold">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RequestDetailModal;
