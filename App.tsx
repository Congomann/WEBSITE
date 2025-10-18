
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Routes, Route, Link, Outlet, Navigate, NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth, useData, useTheme } from './contexts/DataContext';
import Logo from './components/Logo';
// FIX: Aliased the User icon component to UserIcon to avoid name collision with the User type.
import { LayoutDashboard, Users, User as UserIcon, DollarSign, LogOut, Sun, Moon, Search, ChevronLeft, Mail, Phone, CheckSquare, Plus, Trash2, Edit, AlertTriangle } from 'lucide-react';
// FIX: Imported the User type to be used in component props.
import type { Lead, Client, Task, User } from './types';

// Layout Components
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Breadcrumbs from './components/Breadcrumbs';
import CartToast from './components/CartToast';
import AnalyticsTracker from './components/AnalyticsTracker';
import LoadingSpinner from './components/LoadingSpinner';

// Page Components
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AdvisorsPage from './pages/AdvisorsPage';
import AdvisorProfilePage from './pages/AdvisorProfilePage';
import ContactPage from './pages/ContactPage';
import ResourcesPage from './pages/ResourcesPage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import JoinOurTeamPage from './pages/JoinOurTeamPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';

// Service Page Components
import LifeInsurancePage from './pages/services/LifeInsurancePage';
import AutoInsurancePage from './pages/services/AutoInsurancePage';
import PropertyInsurancePage from './pages/services/PropertyInsurancePage';
import HealthInsurancePage from './pages/services/HealthInsurancePage';
import GroupBenefitsPage from './pages/services/GroupBenefitsPage';
import RealEstatePage from './pages/services/RealEstatePage';


// --- CRM COMPONENTS (Self-contained for simplicity) ---

