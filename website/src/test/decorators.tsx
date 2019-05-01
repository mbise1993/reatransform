import React from 'react';

import ProviderWrapper from './ProviderWrapper';
import { configureStore } from '../app/state';

const store = configureStore();

export const withProvider = (createStory: () => any) => (
  <ProviderWrapper store={store}>{createStory()}</ProviderWrapper>
);
