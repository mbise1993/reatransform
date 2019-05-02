import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import TestPanel from '../test/TestPanel';
import TransformScriptEditor from './TransformScriptEditor';
import { TransformService } from './domain';

const width = '600px';
const height = '100%';

storiesOf('TransformScriptPanel', module).add('With no text', () => {
  return (
    <TestPanel width={width} height={height}>
      <TransformScriptEditor
        id="transform-script-panel"
        script={TransformService.getBuiltInScripts()[0]}
        scriptText={''}
        allScripts={TransformService.getBuiltInScripts()}
        onScriptChange={action('script changed')}
        onScriptTextChange={action('script text changed')}
      />
    </TestPanel>
  );
});

storiesOf('TransformScriptPanel', module).add('With script text', () => {
  return (
    <TestPanel width={width} height={height}>
      <TransformScriptEditor
        id="transform-script-panel"
        script={TransformService.getBuiltInScripts()[0]}
        scriptText={TransformService.getBuiltInScripts()[0].script}
        allScripts={TransformService.getBuiltInScripts()}
        onScriptChange={action('script changed')}
        onScriptTextChange={action('script text changed')}
      />
    </TestPanel>
  );
});
