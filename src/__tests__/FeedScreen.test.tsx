import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import FeedScreen from '../screens/FeedScreen';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <NavigationContainer>
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  </NavigationContainer>
);

afterEach(() => {
  queryClient.clear();
});

describe('FeedScreen', () => {
  it('muestra el indicador de carga inicialmente', () => {
    render(<FeedScreen />, { wrapper });
    expect(screen.getByTestId('loading')).toBeTruthy();
  });
});
