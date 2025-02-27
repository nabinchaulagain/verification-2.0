import { BrowserRouter as Router } from 'react-router';

import '@/app/App.css';
import Routes from '@/router/routes';

const App = () => {
  return (
    <Router>
      <Routes />
    </Router>
  );
};

export default App;
