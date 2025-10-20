import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import type { Service } from '../types';
import Logo from './Logo';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useContent } from '../contexts/ContentContext';

const ShoppingCartIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg> );
const UserIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" /></svg> );

const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
    const [isDesktopServicesOpen, setIsDesktopServicesOpen] = useState(false);
    const { content } = useContent();
    const services: Omit<Service, 'icon'>[] = content.core_services;
    const { cartCount } = useCart();
    const { isAuthenticated, user, logout } = useAuth();
    
    const location = useLocation();
    const desktopServicesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsMobileServicesOpen(false);
        setIsDesktopServicesOpen(false);
    }, [location.pathname]);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (desktopServicesRef.current && !desktopServicesRef.current.contains(event.target as Node)) {
                setIsDesktopServicesOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navLinkClasses = "block lg:inline-block px-4 py-2 text-white hover:text-brand-gold";
    const activeLinkClasses = "text-brand-gold";

    return (
        <header className="bg-brand-blue shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <Link to="/" aria-label="Home"><Logo variant="light" /></Link>

                <nav className="hidden lg:flex items-center space-x-2">
                    <NavLink to="/" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Home</NavLink>
                    <NavLink to="/about" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>About Us</NavLink>
                    <NavLink to="/advisors" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Advisors</NavLink>
                    <div className="relative" ref={desktopServicesRef} onMouseEnter={() => setIsDesktopServicesOpen(true)} onMouseLeave={() => setIsDesktopServicesOpen(false)}>
                        <button className={`${navLinkClasses} flex items-center`} aria-haspopup="true" aria-expanded={isDesktopServicesOpen}>Services</button>
                        {isDesktopServicesOpen && (
                            <div className="absolute left-0 mt-2 w-72 bg-brand-blue rounded-md shadow-xl py-2 animate-fade-in-down">
                                {services.map(service => (
                                    <NavLink key={service.path} to={service.path} className={({ isActive }) => `block px-4 py-3 text-white hover:bg-white/10 ${isActive ? 'bg-white/10' : ''}`}>
                                        <span className="font-semibold block">{service.name}</span>
                                        <span className="text-xs text-gray-400 block">{service.description}</span>
                                    </NavLink>
                                ))}
                            </div>
                        )}
                    </div>
                    <NavLink to="/resources" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Resources</NavLink>
                    <NavLink to="/products" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Shop</NavLink>
                    <NavLink to="/contact" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Contact</NavLink>
                </nav>
                 <div className="hidden lg:flex items-center space-x-4">
                    <Link to="/contact" className="bg-brand-gold text-brand-blue font-bold py-2 px-6 rounded-full hover:bg-yellow-400">Get a Quote</Link>
                     <Link to="/cart" className="relative text-white p-2 rounded-full hover:bg-white/10" aria-label={`Cart with ${cartCount} items`}>
                        <ShoppingCartIcon />
                        {cartCount > 0 && (<span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs">{cartCount}</span>)}
                    </Link>
                    {isAuthenticated ? <button onClick={logout} className="text-white p-2 rounded-full hover:bg-white/10" aria-label="Logout"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg></button> : <Link to="/login" className="flex items-center text-white p-2 rounded-full hover:bg-white/10" aria-label="Login"><UserIcon /><span className="ml-2">Login</span></Link>}
                </div>

                <div className="lg:hidden">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white" aria-label="Toggle menu"><svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} /></svg></button>
                </div>
            </div>
            
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-brand-blue pb-4">
                    <NavLink to="/" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Home</NavLink>
                    <NavLink to="/about" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>About Us</NavLink>
                    <NavLink to="/advisors" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Advisors</NavLink>
                    <div className="px-4 py-2">
                         <button onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)} className="w-full text-left text-white">Services</button>
                         {isMobileServicesOpen && (
                            <div className="mt-2 pl-4">{services.map(service => (<NavLink key={service.path} to={service.path} className="block py-2 text-white"><span className="font-semibold">{service.name}</span><span className="text-xs text-gray-400 block">{service.description}</span></NavLink>))}</div>
                         )}
                    </div>
                    <NavLink to="/resources" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Resources</NavLink>
                    <NavLink to="/products" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Shop</NavLink>
                    <NavLink to="/contact" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Contact</NavLink>
                    <div className="mt-4 px-4 flex items-center justify-between gap-4">
                        <Link to="/contact" className="flex-grow text-center bg-brand-gold text-brand-blue font-bold py-2 px-6 rounded-full">Get a Quote</Link>
                         <Link to="/cart" className="relative text-white p-2" aria-label={`Cart with ${cartCount} items`}><ShoppingCartIcon />{cartCount > 0 && (<span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs">{cartCount}</span>)}</Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default React.memo(Header);