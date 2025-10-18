import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider, DataProvider, ThemeProvider } from './contexts/DataContext';
import { HashRouter } from 'react-router-dom';
import { ProductProvider } from './contexts/ProductContext';
import { CartProvider } from './contexts/CartContext';
import ErrorBoundary from './components/ErrorBoundary';


const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HashRouter>
      <ErrorBoundary>
        <AuthProvider>
          <DataProvider>
            <ProductProvider>
              <CartProvider>
                <ThemeProvider>
                  <App />
                </ThemeProvider>
              </CartProvider>
            </ProductProvider>
          </DataProvider>
        </AuthProvider>
      </ErrorBoundary>
    </HashRouter>
  </React.StrictMode>
);