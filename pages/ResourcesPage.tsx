import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { VideoResource, DocumentResource, FAQItem, InfoResource } from '../types';
import VideoPlayer from '../components/VideoPlayer';
import SEO from '../components/SEO';
import { useContent } from '../contexts/ContentContext';

const ResourcesPage: React.FC = () => {
    const { content } = useContent();
    const { video_resources, document_resources, faq_data, real_estate_info_resources } = content;
    
    const [activeTab, setActiveTab] = useState<'faq' | 'videos' | 'documents' | 'real-estate'>('faq');
    const [openFaqId, setOpenFaqId] = useState<string | null>(null);

    const toggleFaq = (id: string) => {
        setOpenFaqId(prevId => (prevId === id ? null : id));
    };

    const groupedFaqs = faq_data.reduce((acc, faq) => {
        const category = faq.category;
        if (!acc[category]) acc[category] = [];
        acc[category].push(faq);
        return acc;
    }, {} as Record<string, FAQItem[]>);
    
    const categoryOrder: (keyof typeof groupedFaqs)[] = ['General Insurance', 'Life & Health', 'Property & Auto', 'Real Estate', 'Financial Planning'];

    const commonTabStyles = "px-6 py-3 font-semibold text-lg rounded-t-lg transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2";
    const activeTabStyles = "bg-white text-brand-blue";
    const inactiveTabStyles = "bg-brand-blue/80 text-white hover:bg-brand-blue";

    const DocumentIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-gold mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    );

    const KeyIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-gold mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" /></svg>);
    const ForSaleIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-gold mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M2.25 12v7.5A2.25 2.25 0 004.5 21.75h15A2.25 2.25 0 0021.75 19.5V12M2.25 12h19.5M12 16.5v.01" /><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21.75V12M12 21.75V12M15.75 21.75V12" /></svg>);
    const ChartIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-gold mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>);

    const iconMap: { [key: string]: React.ReactNode } = { 'Buying a Home': <KeyIcon />, 'Selling Your Property': <ForSaleIcon />, 'Investing in Real Estate': <ChartIcon /> };

    return (
        <div className="bg-brand-light">
            <SEO title="Resources & Media" description="Explore educational materials and answers to common questions." keywords="insurance resources, financial planning documents, life insurance videos, real estate guide"/>
            <section className="bg-brand-blue text-white py-20"><div className="container mx-auto px-6 text-center"><h1 className="text-4xl font-extrabold">Resources & Media Hub</h1><p className="text-lg text-gray-300 mt-2">Stay informed with our collection of educational materials.</p></div></section>

            <div className="container mx-auto px-6 py-20">
                <div className="border-b-2 border-white mb-[-2px] flex flex-wrap justify-center">
                    <button onClick={() => setActiveTab('faq')} className={`${commonTabStyles} ${activeTab === 'faq' ? activeTabStyles : inactiveTabStyles}`} role="tab">FAQ</button>
                    <button onClick={() => setActiveTab('real-estate')} className={`${commonTabStyles} ${activeTab === 'real-estate' ? activeTabStyles : inactiveTabStyles}`} role="tab">Real Estate Guide</button>
                    <button onClick={() => setActiveTab('videos')} className={`${commonTabStyles} ${activeTab === 'videos' ? activeTabStyles : inactiveTabStyles}`} role="tab">Videos</button>
                    <button onClick={() => setActiveTab('documents')} className={`${commonTabStyles} ${activeTab === 'documents' ? activeTabStyles : inactiveTabStyles}`} role="tab">Documents</button>
                </div>

                <div className="bg-white p-6 sm:p-10 rounded-b-lg shadow-xl">
                    {activeTab === 'faq' && (<section id="faq" className="animate-fade-in" role="tabpanel"><div className="space-y-8">{categoryOrder.map(category => (<div key={category}><h3 className="text-2xl font-bold text-brand-blue mb-4 border-b-2 pb-2">{category}</h3><div className="space-y-4">{groupedFaqs[category]?.map(faq => (<div key={faq.id} className="border rounded-lg"><button onClick={() => toggleFaq(faq.id)} className="w-full flex justify-between items-center text-left p-4 font-semibold text-lg text-brand-blue" aria-expanded={openFaqId === faq.id}><span className="pr-2">{faq.question}</span><svg className={`w-5 h-5 transform transition-transform ${openFaqId === faq.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"></path></svg></button>{openFaqId === faq.id && (<div className="p-4 bg-gray-50 border-t"><p className="whitespace-pre-line">{faq.answer}</p></div>)}</div>))}</div></div>))}</div></section>)}
                    {activeTab === 'real-estate' && (<section id="real-estate" className="animate-fade-in" role="tabpanel"><div className="text-center mb-12"><h2 className="text-3xl font-bold text-brand-blue">Your Guide to Real Estate</h2><p className="mt-2 text-lg text-gray-600">Guidance for buying, selling, or investing.</p></div><div className="grid md:grid-cols-3 gap-8">{real_estate_info_resources.map((resource) => (<div key={resource.title} className="bg-brand-light/50 p-8 flex flex-col items-center text-center">{iconMap[resource.title]}<h3 className="text-2xl font-bold text-brand-blue mb-3">{resource.title}</h3><p className="text-gray-600 mb-4 flex-grow">{resource.description}</p><ul className="space-y-2 text-left w-full">{resource.points.map((point) => (<li key={point} className="flex items-start"><svg className="w-5 h-5 mr-3 text-green-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7" /></svg><span>{point}</span></li>))}</ul></div>))}</div><div className="mt-16 text-center bg-brand-light p-10 rounded-lg"><h3 className="text-2xl font-bold text-brand-blue mb-4">Ready to Make Your Move?</h3><Link to="/services/real-estate" className="bg-brand-gold text-brand-blue font-bold py-3 px-8 rounded-full">Explore Real Estate Services</Link></div></section>)}
                    {activeTab === 'videos' && (<section id="videos" className="animate-fade-in" role="tabpanel"><div className="grid lg:grid-cols-2 gap-10">{video_resources.map(video => (<div key={video.id} className="bg-white border rounded-lg overflow-hidden shadow-lg"><div className="mb-4"><VideoPlayer video={video} /></div><div className="p-6 pt-0"><h3 className="text-xl font-bold text-brand-blue mb-2">{video.title}</h3><p className="text-gray-600">{video.description}</p></div></div>))}</div></section>)}
                    {activeTab === 'documents' && (<section id="documents" className="animate-fade-in" role="tabpanel"><div className="grid md:grid-cols-3 gap-8">{document_resources.map((doc) => (<div key={doc.id} className="bg-brand-light p-8 rounded-lg shadow-lg text-center"><DocumentIcon /><h3 className="text-xl font-bold text-brand-blue">{doc.title}</h3><p className="text-gray-600 my-4">{doc.description}</p><a href={doc.filePath} download={`${doc.title.replace(/\s+/g, '_')}.pdf`} className="inline-flex items-center bg-brand-gold text-brand-blue font-bold py-2 px-6 rounded-full"><svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>Download PDF</a></div>))}</div></section>)}
                </div>
            </div>
        </div>
    );
};

export default ResourcesPage;
