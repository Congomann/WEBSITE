

import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import type { Service } from '../types';
import Logo from './Logo';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useContent } from '../contexts/ContentContext';

// FIX: Added missing Header component definition and default export to resolve the import error in App.tsx. The original file content was corrupted and incomplete.
const ShoppingCartIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg> );
const UserIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg> );
const ChevronDownIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg> );

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const location = useLocation();
    const { cartCount } = useCart();
    const { isAuthenticated, user, logout, primaryDashboardPath } = useAuth();
    const { content } = useContent();
    const services: Omit<Service, 'icon'>[] = content.core_services;
    const servicesMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMenuOpen(false);
        setIsServicesOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (servicesMenuRef.current && !servicesMenuRef.current.contains(event.target as Node)) {
                setIsServicesOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const navLinkClasses = "text-white hover:text-brand-gold transition-colors duration-300";
    const activeLinkClasses = "text-brand-gold";

    const mainNavLinks = [
        { path: "/advisors", name: "Find an Advisor" },
        { path: "/resources", name: "Resources" },
        { path: "/contact", name: "Contact" },
        { path: "/about", name: "About Us" },
        { path: "/products", name: "Shop" },
    ];

    const renderNavLinks = (isMobile = false) => (
        <>
            {/* Services Dropdown */}
            <div className={`relative ${isMobile ? 'w-full' : ''}`} ref={servicesMenuRef}>
                <button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    className={`${navLinkClasses} flex items-center gap-1 ${isMobile ? 'px-4 py-2 w-full text-left' : ''}`}
                >
                    Services <ChevronDownIcon />
                </button>
                {isServicesOpen && (
                    <div className={`${isMobile ? 'pl-4' : 'absolute z-20 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'}`}>
                        {services.map(service => (
                            <NavLink
                                key={service.path}
                                to={service.path}
                                className={({ isActive }) => 
                                    isMobile
                                    ? `block px-4 py-2 text-sm text-gray-400 hover:text-brand-gold ${isActive ? 'text-brand-gold' : ''}`
                                    : `block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-brand-blue ${isActive ? 'bg-gray-100 text-brand-blue' : ''}`
                                }
                            >
                                {service.name}
                            </NavLink>
                        ))}
                    </div>
                )}
            </div>
            {mainNavLinks.map(link => (
                <NavLink key={link.path} to={link.path} className={({ isActive }) => `${isMobile ? 'block px-4 py-2' : ''} ${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
                    {link.name}
                </NavLink>
            ))}
        </>
    );

    return (
        <header className="bg-brand-blue text-white fixed w-full z-50 shadow-lg">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-24">
                    <Link to="/" className="flex items-center">
                        <Logo />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-8 font-semibold">
                        {renderNavLinks()}
                    </nav>

                    {/* Icons and Auth */}
                    <div className="flex items-center space-x-4">
                        <Link to="/cart" className="relative text-white hover:text-brand-gold transition-colors duration-300">
                            <ShoppingCartIcon />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-brand-gold text-brand-blue text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {isAuthenticated ? (
                             <div className="relative group">
                                <button className="flex items-center gap-2 text-white hover:text-brand-gold transition-colors duration-300">
                                    <UserIcon />
                                    <span className="hidden sm:inline">{user?.name.split(' ')[0]}</span>
                                </button>
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 hidden group-hover:block">
                                    {primaryDashboardPath && (
                                        <Link to={primaryDashboardPath} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</Link>
                                    )}
                                    {user?.role === 'admin' && (
                                        <Link to="/crm/content-management" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Content Mgt.</Link>
                                    )}
                                    <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login" className="text-white hover:text-brand-gold transition-colors duration-300 font-semibold flex items-center gap-2">
                                <UserIcon />
                                <span className="hidden sm:inline">Sign In</span>
                            </Link>
                        )}

                        <button
                            className="lg:hidden text-white focus:outline-none"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="lg:hidden bg-brand-blue/95 absolute w-full">
                    <nav className="flex flex-col items-start px-6 pb-6 space-y-2 font-semibold">
                        {renderNavLinks(true)}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;