// CRM: Protected Route
const ProtectedRoute = () => {
    const { currentUser, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!currentUser) {
        return <Navigate to="/crm/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

// CRM: Login Page
const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const [email, setEmail] = useState('agent@nhf.com');
    const [password, setPassword] = useState('password123');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const from = location.state?.from?.pathname || '/crm/dashboard';

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const { success } = await login(email, password);
            if (success) {
                navigate(from, { replace: true });
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } catch (err) {
            setError('An error occurred during login.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900">
            <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
                <div className="text-center">
                    <Link to="/"><Logo variant="dark" className="justify-center" /></Link>
                    <h2 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">Agent Portal Login</h2>
                </div>
                <form className="space-y-6" onSubmit={handleLogin}>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <div>
                        <label className="text-sm font-bold text-slate-600 dark:text-slate-300" htmlFor="email">Email</label>
                        <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 mt-1 text-slate-900 bg-slate-50 dark:bg-slate-700 dark:text-white border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500" required />
                    </div>
                     <div>
                        <label className="text-sm font-bold text-slate-600 dark:text-slate-300" htmlFor="password">Password</label>
                        <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 mt-1 text-slate-900 bg-slate-50 dark:bg-slate-700 dark:text-white border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500" required />
                         <p className="text-xs text-slate-500 mt-2">Hint: Any email/password will work for this demo.</p>
                    </div>
                    <button type="submit" disabled={isLoading} className="w-full py-3 font-bold text-white bg-violet-600 rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:bg-slate-400">
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

// CRM: Layout
const CRMLayout: React.FC = () => {
    const { currentUser, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { leads, clients } = useData();
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<({ type: 'Lead'; data: Lead } | { type: 'Client'; data: Client })[]>([]);
    const searchRef = useRef<HTMLDivElement>(null);

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
            isActive ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-white' : 'text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white'
        }`;

    useEffect(() => {
        if (searchQuery.length > 1) {
            const lowerCaseQuery = searchQuery.toLowerCase();
            const filteredLeads = leads
                .filter(lead => lead.name.toLowerCase().includes(lowerCaseQuery) || lead.email.toLowerCase().includes(lowerCaseQuery))
                .map(data => ({ type: 'Lead' as const, data }));
            
            const filteredClients = clients
                .filter(client => client.name.toLowerCase().includes(lowerCaseQuery) || client.email.toLowerCase().includes(lowerCaseQuery))
                .map(data => ({ type: 'Client' as const, data }));

            setSearchResults([...filteredLeads, ...filteredClients]);
        } else {
            setSearchResults([]);
        }
    }, [searchQuery, leads, clients]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setSearchQuery('');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleResultClick = (path: string) => {
        setSearchQuery('');
        setSearchResults([]);
        navigate(path);
    };

    return (
        <div className="flex h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
            <aside className="w-64 flex-shrink-0 bg-white dark:bg-slate-800 border-r dark:border-slate-700 flex flex-col">
                <div className="h-16 flex items-center justify-center border-b dark:border-slate-700 px-4">
                     <Link to="/"><Logo variant={theme === 'dark' ? 'light' : 'dark'} /></Link>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-2">
                    <NavLink to="/crm/dashboard" className={navLinkClass}><LayoutDashboard className="w-5 h-5 mr-3" />Dashboard</NavLink>
                    <NavLink to="/crm/leads" className={navLinkClass}><Users className="w-5 h-5 mr-3" />Leads</NavLink>
                    {/* FIX: Updated to use aliased UserIcon component. */}
                    <NavLink to="/crm/clients" className={navLinkClass}><UserIcon className="w-5 h-5 mr-3" />My Clients</NavLink>
                    <NavLink to="/crm/tasks" className={navLinkClass}><CheckSquare className="w-5 h-5 mr-3" />Tasks</NavLink>
                    <NavLink to="/crm/commissions" className={navLinkClass}><DollarSign className="w-5 h-5 mr-3" />Commissions</NavLink>
                </nav>
                <div className="p-4 border-t dark:border-slate-700">
                    <div className="flex items-center mb-4">
                        <img src={currentUser?.photoURL || ''} alt={currentUser?.displayName || 'User'} className="w-10 h-10 rounded-full" />
                        <div className="ml-3">
                            <p className="font-semibold text-sm">{currentUser?.displayName}</p>
                            <p className="text-xs text-slate-500">{currentUser?.role}</p>
                        </div>
                    </div>
                    <button onClick={toggleTheme} className="w-full flex items-center justify-center p-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg mb-2">
                        {theme === 'light' ? <Moon className="w-4 h-4 mr-2" /> : <Sun className="w-4 h-4 mr-2" />}
                        Toggle Theme
                    </button>
                    <button onClick={logout} className="w-full flex items-center p-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg">
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </button>
                </div>
            </aside>
            <main className="flex-1 overflow-y-auto">
                <header className="sticky top-0 z-10 bg-slate-100/80 dark:bg-slate-900/80 backdrop-blur-sm p-4 border-b border-slate-200 dark:border-slate-700">
                     <div ref={searchRef} className="relative w-full max-w-md mx-auto">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="search"
                            placeholder="Search leads, clients..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-full focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                         {searchResults.length > 0 && (
                            <div className="absolute top-full mt-2 w-full bg-white dark:bg-slate-800 rounded-lg shadow-lg border dark:border-slate-700 overflow-hidden max-h-80 overflow-y-auto">
                                <ul className="divide-y divide-slate-100 dark:divide-slate-700">
                                    {searchResults.map((result, index) => (
                                         <li key={`${result.type}-${result.data.id}-${index}`}>
                                            <button onClick={() => handleResultClick(`/crm/${result.type.toLowerCase()}s/${result.data.id}`)} className="w-full text-left p-3 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-3">
                                                {/* FIX: Updated to use aliased UserIcon component. */}
                                                {result.type === 'Lead' ? <Users className="w-4 h-4 text-violet-500" /> : <UserIcon className="w-4 h-4 text-sky-500" />}
                                                <div>
                                                    <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">{result.data.name}</p>
                                                    <p className="text-xs text-slate-500">{result.data.email}</p>
                                                </div>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </header>
                <div className="p-8">
                   <Outlet />
                </div>
            </main>
        </div>
    );
};

// CRM: Placeholder Pages
const CRMDashboardPage: React.FC = () => {
    const { currentUser } = useAuth();
    return <div><h1 className="text-3xl font-bold">Welcome back, {currentUser?.displayName}!</h1><p>This is your CRM dashboard.</p></div>;
};

// CRM: Lead Pages
const CRMLeadsListPage: React.FC = () => {
    const { leads, loading } = useData();
    if (loading) return <LoadingSpinner />;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Leads</h1>
            <div className="bg-white dark:bg-slate-800 shadow-lg rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-slate-700"><tr><th className="p-3 text-left">Name</th><th className="p-3 text-left">Status</th><th className="p-3 text-left">Source</th></tr></thead>
                    <tbody>
                        {leads.map(lead => (
                            <tr key={lead.id} className="border-b dark:border-slate-700">
                                <td className="p-3"><Link to={`/crm/leads/${lead.id}`} className="font-semibold text-violet-600 dark:text-violet-400 hover:underline">{lead.name}</Link></td>
                                <td className="p-3">{lead.status}</td>
                                <td className="p-3">{lead.source}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const CRMLeadDetailPage: React.FC = () => {
    const { leadId } = useParams<{ leadId: string }>();
    const { leads, loading } = useData();
    const lead = useMemo(() => leads.find(l => l.id === leadId), [leads, leadId]);

    if (loading) return <LoadingSpinner />;
    if (!lead) return <Navigate to="/crm/leads" replace />;

    return (
        <div>
            <Link to="/crm/leads" className="inline-flex items-center mb-6 text-sm font-semibold text-violet-600 hover:text-violet-800"><ChevronLeft className="w-4 h-4 mr-1" /> Back to Leads</Link>
            <h1 className="text-3xl font-bold mb-2">{lead.name}</h1>
            <p className="text-slate-500 mb-6">Lead ID: {lead.id}</p>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><p className="font-semibold">Status</p><p>{lead.status}</p></div>
                <div><p className="font-semibold">Source</p><p>{lead.source}</p></div>
                <div className="flex items-center gap-2"><Mail className="w-5 h-5 text-slate-400" /><a href={`mailto:${lead.email}`} className="text-violet-600 hover:underline">{lead.email}</a></div>
                <div className="flex items-center gap-2"><Phone className="w-5 h-5 text-slate-400" /><a href={`tel:${lead.phone}`} className="text-violet-600 hover:underline">{lead.phone}</a></div>
            </div>
        </div>
    );
};

// CRM: Client Pages
const CRMClientsListPage: React.FC = () => {
    const { clients, loading } = useData();
    if (loading) return <LoadingSpinner />;
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">My Clients</h1>
            <div className="bg-white dark:bg-slate-800 shadow-lg rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-slate-700"><tr><th className="p-3 text-left">Name</th><th className="p-3 text-left">Policies</th><th className="p-3 text-left">Joined Date</th></tr></thead>
                    <tbody>
                        {clients.map(client => (
                            <tr key={client.id} className="border-b dark:border-slate-700">
                                <td className="p-3"><Link to={`/crm/clients/${client.id}`} className="font-semibold text-violet-600 dark:text-violet-400 hover:underline">{client.name}</Link></td>
                                <td className="p-3">{client.policies.length}</td>
                                <td className="p-3">{new Date(client.joinedDate).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const CRMClientDetailPage: React.FC = () => {
    const { clientId } = useParams<{ clientId: string }>();
    const { clients, loading } = useData();
    const client = useMemo(() => clients.find(c => c.id === clientId), [clients, clientId]);

    if (loading) return <LoadingSpinner />;
    if (!client) return <Navigate to="/crm/clients" replace />;

    return (
        <div>
            <Link to="/crm/clients" className="inline-flex items-center mb-6 text-sm font-semibold text-violet-600 hover:text-violet-800"><ChevronLeft className="w-4 h-4 mr-1" /> Back to Clients</Link>
            <h1 className="text-3xl font-bold mb-2">{client.name}</h1>
            <p className="text-slate-500 mb-6">Client since {new Date(client.joinedDate).toLocaleDateString()}</p>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-2"><Mail className="w-5 h-5 text-slate-400" /><a href={`mailto:${client.email}`} className="text-violet-600 hover:underline">{client.email}</a></div>
                <div className="flex items-center gap-2"><Phone className="w-5 h-5 text-slate-400" /><a href={`tel:${client.phone}`} className="text-violet-600 hover:underline">{client.phone}</a></div>
                <div className="md:col-span-2"><p className="font-semibold">Active Policies</p><p>{client.policies.join(', ')}</p></div>
            </div>
        </div>
    );
};


// CRM: Tasks Page (New Feature)
const CRMTasksPage: React.FC = () => {
    const { tasks, leads, clients, loading: dataLoading, refetchData } = useData();
    const { currentUser, loading: authLoading } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const agentTasks = useMemo(() => {
        if (!currentUser) return [];
        return tasks
            .filter(t => t.assignedToId === currentUser.uid)
            .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    }, [tasks, currentUser]);

    const { todoTasks, completedTasks } = useMemo(() => ({
        todoTasks: agentTasks.filter(t => !t.isCompleted),
        completedTasks: agentTasks.filter(t => t.isCompleted),
    }), [agentTasks]);

    const handleToggleComplete = async (task: Task) => {
        try {
            const response = await fetch(`/api/tasks/${task.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...task, isCompleted: !task.isCompleted }),
            });
            if (!response.ok) throw new Error('Failed to update task');
            await refetchData();
        } catch (error) {
            console.error("Error updating task status:", error);
        }
    };

    const handleDelete = async (taskId: string) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' });
                await refetchData();
            } catch (error) {
                console.error("Error deleting task:", error);
            }
        }
    };

    const handleEdit = (task: Task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setEditingTask(null);
        setIsModalOpen(true);
    };

    if (dataLoading || authLoading) return <LoadingSpinner />;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Tasks</h1>
                <button onClick={handleAddNew} className="flex items-center bg-violet-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-violet-700">
                    <Plus className="w-5 h-5 mr-2" /> Add Task
                </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
                    <TaskList title="To Do" tasks={todoTasks} onToggle={handleToggleComplete} onEdit={handleEdit} onDelete={handleDelete} />
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
                    <TaskList title="Completed" tasks={completedTasks} onToggle={handleToggleComplete} onEdit={handleEdit} onDelete={handleDelete} />
                </div>
            </div>

            {isModalOpen && (
                <TaskModal 
                    task={editingTask}
                    onClose={() => setIsModalOpen(false)}
                    onSave={refetchData}
                    leads={leads}
                    clients={clients}
                    currentUser={currentUser}
                />
            )}
        </div>
    );
};

