import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import type { Service } from '../types';
import Logo from './Logo';
import { useCart } from '../contexts/CartContext';
import GlobalSearch from './GlobalSearch';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/DataContext';

const ShoppingCartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);


const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
    const [isDesktopServicesOpen, setIsDesktopServicesOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { services } = useData();
    const { cartCount } = useCart();
    const { currentUser } = useAuth();
    
    const location = useLocation();
    const desktopServicesRef = useRef<HTMLDivElement>(null);

    // Close menus on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsMobileServicesOpen(false);
        setIsDesktopServicesOpen(false);
    }, [location.pathname]);
    
    // Close desktop dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (desktopServicesRef.current && !desktopServicesRef.current.contains(event.target as Node)) {
                setIsDesktopServicesOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navLinkClasses = "block lg:inline-block px-4 py-2 text-white hover:text-brand-gold transition-colors duration-300 rounded focus:outline-none focus-visible:text-brand-gold focus-visible:underline";
    const activeLinkClasses = "text-brand-gold";

    const toggleDesktopServices = () => setIsDesktopServicesOpen(prev => !prev);
    const handleDesktopServicesKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') setIsDesktopServicesOpen(false);
    };

    const crmLink = currentUser 
        ? <Link to="/crm/dashboard" className="text-white hover:text-brand-gold transition-colors">CRM Dashboard</Link>
        : <Link to="/crm/login" className="text-white hover:text-brand-gold transition-colors">CRM Login</Link>;

    return (
        <header className="bg-brand-blue shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <Link to="/" aria-label="New Holland Financial Group Home">
                    <Logo variant="light" />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-2">
                    <NavLink to="/" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Home</NavLink>
                    <NavLink to="/about" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>About Us</NavLink>
                    <NavLink to="/advisors" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Advisors</NavLink>
                    <div className="relative" ref={desktopServicesRef} onKeyDown={handleDesktopServicesKeyDown}>
                        <button 
                            className={`${navLinkClasses} flex items-center`} 
                            aria-haspopup="true" 
                            aria-expanded={isDesktopServicesOpen}
                            aria-controls="desktop-services-menu"
                            onClick={toggleDesktopServices}
                        >
                            Services
                            <svg className={`w-4 h-4 ml-1 transform transition-transform ${isDesktopServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        {isDesktopServicesOpen && (
                            <div id="desktop-services-menu" className="absolute left-0 mt-2 w-72 bg-brand-blue rounded-md shadow-xl py-2 animate-fade-in-down" style={{animationDuration: '300ms'}}>
                                {services.map(service => (
                                    <NavLink 
                                        key={service.path} 
                                        to={service.path} 
                                        className={({ isActive }) => `block px-4 py-3 text-white hover:bg-white/10 transition-colors duration-200 group focus:outline-none focus-visible:bg-white/10 ${isActive ? 'bg-white/10' : ''}`}
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <span className={`font-semibold block group-hover:text-brand-gold group-focus-visible:text-brand-gold ${isActive ? 'text-brand-gold' : ''}`}>{service.name}</span>
                                                <span className="text-xs text-gray-400 block">{service.description}</span>
                                            </>
                                        )}
                                    </NavLink>
                                ))}
                            </div>
                        )}
                    </div>
                    <NavLink to="/blog" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Blog</NavLink>
                    <NavLink to="/resources" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Resources</NavLink>
                    <NavLink to="/products" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Shop</NavLink>
                    <NavLink to="/join-our-team" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Join Our Team</NavLink>
                    <NavLink to="/contact" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Contact Us</NavLink>
                </nav>
                 <div className="hidden lg:flex items-center space-x-4">
                    {crmLink}
                    <span className="text-gray-500">|</span>
                    <Link to="/contact" className="inline-block bg-brand-gold text-brand-blue font-bold py-2 px-6 rounded-full hover:bg-yellow-400 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-blue focus-visible:ring-yellow-400">
                        Get a Free Quote
                    </Link>
                    <div className="flex items-center space-x-1">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="text-white p-2 rounded-full hover:bg-white/10 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                            aria-label="Open search"
                        >
                            <SearchIcon />
                        </button>
                        <Link to="/cart" className="relative text-white p-2 rounded-full hover:bg-white/10 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white" aria-label={`Shopping cart with ${cartCount} items`}>
                            <ShoppingCartIcon />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white focus:outline-none p-2 rounded-md focus-visible:ring-2 focus-visible:ring-white" aria-label="Toggle mobile menu" aria-expanded={isMobileMenuOpen} aria-controls="mobile-menu">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                        </svg>
                    </button>
                </div>
            </div>
            
            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div id="mobile-menu" className="lg:hidden bg-brand-blue pb-4">
                    <NavLink to="/" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Home</NavLink>
                    <NavLink to="/about" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>About Us</NavLink>
                    <NavLink to="/advisors" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Advisors</NavLink>
                    <div className="px-4 py-2">
                         <button onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)} className="w-full text-left text-white hover:text-brand-gold transition-colors duration-300 flex justify-between items-center" aria-haspopup="true" aria-expanded={isMobileServicesOpen} aria-controls="mobile-services-menu">
                             Services
                             <svg className={`w-4 h-4 ml-1 transform transition-transform ${isMobileServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                         </button>
                         {isMobileServicesOpen && (
                            <div id="mobile-services-menu" className="mt-2 pl-4">
                               {services.map(service => (
                                    <NavLink 
                                        key={service.path} 
                                        to={service.path} 
                                        className="block py-2 group" 
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <span className={`font-semibold block text-white group-hover:text-brand-gold transition-colors duration-200 ${isActive ? 'text-brand-gold' : ''}`}>{service.name}</span>
                                                <span className="text-xs text-gray-400 block">{service.description}</span>
                                            </>
                                        )}
                                    </NavLink>
                                ))}
                            </div>
                         )}
                    </div>
                    <NavLink to="/blog" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Blog</NavLink>
                    <NavLink to="/resources" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Resources</NavLink>
                    <NavLink to="/products" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Shop</NavLink>
                    <NavLink to="/join-our-team" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Join Our Team</NavLink>
                    <NavLink to="/contact" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Contact Us</NavLink>
                    <div className="border-t border-white/20 my-4"></div>
                     <div className="px-4 py-2 text-white hover:text-brand-gold">{crmLink}</div>
                    <div className="mt-4 px-4 flex items-center justify-between gap-4">
                        <Link to="/contact" className="flex-grow text-center bg-brand-gold text-brand-blue font-bold py-2 px-6 rounded-full hover:bg-yellow-400 transition-colors duration-300">
                            Get a Free Quote
                        </Link>
                         <div className="flex items-center gap-1">
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="relative flex-shrink-0 text-white p-2 rounded-full hover:bg-white/10 transition-colors duration-300"
                                aria-label="Open search"
                            >
                                <SearchIcon />
                            </button>
                            <Link to="/cart" className="relative flex-shrink-0 text-white p-2 rounded-full hover:bg-white/10 transition-colors duration-300" aria-label={`Shopping cart with ${cartCount} items`}>
                                <ShoppingCartIcon />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                         </div>
                    </div>
                </div>
            )}
            <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </header>
    );
};

export default React.memo(Header);