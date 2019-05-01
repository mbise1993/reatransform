import React from 'react';
import { storiesOf } from '@storybook/react';

import TestPanel from '../test/TestPanel';
import HeaderPanel from './HeaderPanel';

storiesOf('HeaderPanel', module).add('show header', () => {
  return (
    <TestPanel width="100%" height="60px">
      <HeaderPanel id="header-panel" />
    </TestPanel>
  );
});
