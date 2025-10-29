import React, { ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  // FIX: The original state initialization using a class property was replaced with a constructor. This resolves the "Property 'props' does not exist on type 'ErrorBoundary'" error by ensuring `this.props` is correctly set up via `super(props)`, which is a more widely supported syntax than class fields.
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center bg-brand-light p-8">
            <div className="max-w-md">
                <svg className="w-24 h-24 mx-auto text-red-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h1 className="text-4xl font-bold text-brand-blue mb-4">Oops! A Glitch Occurred.</h1>
                <p className="text-lg text-gray-700 mb-8">
                    We've encountered a temporary technical issue. Please don't worry, our team has been notified. You can try refreshing the page or return to our homepage.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full sm:w-auto bg-brand-gold text-brand-blue font-bold py-3 px-8 rounded-full hover:bg-yellow-400 transition-all duration-300 text-lg"
                    >
                        Refresh Page
                    </button>
                    <Link
                        to="/"
                        className="w-full sm:w-auto bg-transparent border-2 border-brand-blue text-brand-blue font-bold py-3 px-8 rounded-full hover:bg-brand-blue hover:text-white transition-all duration-300 text-lg"
                    >
                        Go to Homepage
                    </Link>
                </div>
            </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;