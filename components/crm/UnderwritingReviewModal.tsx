import React, { useState } from 'react';
import { Client, Policy } from '../../types';

interface UnderwritingReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    client: Client;
    policy: Policy;
}

const UnderwritingReviewModal: React.FC<UnderwritingReviewModalProps> = ({ isOpen, onClose, client, policy }) => {
    const [analysis, setAnalysis] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisError, setAnalysisError] = useState('');
    
    if (!isOpen) return null;

    const handleAnalyzeRisk = async () => {
        setIsAnalyzing(true);
        setAnalysisError('');
        setAnalysis('');
        try {
            const response = await fetch('/api/analyze-underwriting-risk', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ client, policy }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to generate analysis.');
            }
            const data = await response.json();
            setAnalysis(data.analysis);
        } catch (error: any) {
            setAnalysisError(error.message);
        } finally {
            setIsAnalyzing(false);
        }
    };
    
    const infoRowStyles = "py-2 grid grid-cols-3 gap-4";
    const infoLabelStyles = "text-sm font-medium text-gray-500";
    const infoValueStyles = "mt-1 text-sm text-gray-900 sm:mt-0 col-span-2";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-2xl p-6 max-w-4xl w-full max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-start flex-shrink-0">
                    <div>
                        <h2 className="text-2xl font-bold text-brand-blue">Underwriting Review</h2>
                        <p className="text-gray-500">Policy #{policy.id} for {client.name}</p>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-200" aria-label="Close">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="mt-4 flex-grow overflow-y-auto pr-2 -mr-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Client & Policy Details */}
                        <div>
                            <h3 className="text-lg font-semibold text-brand-blue border-b pb-2 mb-2">Details</h3>
                            <dl>
                                <div className={infoRowStyles}><dt className={infoLabelStyles}>Client Name</dt><dd className={infoValueStyles}>{client.name}</dd></div>
                                <div className={infoRowStyles}><dt className={infoLabelStyles}>Policy Type</dt><dd className={infoValueStyles}>{policy.type}</dd></div>
                                <div className={infoRowStyles}><dt className={infoLabelStyles}>Premium</dt><dd className={infoValueStyles}>${policy.premium.toLocaleString()}</dd></div>
                                <div className={infoRowStyles}><dt className={infoLabelStyles}>Status</dt><dd className={infoValueStyles}>{policy.status}</dd></div>
                                <div className={infoRowStyles}><dt className={infoLabelStyles}>Renewal Date</dt><dd className={infoValueStyles}>{new Date(policy.renewalDate).toLocaleDateString()}</dd></div>
                            </dl>
                        </div>

                        {/* AI Risk Analysis */}
                        <div>
                             <div className="flex justify-between items-center border-b pb-2 mb-2">
                                <h3 className="text-lg font-semibold text-brand-blue">AI Risk Analysis</h3>
                                <button
                                    type="button"
                                    onClick={handleAnalyzeRisk}
                                    disabled={isAnalyzing}
                                    className="bg-brand-blue text-white font-semibold py-1 px-3 rounded-md hover:bg-opacity-90 text-sm disabled:bg-gray-400"
                                >
                                    {isAnalyzing ? 'Analyzing...' : 'Analyze Risk'}
                                </button>
                            </div>
                            <div className="mt-2 p-3 bg-gray-50 rounded-md border h-64 overflow-y-auto">
                                {isAnalyzing && <p className="text-gray-500">Generating analysis...</p>}
                                {analysisError && <p className="text-sm text-red-600">{analysisError}</p>}
                                {analysis && <p className="text-sm text-gray-800 whitespace-pre-wrap">{analysis}</p>}
                                {!isAnalyzing && !analysis && !analysisError && <p className="text-gray-400">Click "Analyze Risk" to generate an AI-powered underwriting summary.</p>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-4 border-t pt-4 flex-shrink-0">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-semibold">Close</button>
                    {/* In a real app, Approve/Reject buttons would be here and call context functions */}
                    <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-semibold">Reject</button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-semibold">Approve</button>
                </div>
            </div>
        </div>
    );
};

export default UnderwritingReviewModal;
