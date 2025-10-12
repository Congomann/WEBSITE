import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  // FIX: Replaced class property state initialization with a standard constructor.
  // The class property syntax was causing a TypeScript error where `this.props`
  // was not recognized. Using a constructor is a more robust way to ensure
  // both props and state are correctly initialized and typed.
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
        <div className="flex flex-col items-center justify-center h-screen text-center bg-brand-light p-8">
            <h1 className="text-4xl font-bold text-brand-blue mb-4">Oops! Something went wrong.</h1>
            <p className="text-lg text-gray-700 mb-6">
                We're sorry for the inconvenience. Please try refreshing the page.
            </p>
            <button
                onClick={() => window.location.reload()}
                className="bg-brand-gold text-brand-blue font-bold py-3 px-8 rounded-full hover:bg-yellow-400 transition-all duration-300 text-lg"
            >
                Refresh Page
            </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
