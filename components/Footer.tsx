
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer: React.FC = () => {
    // Icons defined as components for clarity
    const FacebookIcon = () => (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.89v-2.98h2.89v-2.28c0-2.85 1.7-4.42 4.28-4.42 1.23 0 2.48.22 2.48.22v2.54h-1.3c-1.4 0-1.8.84-1.8 1.74v2.18h2.83l-.45 2.98h-2.38v7.01C18.343 21.128 22 16.991 22 12z"></path></svg>
    );
    const InstagramIcon = () => (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664 4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.441c-3.171 0-3.52.012-4.75.07-2.785.127-3.929 1.27-4.053 4.053-.058 1.23-.07 1.579-.07 4.75s.012 3.52.07 4.75c.125 2.785 1.269 3.929 4.053 4.053 1.23.058 1.579.07 4.75.07s3.52-.012 4.75-.07c2.785-.127 3.929-1.269 4.053-4.053.058-1.23.07-1.579.07-4.75s-.012-3.52-.07-4.75c-.125-2.785-1.269-3.929-4.053-4.053-1.23-.058-1.579-.07-4.75-.07zM12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zm0 1.441a2.31 2.31 0 110 4.62 2.31 2.31 0 010-4.62zM18.88 5.412a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"></path></svg>
    );
    const TwitterIcon = () => (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.223.085 4.924 4.924 0 004.6 3.419A9.9 9.9 0 010 19.54a13.94 13.94 0 007.548 2.21c9.058 0 14.01-7.502 14.01-14.013 0-.213-.005-.426-.015-.637a9.935 9.935 0 002.433-2.52z"></path></svg>
    );
    const LinkedInIcon = () => (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
    );
    const TikTokIcon = () => (
         <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M12.525.02c1.31-.02 2.61-.01 3.91.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.74-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"></path></svg>
    );
    const SnapchatIcon = () => (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M12.003 3.44c-4.97 0-9 4.03-9 9s4.03 9 9 9c.75 0 1.5-.09 2.22-.27.42-.11.85-.24 1.28-.41.34-.13.68-.28.98-.48.16-.1.32-.21.49-.32.11-.08.23-.15.34-.23.1-.07.2-.14.3-.22.1-.08.2-.17.29-.26l.1-.09c.09-.09.18-.18.27-.27.18-.2.36-.4.53-.61.15-.19.3-.39.43-.59.13-.21.25-.43.37-.65.1-.19.2-.38.29-.58.08-.18.16-.36.23-.55.07-.18.13-.37.19-.56.06-.18.11-.37.16-.56.05-.18.09-.37.13-.56.04-.18.07-.37.1-.56.03-.18.05-.36.07-.55.02-.18.03-.37.04-.56.01-.18.01-.37.01-.56V12c0-4.97-4.03-9-9-9zm-5.46 7.42c.16-.14.33-.28.52-.4.4-.25.84-.44 1.32-.55.22-.05.44-.08.66-.1.4-.04.81-.04 1.21-.02.41.02.82.08 1.21.18.42.1.81.26 1.17.48.18.11.35.23.52.36.08.06.16.13.24.19.14.12.28.24.41.38.12.12.23.25.34.39s.21.28.3.44c.05.08.09.16.13.25.08.16.15.33.21.5.06.16.11.33.15.5.04.16.07.33.09.5.02.16.03.32.03.49s-.01.33-.03.49c-.02.17-.05.33-.09.5-.04.17-.09.34-.15.5-.06.17-.13.34-.21.5-.04.09-.08.17-.13.25-.09.16-.19.31-.3.44s-.22.27-.34.39c-.13.14-.27.26-.41.38-.08.06-.16.13-.24.19-.17.13-.34.25-.52.36-.36.22-.75.38-1.17.48-.39.1-.8.16-1.21.18-.4.02-.81.02-1.21-.02-.22-.01-.44-.04-.66-.1-.48-.11-.92-.3-1.32-.55-.19-.12-.36-.26-.52-.4-.18-.16-.34-.33-.5-.51-.14-.17-.28-.35-.39-.55-.1-.18-.19-.38-.26-.58-.06-.2-.12-.4-.16-.61-.04-.2-.07-.4-.09-.61-.02-.2-.02-.4-.02-.61s0-.41.02-.61c.02-.21.05-.41.09-.61.04-.21.1-.41.16-.61.07-.2.16-.4.26-.58.11-.2.25-.38.39-.55.16-.18.32-.35.5-.51z" ></path></svg>
    );

    const socialLinks = [
        { name: 'Facebook', icon: <FacebookIcon />, url: 'https://facebook.com/newhollandfinancial' },
        { name: 'Instagram', icon: <InstagramIcon />, url: 'https://instagram.com/newhollandfinancial' },
        { name: 'Twitter', icon: <TwitterIcon />, url: 'https://twitter.com/Newhollandfg' },
        { name: 'LinkedIn', icon: <LinkedInIcon />, url: 'https://linkedin.com/company/newhollandfinancial' },
        { name: 'TikTok', icon: <TikTokIcon />, url: 'https://tiktok.com/@newhollandfinancial' },
        { name: 'Snapchat', icon: <SnapchatIcon />, url: 'https://snapchat.com/add/newhollandfinancial' },
    ];

    const linkClasses = "hover:text-brand-gold transition-colors focus:outline-none focus-visible:text-brand-gold focus-visible:underline rounded";
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-brand-blue text-white">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* About Section */}
                    <div className="lg:col-span-1">
                        <div className="mb-4">
                            <Logo variant="light" />
                        </div>
                        <p className="text-gray-400 mb-6">Protecting what matters most. Your life, your family, your future.</p>
                        <div className="flex space-x-4">
                            {socialLinks.map(social => (
                                <a 
                                    key={social.name} 
                                    href={social.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    aria-label={`Follow us on ${social.name}`} 
                                    className="text-gray-300 hover:text-brand-gold transition-colors duration-300 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-blue focus-visible:ring-white"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                    {/* Quick Links Section */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
                        <ul>
                            <li className="mb-2"><Link to="/" className={linkClasses}>Home</Link></li>
                            <li className="mb-2"><Link to="/about" className={linkClasses}>About Us</Link></li>
                            <li className="mb-2"><Link to="/services/life" className={linkClasses}>Services</Link></li>
                            <li className="mb-2"><Link to="/advisors" className={linkClasses}>Advisors</Link></li>
                            <li className="mb-2"><Link to="/resources" className={linkClasses}>Resources</Link></li>
                            <li className="mb-2"><Link to="/contact" className={linkClasses}>Contact Us</Link></li>
                        </ul>
                    </div>
                    {/* Contact Us Section */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
                        <div className="space-y-4 text-gray-300">
                            <p className="flex items-start">
                                <svg className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                <span>Des Moines, IA</span>
                            </p>
                            <p className="flex items-start">
                                <svg className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                <a href="tel:717-847-9638" className="hover:text-brand-gold">(717) 847-9638</a>
                            </p>
                            <p className="flex items-start">
                                <svg className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                <a href="mailto:support@newhollandfinancial.com" className="hover:text-brand-gold">support@newhollandfinancial.com</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
                    <p>&copy; {currentYear} New Holland Financial Group. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
