import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import type { Service } from '../types';
import Logo from './Logo';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useContent } from '../contexts/ContentContext';

const ShoppingCartIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg> );
const UserIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" /></svg> );

const backgroundImageBase64 = "data:image/webp;base64,UklGRq4MAABXRUJQVlA4IKIMAABwIgCdASoABQACPlEej0ajoaER+H+h2VAE/A/pr/V/mf+X/oPqf8J/0P95/sv99/4v+f/2X/t/y//g/cX/g/7p/if/N/rP/X/4H/P/6r/2/8p////P+if9X/3/9p/y//2/23/l/6v7P/9R/9f/h9wD/M/7D0z/sf8L/0v9t7gX+b/0/q5+0/8P/u/+X/pf/D/dvyj+yf7v/n/8x/pv+j/xP/V/bf///+f85/tf///9vxX/mf7X/v/+7/n/9f8AP6p/mP/f/13/A/5P/U/37///+X8lfyv+u/6v/N/7f+z/////+9p/yP/b/y/+b/2/9///+E/////+4D/m/+Z/zv+M/zH+5/////+5//0AAA/vr4x/57f/739f/b34V+bfrf6/+v/sP8f+3/9R/d/7P5uP/t5//fX8H+v/tP+S/v/97+yf9t/m/9H+xP5v9v/k/7/+1f8X+v/sf///+fn3//s39x+lO1a0vU2Bv/FjB3qf7N7G+w6/2OQ7N2n+zewvsO0f2b2N9h1/scg2btP9n9jfYdf7HIv/Ydf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N9h1/scg2btP9n9jfYdf7HINm7T/Z/Y32HX+xyDZu0/2f2N";

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const servicesMenuRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    
    const { content } = useContent();
    const { cartCount } = useCart();
    const { user, isAdmin, logout } = useAuth();
    const services: Omit<Service, 'icon'>[] = content.core_services;

    const navLinkClasses = "text-white hover:text-brand-gold transition-colors duration-300 pb-2 border-b-2 border-transparent hover:border-brand-gold";
    const activeNavLinkClasses = "text-brand-gold border-brand-gold";

    // Close menus on route change
    useEffect(() => {
        setIsMenuOpen(false);
        setIsServicesOpen(false);
    }, [location.pathname]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (servicesMenuRef.current && !servicesMenuRef.current.contains(event.target as Node)) {
                setIsServicesOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navLinks = [
        { name: 'About', path: '/about' },
        { name: 'Advisors', path: '/advisors' },
        { name: 'Resources', path: '/resources' },
        { name: 'Shop', path: '/products' },
        { name: 'Contact', path: '/contact' },
    ];

    const allMobileLinks = [
        { name: 'Home', path: '/' },
        ...navLinks.filter(l => l.name !== 'Services'), // remove services link to replace with dropdown
        ...services.map(s => ({ name: s.name, path: s.path })),
    ];


    return (
        <header className="relative bg-brand-blue text-white shadow-lg z-50">
            {/* Background Image and Blink Effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div 
                    className="absolute inset-0 bg-cover bg-center opacity-30"
                    style={{ backgroundImage: `url(${backgroundImageBase64})` }}
                ></div>
                <div 
                    className="absolute inset-0 animate-blink bg-repeat"
                    style={{
                        backgroundImage: `
                            radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '50px 50px',
                    }}
                ></div>
            </div>

            <div className="container mx-auto px-6 py-4 relative z-10">
                <div className="flex items-center justify-between">
                    <Link to="/"><Logo variant="light" /></Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-6">
                        <NavLink to="/" className={({isActive}) => isActive ? `${navLinkClasses} ${activeNavLinkClasses}` : navLinkClasses} end>Home</NavLink>
                        {/* Services Dropdown */}
                        <div className="relative" ref={servicesMenuRef}>
                            <button onClick={() => setIsServicesOpen(!isServicesOpen)} className={`${navLinkClasses} flex items-center`}>
                                Services <svg className={`w-4 h-4 ml-1 transform transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                            {isServicesOpen && (
                                <div className="absolute left-0 mt-4 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-2 animate-fade-in-down" style={{animationDuration: '300ms'}}>
                                    {services.map(service => (
                                        <Link key={service.path} to={service.path} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-brand-blue">{service.name}</Link>
                                    ))}
                                </div>
                            )}
                        </div>
                        {navLinks.map(link => (
                            <NavLink key={link.path} to={link.path} className={({isActive}) => isActive ? `${navLinkClasses} ${activeNavLinkClasses}` : navLinkClasses}>{link.name}</NavLink>
                        ))}
                    </nav>

                    {/* Icons & Mobile Menu Button */}
                    <div className="flex items-center space-x-4">
                        <Link to="/cart" className="relative p-2" aria-label="View shopping cart">
                            <ShoppingCartIcon />
                            {cartCount > 0 && <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{cartCount}</span>}
                        </Link>
                        {user ? (
                            <div className="relative group">
                                <Link to={isAdmin ? "/management-dashboard" : "/"} className="p-2 flex items-center gap-2"><UserIcon /> <span className="hidden sm:inline">{user.name.split(' ')[0]}</span></Link>
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block animate-fade-in" style={{animationDuration: '150ms'}}>
                                    {isAdmin && <Link to="/management-dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</Link>}
                                    <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                                </div>
                            </div>
                        ) : (
                           <Link to="/login" className="p-2 flex items-center gap-2 hover:text-brand-gold"><UserIcon /> <span className="hidden sm:inline">Login</span></Link>
                        )}
                        <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Open menu">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} /></svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden absolute w-full bg-brand-blue/95 backdrop-blur-sm shadow-xl animate-fade-in-down" style={{animationDuration: '300ms'}}>
                    <nav className="flex flex-col items-center space-y-4 py-6">
                        {allMobileLinks.map(link => (
                            <NavLink key={link.path} to={link.path} className="text-xl" end>{link.name}</NavLink>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;