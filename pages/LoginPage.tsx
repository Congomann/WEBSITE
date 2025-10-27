
import React, { useState, FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SEO from '../components/SEO';
import Logo from '../components/Logo';
import { Role } from '../types';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { login, switchRole } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = (location.state as any)?.from?.pathname || '/';

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const user = await login(email);
            const crmRoles = [Role.Admin, Role.Manager, Role.SubAdmin, Role.Underwriter, Role.Advisor];
            let destination = from;

            if (user && crmRoles.includes(user.role)) {
                destination = '/crm';
            }
            
            navigate(destination, { replace: true });

        } catch (err: any) {
            setError(err.message || 'Failed to log in. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleQuickLogin = (role: Role) => {
        setIsLoading(true);
        setError(null);
        setTimeout(() => {
            try {
                switchRole(role, navigate);
            } catch (e: any) {
                setError(e.message);
                setIsLoading(false);
            }
        }, 300);
    };

    const quickLoginButtonStyles = "w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50";

    return (
        <div className="min-h-screen bg-brand-light flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <SEO title="Sign In" description="Access the New Holland Financial Group portal." noIndex={true} />
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <Logo variant="dark" />
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-brand-blue">
                    Sign In
                </h2>
                 <p className="mt-2 text-center text-sm text-gray-600 max-w-xs mx-auto">
                    Use <span className="font-medium">admin@nhf.com</span>, <span className="font-medium">manager@nhf.com</span>, <span className="font-medium">jessica.miller@...</span>, etc. for demo access.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-2xl rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm bg-white text-gray-900"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm bg-white text-gray-900"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 p-3 rounded-md">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-blue hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue disabled:bg-gray-400"
                            >
                                {isLoading ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                ) : (
                                    'Sign in'
                                )}
                            </button>
                        </div>
                    </form>
                    
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300" /></div>
                            <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Quick login for development</span></div>
                        </div>
                        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <button type="button" onClick={() => handleQuickLogin(Role.Admin)} disabled={isLoading} className={quickLoginButtonStyles}>Admin</button>
                            <button type="button" onClick={() => handleQuickLogin(Role.Manager)} disabled={isLoading} className={quickLoginButtonStyles}>Manager</button>
                            <button type="button" onClick={() => handleQuickLogin(Role.SubAdmin)} disabled={isLoading} className={quickLoginButtonStyles}>Sub-Admin</button>
                            <button type="button" onClick={() => handleQuickLogin(Role.Advisor)} disabled={isLoading} className={quickLoginButtonStyles}>Advisor</button>
                            <div className="sm:col-span-2">
                                <button type="button" onClick={() => handleQuickLogin(Role.Underwriter)} disabled={isLoading} className={quickLoginButtonStyles}>Underwriter</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LoginPage;