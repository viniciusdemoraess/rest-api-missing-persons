import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  withRouter?: boolean; // opcional, default true
}

const AllTheProviders = ({ children, withRouter = true }: { children: React.ReactNode; withRouter?: boolean }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const content = <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

  return withRouter ? <BrowserRouter>{content}</BrowserRouter> : content;
};

const customRender = (
  ui: ReactElement,
  options?: CustomRenderOptions
) => {
  const { withRouter = true, ...rest } = options || {};
  return render(ui, { wrapper: ({ children }) => <AllTheProviders withRouter={withRouter}>{children}</AllTheProviders>, ...rest });
};

export * from '@testing-library/react';
export { customRender as render };
