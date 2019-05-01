import React from 'react';
import { storiesOf } from '@storybook/react';

import TestPanel from '../test/TestPanel';
import PageHeader from './PageHeader';

storiesOf('HeaderPanel', module).add('show header', () => {
  return (
    <TestPanel width="100%" height="60px">
      <PageHeader id="header-panel" />
    </TestPanel>
  );
});
