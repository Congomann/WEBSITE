import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  // FIX: Using a constructor to initialize state. This ensures `this.props` is correctly
  // handled by the component's lifecycle, resolving potential type errors where
  // `this.props` might not be found.
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
