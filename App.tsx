
import React, { Suspense, lazy } from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';

// Layout Components
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import CartToast from './components/CartToast';
import AnalyticsTracker from './components/AnalyticsTracker';
import Breadcrumbs from './components/Breadcrumbs';
import ProtectedRoute from './components/ProtectedRoute';

// Context Providers
import { CartProvider } from './contexts/CartContext';
import { ProductProvider } from './contexts/ProductContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AdvisorProvider } from './contexts/AdvisorContext';
import { ContentProvider } from './contexts/ContentContext';
import { CrmProvider } from './contexts/CrmContext';

// Types
import { Role } from './types';

// Lazy-loaded Pages
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AdvisorsPage = lazy(() => import('./pages/AdvisorsPage'));
const AdvisorProfilePage = lazy(() => import('./pages/AdvisorProfilePage'));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const OrderSuccessPage = lazy(() => import('./pages/OrderSuccessPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const ManagementDashboardPage = lazy(() => import('./pages/ManagementDashboardPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const JoinOurTeamPage = lazy(() => import('./pages/JoinOurTeamPage'));
const LiveAssistantPage = lazy(() => import('./pages/LiveAssistantPage'));

// Lazy-loaded Service Pages
const LifeInsurancePage = lazy(() => import('./pages/services/LifeInsurancePage'));
const AutoInsurancePage = lazy(() => import('./pages/services/AutoInsurancePage'));
const PropertyInsurancePage = lazy(() => import('./pages/services/PropertyInsurancePage'));
const RealEstatePage = lazy(() => import('./pages/services/RealEstatePage'));
const HealthInsurancePage = lazy(() => import('./pages/services/HealthInsurancePage'));
const GroupBenefitsPage = lazy(() => import('./pages/services/GroupBenefitsPage'));

// Lazy-loaded CRM Pages
const CrmLayout = lazy(() => import('./pages/crm/CrmLayout'));
const CrmDashboardPage = lazy(() => import('./pages/crm/CrmDashboardPage'));
const LeadsPage = lazy(() => import('./pages/crm/LeadsPage'));
const ClientsPage = lazy(() => import('./pages/crm/ClientsPage'));
const UserManagementPage = lazy(() => import('./pages/crm/UserManagementPage'));
const LeaderboardPage = lazy(() => import('./pages/crm/LeaderboardPage'));
const UnderwritingPage = lazy(() => import('./pages/crm/UnderwritingPage'));
const MessagingPage = lazy(() => import('./pages/crm/MessagingPage'));
const LeadDistributionPage = lazy(() => import('./pages/crm/LeadDistributionPage'));
const MyProfilePage = lazy(() => import('./pages/crm/MyProfilePage'));
const CommissionsPage = lazy(() => import('./pages/crm/CommissionsPage'));
const AgentApplicationsPage = lazy(() => import('./pages/crm/AgentApplicationsPage'));
const ClientRequestsPage = lazy(() => import('./pages/crm/ClientRequestsPage'));


const CrmApp: React.FC = () => {
    const crmRoles = [Role.Admin, Role.Manager, Role.SubAdmin, Role.Underwriter, Role.Advisor];
    return (
        <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                    <Route
                        element={
                            <ProtectedRoute allowedRoles={crmRoles}>
                                <CrmLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route path="/crm" element={<CrmDashboardPage />} />
                        <Route path="/crm/leads" element={<LeadsPage />} />
                        <Route path="/crm/clients" element={<ClientsPage />} />
                        <Route path="/crm/leaderboard" element={<LeaderboardPage />} />
                        <Route path="/crm/commissions" element={<CommissionsPage />} />
                        <Route path="/crm/users" element={<UserManagementPage />} />
                        <Route path="/crm/underwriting" element={<UnderwritingPage />} />
                        <Route path="/crm/messaging" element={<MessagingPage />} />
                        <Route
                            path="/crm/my-profile"
                            element={
                            <ProtectedRoute allowedRoles={[Role.Advisor]}>
                                <MyProfilePage />
                            </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/crm/requests"
                            element={
                            <ProtectedRoute allowedRoles={[Role.Advisor]}>
                                <ClientRequestsPage />
                            </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/crm/applications"
                            element={
                            <ProtectedRoute allowedRoles={[Role.Admin, Role.Manager]}>
                                <AgentApplicationsPage />
                            </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/crm/lead-distribution"
                            element={
                            <ProtectedRoute allowedRoles={[Role.SubAdmin]}>
                                <LeadDistributionPage />
                            </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/crm/content-management"
                            element={
                            <ProtectedRoute allowedRoles={[Role.Admin]}>
                                <ManagementDashboardPage />
                            </ProtectedRoute>
                            }
                        />
                    </Route>
                    {/* Redirect from root and other paths to /crm if logged in as CRM user */}
                    <Route path="*" element={<Navigate to="/crm" replace />} />
                </Routes>
            </Suspense>
        </ErrorBoundary>
    );
};

const PublicApp: React.FC = () => {
    return (
        <>
            <ScrollToTop />
            <AnalyticsTracker />
            <div className="flex flex-col min-h-screen bg-brand-light text-gray-800">
                <Header />
                <CartToast />
                <main className="flex-grow pt-24">
                    <Breadcrumbs />
                    <ErrorBoundary>
                        <Suspense fallback={<LoadingSpinner />}>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/about" element={<AboutPage />} />
                                <Route path="/advisors" element={<AdvisorsPage />} />
                                <Route path="/advisors/:advisorSlug" element={<AdvisorProfilePage />} />
                                <Route path="/resources" element={<ResourcesPage />} />
                                <Route path="/products" element={<ProductsPage />} />
                                <Route path="/cart" element={<CartPage />} />
                                <Route path="/checkout" element={<CheckoutPage />} />
                                <Route path="/order-success" element={<OrderSuccessPage />} />
                                <Route path="/contact" element={<ContactPage />} />
                                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/join-our-team" element={<JoinOurTeamPage />} />
                                <Route path="/ai-assistant" element={<LiveAssistantPage />} />

                                {/* Service Pages */}
                                <Route path="/services/life" element={<LifeInsurancePage />} />
                                <Route path="/services/auto" element={<AutoInsurancePage />} />
                                <Route path="/services/property" element={<PropertyInsurancePage />} />
                                <Route path="/services/real-estate" element={<RealEstatePage />} />
                                <Route path="/services/health" element={<HealthInsurancePage />} />
                                <Route path="/services/group-benefits" element={<GroupBenefitsPage />} />

                                {/* If a logged-out user tries to access /crm, send them to login */}
                                <Route path="/crm/*" element={<Navigate to="/login" replace />} />
                                <Route path="*" element={<NotFoundPage />} />
                            </Routes>
                        </Suspense>
                    </ErrorBoundary>
                </main>
                <Footer />
            </div>
        </>
    );
};

const AppContent: React.FC = () => {
    const { isAuthenticated, canAccessCrm } = useAuth();
    return isAuthenticated && canAccessCrm ? <CrmApp /> : <PublicApp />;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AuthProvider>
        <ContentProvider>
          <AdvisorProvider>
            <ProductProvider>
              <CartProvider>
                <CrmProvider>
                  <AppContent />
                </CrmProvider>
              </CartProvider>
            </ProductProvider>
          </AdvisorProvider>
        </ContentProvider>
      </AuthProvider>
    </HashRouter>
  );
};

export default App;
