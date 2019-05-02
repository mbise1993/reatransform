import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import TestPanel from '../test/TestPanel';
import PageHeader from './PageHeader';
import { tsImportEqualsDeclaration } from '@babel/types';

storiesOf('HeaderPanel', module).add('Run transform enabled', () => {
  return (
    <TestPanel width="100%" height="60px">
      <PageHeader
        id="header-panel"
        canRunTransform={true}
        isTransformRunning={false}
        onRunTransformClick={action('run transform clicked')}
        onShowTransformsClick={action('show transforms clicked')}
      />
    </TestPanel>
  );
});

storiesOf('HeaderPanel', module).add('Run transform disabled', () => {
  return (
    <TestPanel width="100%" height="60px">
      <PageHeader
        id="header-panel"
        canRunTransform={false}
        isTransformRunning={false}
        onRunTransformClick={action('run transform clicked')}
        onShowTransformsClick={action('show transforms clicked')}
      />
    </TestPanel>
  );
});

storiesOf('HeaderPanel', module).add('Transform running', () => {
  return (
    <TestPanel width="100%" height="60px">
      <PageHeader
        id="header-panel"
        canRunTransform={true}
        isTransformRunning={true}
        onRunTransformClick={action('run transform clicked')}
        onShowTransformsClick={action('show transforms clicked')}
      />
    </TestPanel>
  );
});
