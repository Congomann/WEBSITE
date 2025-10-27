
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { useContent } from '../contexts/ContentContext';
import { useAuth } from '../contexts/AuthContext';
import { Role } from '../types';

const LinkedInIcon = () => ( <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg> );
const FacebookIcon = () => ( <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z"/></svg> );
const InstagramIcon = () => ( <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664 4.771 4.919-4.919 1.266-.057 1.644-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/></svg> );
const TwitterIcon = () => ( <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.634 4.212 3.793 4.649-.65.177-1.354.238-2.08.188.608 1.923 2.373 3.256 4.478 3.3-1.625 1.27-3.673 2.023-5.892 2.023-.38 0-.755-.022-1.124-.067 2.099 1.343 4.6 2.123 7.332 2.123 8.793 0 13.5-7.29 13.5-13.5 0-.204-.005-.407-.014-.61.932-.67 1.743-1.51 2.388-2.478z"/></svg> );
const TikTokIcon = () => ( <svg fill="currentColor" viewBox="0 0 448 512" className="w-6 h-6"><path d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3v178.6a162.5 162.5 0 1 1 -162.5-162.5v100.3a74.6 74.6 0 1 0 149.2 0v-251.8a121.2 121.2 0 0 0 -242.4 0v22.2h74.5v-22.2a46.7 46.7 0 1 1 93.3 0v251.8a149.2 149.2 0 1 0 -149.2-149.2h74.5v-89.2a210.1 210.1 0 0 1 345.1 39.3z" /></svg> );
const SnapchatIcon = () => ( <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.111 4.234c.39 0 .72.115.989.345.27.23.405.532.405.907 0 .383-.135.688-.405.915-.27.227-.6.341-.99.341a.92.92 0 01-.99-.34c-.27-.228-.404-.532-.404-.916 0-.375.135-.676.404-.907.27-.23.599-.345.99-.345zm4.84 5.385c.036.324-.045.64-.225.946a1.9 1.9 0 01-.63.63l-2.736 1.84c-.234.162-.432.243-.594.243-.126 0-.252-.045-.378-.135l-1.35-1.017v3.25c0 .39-.08.69-.24.9-.16.21-.4.315-.72.315-.32 0-.56-.105-.72-.315-.16-.21-.24-.51-.24-.9V12.15l-1.35 1.017c-.126.09-.252.135-.378.135-.162 0-.36-.08-.594-.242L3.32 11.2c-.378-.27-.612-.603-.702-.999-.09-.395-.045-.756.135-1.08.18-.324.473-.563.878-.711.405-.149.81-.135 1.215.045L6.69 9.6l.306-.216c.36-.252.76-.378 1.2-.378h.414c.44 0 .84.126 1.2.378l.306.216 1.845-1.152c.405-.18.81-.194 1.215-.045.405.148.698.387.878.711.18.324.225.685.135 1.08z"/></svg>);
const ThreadsIcon = () => ( <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M12 2.75c-5.1 0-9.25 4.15-9.25 9.25s4.15 9.25 9.25 9.25 9.25-4.15 9.25-9.25S17.1 2.75 12 2.75zm0 1.5c4.28 0 7.75 3.47 7.75 7.75S16.28 19.5 12 19.5 4.25 16.03 4.25 11.75 7.72 4.25 12 4.25zm-2.83 5.37c-.32 0-.58.26-.58.58s.26.58.58.58h5.66c.32 0 .58-.26.58-.58s-.26-.58-.58-.58H9.17zm0 3c-.32 0-.58.26-.58.58s.26.58.58.58h5.66c.32 0 .58-.26.58-.58s-.26-.58-.58-.58H9.17z"/></svg>);


const Footer: React.FC = () => {
    const { content } = useContent();
    const { isAuthenticated, primaryDashboardPath } = useAuth();
    const navigate = useNavigate();
    const { social_links_data, company_info, core_services } = content;

    const socialIconMap: { [key: string]: React.ReactNode } = {
        'LinkedIn': <LinkedInIcon />,
        'Facebook': <FacebookIcon />,
        'Instagram': <InstagramIcon />,
        'Twitter': <TwitterIcon />,
        'TikTok': <TikTokIcon />,
        'Snapchat': <SnapchatIcon />,
        'Threads': <ThreadsIcon />,
    };

    const quickLinks = [
        { name: "About Us", path: "/about" },
        { name: "Find an Advisor", path: "/advisors" },
        { name: "Resources", path: "/resources" },
        { name: "Contact", path: "/contact" },
        { name: "Join Our Team", path: "/join-our-team" },
    ];
    
    const handleAdminLogin = () => {
        if (isAuthenticated && primaryDashboardPath) {
            navigate(primaryDashboardPath);
        } else {
            navigate('/login');
        }
    };

    return (
        <footer className="bg-brand-blue text-white">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div className="md:col-span-1">
                        <Logo />
                        <p className="mt-4 text-gray-400 text-sm">
                            Protecting your life, family, and future with personalized insurance solutions.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {quickLinks.map(link => (
                                <li key={link.path}>
                                    <Link to={link.path} className="text-gray-400 hover:text-brand-gold transition-colors">{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Our Services</h3>
                        <ul className="space-y-2">
                            {core_services.map(service => (
                                <li key={service.path}>
                                    <Link to={service.path} className="text-gray-400 hover:text-brand-gold transition-colors">{service.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Social */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Contact Us</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>Phone: <a href={`tel:${company_info.phone.replace(/\D/g, '')}`} className="hover:text-brand-gold">{company_info.phone}</a></li>
                            <li>Email: <a href={`mailto:${company_info.email}`} className="hover:text-brand-gold">{company_info.email}</a></li>
                        </ul>
                        <div className="flex space-x-4 mt-6">
                            {social_links_data.map(social => (
                                socialIconMap[social.name] && (
                                    <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-gold transition-colors" aria-label={social.name}>
                                        {socialIconMap[social.name]}
                                    </a>
                                )
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-black bg-opacity-20 py-4">
                <div className="container mx-auto px-6 text-center text-sm text-gray-400 flex justify-between items-center flex-col sm:flex-row">
                    <span>&copy; {new Date().getFullYear()} New Holland Financial Group. All Rights Reserved.</span>
                    <div className="mt-2 sm:mt-0">
                         <Link to="/privacy-policy" className="hover:text-brand-gold mx-2">Privacy Policy</Link> | 
                         <button onClick={handleAdminLogin} className="hover:text-brand-gold mx-2">Admin</button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
