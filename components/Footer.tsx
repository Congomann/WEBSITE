import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { useContent } from '../contexts/ContentContext';

const LinkedInIcon = () => ( <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg> );
const FacebookIcon = () => ( <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z"/></svg> );
const InstagramIcon = () => ( <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664 4.771 4.919-4.919 1.266-.057 1.644-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/></svg> );
const TwitterIcon = () => ( <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.634 4.212 3.793 4.649-.65.177-1.354.238-2.08.188.608 1.923 2.373 3.256 4.478 3.3-1.625 1.27-3.673 2.023-5.892 2.023-.38 0-.755-.022-1.124-.067 2.099 1.343 4.6 2.123 7.332 2.123 8.793 0 13.5-7.29 13.5-13.5 0-.204-.005-.407-.014-.61.932-.67 1.743-1.51 2.388-2.478z"/></svg> );
const TikTokIcon = () => {
    const pathOuter = "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.84-1.1-6.49-3.05-1.65-1.94-2.59-4.37-2.66-6.93-.07-2.54 1.39-4.96 3.66-6.27.12-.06.25-.11.39-.15-1.11.08-2.22.16-3.33.25v-4.1c1.23-.11 2.38-.19 3.54-.29.01-1.73.01-3.46.02-5.18.21-1.92 1.25-3.63 2.7-4.73A4.92 4.92 0 0 1 12.525.02z";
    const pathFull = "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.84-1.1-6.49-3.05-1.65-1.94-2.59-4.37-2.66-6.93-.07-2.54 1.39-4.96 3.66-6.27.12-.06.25-.11.39-.15-1.11.08-2.22.16-3.33.25v-4.1c1.23-.11 2.38-.19 3.54-.29.01-1.73.01-3.46.02-5.18.21-1.92 1.25-3.63 2.7-4.73A4.92 4.92 0 0 1 12.525.02zM12.33 3.86c-1.18.9-1.99 2.18-2.25 3.63.01 2.05-.01 4.1.02 6.15-.01.32.1.64.33.87.24.24.58.35.91.32 2.12-.19 4.24-.38 6.36-.57.08-.01.15-.02.23-.05.02-2.16-.01-4.32.02-6.48-.6-.23-1.17-.5-1.7-.79-.53-.29-1.03-.65-1.52-1.07-1.02-.89-1.78-2.05-2.14-3.35-.01-.02-.01-.04-.03-.06z";
    
    return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" aria-label="TikTok Logo">
            <g>
                <path d={pathOuter} fill="#ff0050" transform="translate(1, 1)" />
                <path d={pathOuter} fill="#00f2ea" transform="translate(-1, -1)" />
                <path d={pathFull} fill="#ffffff" />
            </g>
        </svg>
    );
};
const SnapchatIcon = () => (
    <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10S17.523 2 12 2zm5 13.5c0 .828-.672 1.5-1.5 1.5h-7c-.828 0-1.5-.672-1.5-1.5v-1h10v1zm-1.5-3c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5v-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5v1.5zm-5.5 0c0 .828-.672 1.5-1.5 1.5S8.5 13.328 8.5 12.5v-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5v1.5z" />
    </svg>
);

const Footer: React.FC = () => {
    const { content } = useContent();
    const { social_links_data, company_info } = content;

    const socialIconMap: { [key: string]: React.ReactNode } = {
        'LinkedIn': <LinkedInIcon />,
        'Facebook': <FacebookIcon />,
        'Instagram': <InstagramIcon />,
        'Twitter': <TwitterIcon />,
        'TikTok': <TikTokIcon />,
        'Snapchat': <SnapchatIcon />,
    };
    
    const navigationLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop Insurance', path: '/products' },
        { name: 'Find an Advisor', path: '/advisors' },
        { name: 'Resources', path: '/resources' },
        { name: 'Contact US', path: '/contact' },
    ];

    const solutionLinks = [
        { name: 'Life Insurance', path: '/services/life' },
        { name: 'Health & Benefits', path: '/services/health' },
        { name: 'Home & Property', path: '/services/property' },
        { name: 'Auto & Commercial', path: '/services/auto' },
        { name: 'Real Estate', path: '/services/real-estate' },
    ];

    const companyLinks = [
        { name: 'About Us', path: '/about' },
        { name: 'Agent Portal', path: '/login' },
        { name: 'Join Our Team', path: '/join-our-team' },
    ];


    return (
        <footer className="bg-brand-blue text-white">
            <div className="container mx-auto px-6 py-12">
                <div className="mb-10">
                    <Logo variant="light" />
                    <p className="mt-4 text-gray-300 max-w-lg">
                        Providing tailored insurance solutions that secure financial peace of mind for individuals, families, and businesses.
                    </p>
                    <div className="flex space-x-4 mt-6">
                        {social_links_data.map(link => (
                            socialIconMap[link.name] ? (
                                <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                    <span className="sr-only">{link.name}</span>
                                    {socialIconMap[link.name]}
                                </a>
                            ) : null
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-sm font-bold tracking-widest uppercase mb-4">Navigation</h3>
                        <ul className="space-y-3 text-gray-300">
                            {navigationLinks.map(link => (
                                <li key={link.name}><Link to={link.path} className="hover:text-brand-gold transition-colors">{link.name}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold tracking-widest uppercase mb-4">Solutions</h3>
                        <ul className="space-y-3 text-gray-300">
                            {solutionLinks.map(link => (
                                <li key={link.name}><Link to={link.path} className="hover:text-brand-gold transition-colors">{link.name}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold tracking-widest uppercase mb-4">Company</h3>
                        <ul className="space-y-3 text-gray-300">
                            {companyLinks.map(link => (
                                <li key={link.name}><Link to={link.path} className="hover:text-brand-gold transition-colors">{link.name}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold tracking-widest uppercase mb-4">Contact Us</h3>
                        <ul className="space-y-3 text-gray-300">
                            <li><a href={`mailto:${company_info.email}`} className="hover:text-brand-gold transition-colors">{company_info.email}</a></li>
                            <li><a href={`tel:${company_info.phone.replace(/\D/g, '')}`} className="hover:text-brand-gold transition-colors">{company_info.phone}</a></li>
                            <li>Des Moines, IA</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="py-6 bg-black/20">
                <div className="container mx-auto px-6 text-center text-xs text-gray-400">
                    <p className="mb-3">
                        © 2025 New Holland Financial Group | <a href="http://www.newhollandfinancial.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">www.newhollandfinancial.com</a>
                    </p>
                    <p className="max-w-4xl mx-auto leading-relaxed">
                        This website is for informational purposes only and does not constitute a complete description of our investment services or performance. This website is in no way a solicitation or offer to sell securities or investment advisory services except, where applicable, in states where we are registered or where an exemption or exclusion from such registration exists.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;