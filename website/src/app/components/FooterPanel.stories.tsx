import React from 'react';
import { storiesOf } from '@storybook/react';

import TestPanel from '../../test/TestPanel';
import FooterPanel from './FooterPanel';

storiesOf('FooterPanel', module).add('show footer', () => {
  return (
    <TestPanel width="100%" height="auto">
      <FooterPanel id="footer-panel" />
    </TestPanel>
  );
});