// TaskList sub-component
const TaskList: React.FC<{ title: string; tasks: Task[]; onToggle: (task: Task) => void; onEdit: (task: Task) => void; onDelete: (taskId: string) => void; }> = ({ title, tasks, onToggle, onEdit, onDelete }) => {
    const isOverdue = (task: Task) => new Date(task.dueDate) < new Date() && !task.isCompleted;
    
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2 dark:border-slate-600">{title} ({tasks.length})</h2>
            {tasks.length > 0 ? (
                <ul className="space-y-3">
                    {tasks.map(task => (
                        <li key={task.id} className={`flex items-start gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50 shadow-sm border border-slate-200 dark:border-slate-700 transition-opacity ${task.isCompleted ? 'opacity-60' : ''}`}>
                            <input type="checkbox" checked={task.isCompleted} onChange={() => onToggle(task)} className="mt-1 h-5 w-5 rounded border-gray-300 dark:border-slate-600 text-violet-600 focus:ring-violet-500" />
                            <div className="flex-grow">
                                <p className={`font-medium ${task.isCompleted ? 'line-through' : ''}`}>{task.title}</p>
                                <div className="text-sm text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                                    <span className={`flex items-center gap-1.5 ${isOverdue(task) ? 'text-red-500 font-semibold' : ''}`}>
                                        {isOverdue(task) && <AlertTriangle className="w-4 h-4" />}
                                        Due: {new Date(task.dueDate).toLocaleString()}
                                    </span>
                                    {task.relatedTo && (
                                        <Link to={`/crm/${task.relatedTo.type.toLowerCase()}s/${task.relatedTo.id}`} className="text-violet-600 hover:underline">
                                            &#8594; {task.relatedTo.name}
                                        </Link>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => onEdit(task)} className="p-1 text-slate-500 hover:text-violet-600"><Edit className="w-4 h-4" /></button>
                                <button onClick={() => onDelete(task.id)} className="p-1 text-slate-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : <p className="text-slate-500 p-4 text-center">No tasks in this list.</p>}
        </div>
    );
};

// TaskModal sub-component
const TaskModal: React.FC<{ task: Task | null; onClose: () => void; onSave: () => void; leads: Lead[]; clients: Client[]; currentUser: User | null }> = ({ task, onClose, onSave, leads, clients, currentUser }) => {
    const [title, setTitle] = useState(task?.title || '');
    const [dueDate, setDueDate] = useState(task ? task.dueDate.slice(0, 16) : '');
    const [relatedTo, setRelatedTo] = useState(task?.relatedTo ? `${task.relatedTo.type}-${task.relatedTo.id}` : '');
    const [reminderOffset, setReminderOffset] = useState<string>(String(task?.reminderOffset ?? 'none'));
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !dueDate || !currentUser) {
            setError('Title and Due Date are required.');
            return;
        }

        let relatedToObj: Task['relatedTo'] | undefined = undefined;
        if (relatedTo !== '') {
            const [type, id] = relatedTo.split('-');
            const source = type === 'Lead' ? leads : clients;
            const item = source.find(i => i.id === id);
            if (item) {
                relatedToObj = { type: type as 'Lead' | 'Client', id: item.id, name: item.name };
            }
        }

        const taskData = {
            title,
            dueDate: new Date(dueDate).toISOString(),
            isCompleted: task?.isCompleted || false,
            assignedToId: currentUser.uid,
            reminderOffset: reminderOffset === 'none' ? null : Number(reminderOffset),
            relatedTo: relatedToObj,
        };

        const url = task ? `/api/tasks/${task.id}` : '/api/tasks';
        const method = task ? 'PUT' : 'POST';

        try {
            await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(taskData) });
            onSave();
            onClose();
        } catch (err) {
            setError('Failed to save task. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-lg p-6">
                <h2 className="text-2xl font-bold mb-4">{task ? 'Edit Task' : 'Add New Task'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Title</label>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Due Date & Time</label>
                        <input type="datetime-local" value={dueDate} onChange={e => setDueDate(e.target.value)} className="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Reminder</label>
                        <select value={reminderOffset} onChange={e => setReminderOffset(e.target.value)} className="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600">
                            <option value="none">No reminder</option>
                            <option value="15">15 minutes before</option>
                            <option value="60">1 hour before</option>
                            <option value="1440">1 day before</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Related To (Optional)</label>
                        <select value={relatedTo} onChange={e => setRelatedTo(e.target.value)} className="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600">
                            <option value="">None</option>
                            <optgroup label="Leads">
                                {leads.map(lead => <option key={`Lead-${lead.id}`} value={`Lead-${lead.id}`}>{lead.name}</option>)}
                            </optgroup>
                            <optgroup label="Clients">
                                {clients.map(client => <option key={`Client-${client.id}`} value={`Client-${client.id}`}>{client.name}</option>)}
                            </optgroup>
                        </select>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="py-2 px-4 rounded bg-slate-200 dark:bg-slate-600 hover:bg-slate-300">Cancel</button>
                        <button type="submit" className="py-2 px-4 rounded bg-violet-600 text-white hover:bg-violet-700">Save Task</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


// CRM: Commissions Page (The main feature)
const CRMCommissionsPage: React.FC = () => {
    const { commissions, loading: dataLoading } = useData();
    const { currentUser, loading: authLoading } = useAuth();

    const agentCommissions = useMemo(() => {
        if (!currentUser) return [];
        return commissions.filter(c => c.agentId === currentUser.uid).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [commissions, currentUser]);

    const totalCommission = useMemo(() => {
        return agentCommissions.reduce((acc, c) => acc + c.amount, 0);
    }, [agentCommissions]);

    if (dataLoading || authLoading) {
        return <div className="flex justify-center"><LoadingSpinner /></div>
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">My Commissions</h1>
            <div className="bg-white dark:bg-slate-800 shadow-lg rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-300">
                            <tr>
                                <th scope="col" className="px-6 py-3">Date</th>
                                <th scope="col" className="px-6 py-3">Policy ID</th>
                                <th scope="col" className="px-6 py-3">Client Name</th>
                                <th scope="col" className="px-6 py-3 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agentCommissions.map(c => (
                                <tr key={c.id} className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600">
                                    <td className="px-6 py-4">{new Date(c.date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{c.policyId}</td>
                                    <td className="px-6 py-4">{c.clientName}</td>
                                    <td className="px-6 py-4 text-right font-semibold text-green-600 dark:text-green-400">
                                        {c.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="font-semibold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-700">
                                <td colSpan={3} className="px-6 py-4 text-right text-base">Total Commissions</td>
                                <td className="px-6 py-4 text-right text-base text-green-700 dark:text-green-300">
                                    {totalCommission.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
             {agentCommissions.length === 0 && <p className="text-center p-8 text-slate-500">No commission records found.</p>}
        </div>
    );
}

// --- MAIN APP ---
const App: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <AnalyticsTracker />
        <Routes>
          {/* Public Website Routes */}
          <Route path="/*" element={<PublicSite />} />
          
          {/* CRM Routes */}
          <Route path="/crm/login" element={<LoginPage />} />
          <Route path="/crm" element={<ProtectedRoute />}>
             <Route element={<CRMLayout />}>
                <Route path="dashboard" element={<CRMDashboardPage />} />
                <Route path="leads" element={<CRMLeadsListPage />} />
                <Route path="leads/:leadId" element={<CRMLeadDetailPage />} />
                <Route path="clients" element={<CRMClientsListPage />} />
                <Route path="clients/:clientId" element={<CRMClientDetailPage />} />
                <Route path="tasks" element={<CRMTasksPage />} />
                <Route path="commissions" element={<CRMCommissionsPage />} />
                <Route index element={<Navigate to="dashboard" replace />} />
             </Route>
          </Route>

        </Routes>
      <CartToast />
    </>
  );
};

const PublicSite = () => (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900">
      <Header />
      <Breadcrumbs />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/advisors" element={<AdvisorsPage />} />
          <Route path="/advisors/:advisorId" element={<AdvisorProfilePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/join-our-team" element={<JoinOurTeamPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/admin" element={<AdminPage />} />
          
          <Route path="/services/life" element={<LifeInsurancePage />} />
          <Route path="/services/auto" element={<AutoInsurancePage />} />
          <Route path="/services/property" element={<PropertyInsurancePage />} />
          <Route path="/services/health" element={<HealthInsurancePage />} />
          <Route path="/services/group-benefits" element={<GroupBenefitsPage />} />
          <Route path="/services/real-estate" element={<RealEstatePage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
)

export default App;
