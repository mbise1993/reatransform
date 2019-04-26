import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import DocsDialog from './DocsDialog';

storiesOf('DocsDialog', module).add('show docs dialog', () => (
  <DocsDialog show={true} onClose={action('dialog closed')} />
));
