
import React from 'react';
import type { AgentApplication } from '../../types';

interface ApplicationDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    application: AgentApplication;
    onApprove: (application: AgentApplication) => void;
    onReject: (application: AgentApplication) => void;
}

const ApplicationDetailModal: React.FC<ApplicationDetailModalProps> = ({ isOpen, onClose, application, onApprove, onReject }) => {
    if (!isOpen) return null;

    const infoRowStyles = "py-3 sm:grid sm:grid-cols-3 sm:gap-4";
    const infoLabelStyles = "text-sm font-medium text-gray-600";
    const infoValueStyles = "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2";

    const getStatusChipColor = (status: string) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Approved': return 'bg-green-100 text-green-800';
            case 'Rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-bold text-brand-blue">{application.name}</h2>
                        <p className="text-gray-500">Application Details</p>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-200" aria-label="Close">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                
                <div className="border-t border-gray-200 mt-4">
                    <dl>
                        <div className={`${infoRowStyles} bg-gray-50`}><dt className={infoLabelStyles}>Status</dt><dd className={infoValueStyles}><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusChipColor(application.status)}`}>{application.status}</span></dd></div>
                        <div className={infoRowStyles}><dt className={infoLabelStyles}>Submitted On</dt><dd className={infoValueStyles}>{new Date(application.submittedAt).toLocaleString()}</dd></div>
                        <div className={`${infoRowStyles} bg-gray-50`}><dt className={infoLabelStyles}>Email</dt><dd className={infoValueStyles}><a href={`mailto:${application.email}`} className="text-brand-blue hover:underline">{application.email}</a></dd></div>
                        <div className={infoRowStyles}><dt className={infoLabelStyles}>Phone</dt><dd className={infoValueStyles}><a href={`tel:${application.phone}`} className="text-brand-blue hover:underline">{application.phone}</a></dd></div>
                        <div className={`${infoRowStyles} bg-gray-50`}><dt className={infoLabelStyles}>Address</dt><dd className={infoValueStyles}>{application.address}</dd></div>
                        <div className={infoRowStyles}><dt className={infoLabelStyles}>License Number</dt><dd className={infoValueStyles}>{application.licenseNumber}</dd></div>
                        <div className={`${infoRowStyles} bg-gray-50`}><dt className={infoLabelStyles}>Experience</dt><dd className={`${infoValueStyles} whitespace-pre-wrap`}>{application.experience}</dd></div>
                        <div className={infoRowStyles}>
                            <dt className={infoLabelStyles}>Resume</dt>
                            <dd className={infoValueStyles}>
                                {application.resumeUrl ? (
                                    <a href={application.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-brand-blue font-semibold hover:underline">View Resume</a>
                                ) : (
                                    'Not provided'
                                )}
                            </dd>
                        </div>
                    </dl>
                </div>
                
                {application.status === 'Pending' && (
                    <div className="mt-6 flex justify-end gap-4 border-t pt-4">
                        <button onClick={() => onReject(application)} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Reject</button>
                        <button onClick={() => onApprove(application)} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Approve</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ApplicationDetailModal;