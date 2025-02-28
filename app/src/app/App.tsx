import { BrowserRouter as Router } from 'react-router';

import '@/app/App.css';
import Routes from '@/router/routes';
import { ToastContainer } from 'react-toastify';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import QueryClientProvider from '@/providers/QueryClientProvider';
import ErrorFallback from '@/components/ErrorFallback/ErrorFallback';
import { useCallback } from 'react';

const App = () => {
  const renderFallback = useCallback(
    ({ error, resetErrorBoundary }: FallbackProps) => (
      <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
    ),
    []
  );

  return (
    <ErrorBoundary fallbackRender={renderFallback}>
      <Router>
        <QueryClientProvider>
          <Routes />
        </QueryClientProvider>
      </Router>
      <ToastContainer draggable />
    </ErrorBoundary>
  );
};

export default App;
