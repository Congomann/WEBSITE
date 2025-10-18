
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer: React.FC = () => {
    // Icons for social media links, as specified in the mockup
    const LinkedInIcon = () => (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
    );
    const FacebookIcon = () => (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.89v-2.98h2.89v-2.28c0-2.85 1.7-4.42 4.28-4.42 1.23 0 2.48.22 2.48.22v2.54h-1.3c-1.4 0-1.8.84-1.8 1.74v2.18h2.83l-.45 2.98h-2.38v7.01C18.343 21.128 22 16.991 22 12z"></path></svg>
    );
    const InstagramIcon = () => (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664 4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.441c-3.171 0-3.52.012-4.75.07-2.785.127-3.929 1.27-4.053 4.053-.058 1.23-.07 1.579-.07 4.75s.012 3.52.07 4.75c.125 2.785 1.269 3.929 4.053 4.053 1.23.058 1.579.07 4.75.07s3.52-.012 4.75-.07c2.785-.127 3.929-1.269 4.053-4.053.058-1.23.07-1.579.07-4.75s-.012-3.52-.07-4.75c-.125-2.785-1.269-3.929-4.053-4.053-1.23-.058-1.579-.07-4.75-.07zM12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zm0 1.441a2.31 2.31 0 110 4.62 2.31 2.31 0 010-4.62zM18.88 5.412a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"></path></svg>
    );
    const TwitterIcon = () => (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.223.085 4.924 4.924 0 004.6 3.419A9.9 9.9 0 010 19.54a13.94 13.94 0 007.548 2.21c9.058 0 14.01-7.502 14.01-14.013 0-.213-.005-.426-.015-.637a9.935 9.935 0 002.433-2.52z"></path></svg>
    );

    const socialLinks = [
        { name: 'LinkedIn', icon: <LinkedInIcon />, url: 'https://linkedin.com/company/newhollandfinancial' },
        { name: 'Facebook', icon: <FacebookIcon />, url: 'https://facebook.com/newhollandfinancial' },
        { name: 'Instagram', icon: <InstagramIcon />, url: 'https://instagram.com/newhollandfinancial' },
        { name: 'Twitter', icon: <TwitterIcon />, url: 'https://twitter.com/Newhollandfg' },
    ];

    const linkClasses = "text-gray-300 hover:text-white transition-colors duration-200";
    const headingClasses = "font-semibold uppercase tracking-wider text-white text-sm mb-4";

    return (
        <footer className="bg-slate-800 text-white">
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
                    {/* About Section */}
                    <div className="sm:col-span-2 lg:col-span-2">
                        <div className="mb-6">
                            <Logo variant="light" />
                        </div>
                        <p className="text-gray-400 mb-6 max-w-sm">
                            Providing tailored insurance solutions that secure financial peace of mind for individuals, families, and businesses.
                        </p>
                        <div className="flex space-x-3">
                            {socialLinks.map(social => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Follow us on ${social.name}`}
                                    className="text-white bg-slate-700 p-2 rounded-md hover:bg-slate-600 hover:text-white transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800 focus-visible:ring-white"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div>
                        <h4 className={headingClasses}>Navigation</h4>
                        <ul className="space-y-3">
                            <li><Link to="/" className={linkClasses}>Home</Link></li>
                            <li><Link to="/products" className={linkClasses}>Shop Insurance</Link></li>
                            <li><Link to="/advisors" className={linkClasses}>Find an Advisor</Link></li>
                            <li><Link to="/resources" className={linkClasses}>Resources</Link></li>
                            <li><Link to="/contact" className={linkClasses}>Contact</Link></li>
                        </ul>
                    </div>
                    
                    {/* Solutions Links */}
                    <div>
                        <h4 className={headingClasses}>Solutions</h4>
                        <ul className="space-y-3">
                            <li><Link to="/services/life" className={linkClasses}>Life Insurance</Link></li>
                            <li><Link to="/services/health" className={linkClasses}>Health & Benefits</Link></li>
                            <li><Link to="/services/property" className={linkClasses}>Home & Property</Link></li>
                            <li><Link to="/services/auto" className={linkClasses}>Auto & Commercial</Link></li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className={headingClasses}>Company</h4>
                        <ul className="space-y-3">
                            <li><Link to="/about" className={linkClasses}>About Us</Link></li>
                            <li><Link to="/join-our-team" className={linkClasses}>Join Our Team</Link></li>
                            <li><Link to="/crm/login" className={linkClasses}>Agent Portal</Link></li>
                            <li><Link to="/terms-of-service" className={linkClasses}>Terms of Service</Link></li>
                            <li><Link to="/privacy-policy" className={linkClasses}>Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className={headingClasses}>Contact Us</h4>
                        <ul className="space-y-3 text-gray-300">
                            <li><a href="mailto:Info@newhollandfinancial.com" className="hover:text-white">Info@newhollandfinancial.com</a></li>
                            <li><a href="tel:717-847-9638" className="hover:text-white">(717) 847-9638</a></li>
                            <li>Des Moines, IA</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 border-t border-gray-700 pt-8 text-center text-gray-400 text-xs space-y-4">
                    <p>
                        © 2025 New Holland Financial Group | www.newhollandfinancial.com
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
