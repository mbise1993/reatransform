import React from 'react';
import { Provider } from 'react-redux';

type ProviderWrapperProps = {
  store: any;
  children: React.ReactChildren;
};

export default ({ store, children }: ProviderWrapperProps) => <Provider store={store}>{children}</Provider>;
