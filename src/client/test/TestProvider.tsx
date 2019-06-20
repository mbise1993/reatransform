import React from 'react';
import { Provider } from 'react-redux';
import { DeepPartial } from 'utility-types';

import { configureStore, AppState } from '../app/state';

type TestProviderProps = {
  state: DeepPartial<AppState>;
  children: React.ReactElement;
};

export const TestProvider = ({ state, children }: TestProviderProps) => {
  const store = configureStore(state);
  return <Provider store={store}>{children}</Provider>;
};

type AsyncTestProviderProps = {
  children: React.ReactElement;
  loadState: () => Promise<DeepPartial<AppState>>;
};

export const AsyncTestProvider = ({ children, loadState }: AsyncTestProviderProps) => {
  const [store, setStore] = React.useState(configureStore());

  React.useEffect(() => {
    loadState().then(result => setStore(configureStore(result)));
  }, [loadState]);

  return <Provider store={store}>{children}</Provider>;
};
