import { BrowserRouter as Router } from 'react-router';

import '@/app/App.css';
import Routes from '@/router/routes';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
      <Router>
        <Routes />
      </Router>
      <ToastContainer draggable autoClose={500}/>
    </>
  );
};

export default App;
