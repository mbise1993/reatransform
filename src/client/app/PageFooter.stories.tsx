import React from 'react';
import { storiesOf } from '@storybook/react';

import TestPanel from '../test/TestPanel';
import PageFooter from './PageFooter';

storiesOf('FooterPanel', module).add('show footer', () => {
  return (
    <TestPanel width="100%" height="auto">
      <PageFooter id="footer-panel" />
    </TestPanel>
  );
});
