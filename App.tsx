
import React, { Suspense, lazy } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

// Layout Components
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy-loaded Pages
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AdvisorsPage = lazy(() => import('./pages/AdvisorsPage'));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Lazy-loaded Service Pages
const LifeInsurancePage = lazy(() => import('./pages/services/LifeInsurancePage'));
const AutoInsurancePage = lazy(() => import('./pages/services/AutoInsurancePage'));
const PropertyInsurancePage = lazy(() => import('./pages/services/PropertyInsurancePage'));
const HealthInsurancePage = lazy(() => import('./pages/services/HealthInsurancePage'));
const GroupBenefitsPage = lazy(() => import('./pages/services/GroupBenefitsPage'));

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-brand-light text-gray-800">
        <Header />
        <main className="flex-grow">
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/advisors" element={<AdvisorsPage />} />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/services/life" element={<LifeInsurancePage />} />
                <Route path="/services/auto" element={<AutoInsurancePage />} />
                <Route path="/services/property" element={<PropertyInsurancePage />} />
                <Route path="/services/health" element={<HealthInsurancePage />} />
                <Route path="/services/group-benefits" element={<GroupBenefitsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
