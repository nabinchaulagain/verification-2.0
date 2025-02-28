import VerificationSuccessPage from '@/pages/success';
import VerifyPage from '@/pages/verify';
import { pageRoutes } from '@/router/constants';
import { Route, Routes as RouterRoutes } from 'react-router';

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path={pageRoutes.VERIFY} element={<VerifyPage />} />
      <Route
        path={pageRoutes.VERIFICATION_SUCCESS}
        element={<VerificationSuccessPage />}
      />
    </RouterRoutes>
  );
};

export default Routes;
