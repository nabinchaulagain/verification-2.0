import { BrowserRouter as Router } from 'react-router';

import '@/app/App.css';
import Routes from '@/router/routes';
import { ToastContainer } from 'react-toastify';
import QueryClientProvider from '@/providers/QueryClientProvider';

const App = () => {
  return (
    <>
      <Router>
        <QueryClientProvider>
          <Routes />
        </QueryClientProvider>
      </Router>
      <ToastContainer draggable />
    </>
  );
};

export default App;
