import VerifyPage from '@/pages/verify';
import { Route, Routes as RouterRoutes } from 'react-router';

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<VerifyPage />} />
    </RouterRoutes>
  );
};

export default Routes;
