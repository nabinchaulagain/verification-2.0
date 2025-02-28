import { PropsWithChildren } from 'react';

import {
  QueryClient,
  QueryClientProvider as QueryProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

const QueryClientProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <QueryProvider client={queryClient}>{children}</QueryProvider>;
};

export default QueryClientProvider;
