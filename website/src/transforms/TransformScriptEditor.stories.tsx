import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import TestPanel from '../test/TestPanel';
import TransformScriptEditor from './TransformScriptEditor';
import { TransformService } from './domain';

const width = '600px';
const height = '100%';

storiesOf('TransformScriptPanel', module).add('with no text', () => {
  return (
    <TestPanel width={width} height={height}>
      <TransformScriptEditor
        id="transform-script-panel"
        script={TransformService.getBuiltInScripts()[0]}
        scriptText={''}
        allScripts={TransformService.getBuiltInScripts()}
        canRun={true}
        isRunning={false}
        onScriptChange={action('script changed')}
        onScriptTextChange={action('script text changed')}
        onTransformClick={action('transform clicked')}
      />
    </TestPanel>
  );
});

storiesOf('TransformScriptPanel', module).add('with script text', () => {
  return (
    <TestPanel width={width} height={height}>
      <TransformScriptEditor
        id="transform-script-panel"
        script={TransformService.getBuiltInScripts()[0]}
        scriptText={TransformService.getBuiltInScripts()[0].script}
        allScripts={TransformService.getBuiltInScripts()}
        canRun={true}
        isRunning={false}
        onScriptChange={action('script changed')}
        onScriptTextChange={action('script text changed')}
        onTransformClick={action('transform clicked')}
      />
    </TestPanel>
  );
});

storiesOf('TransformScriptPanel', module).add('running', () => {
  return (
    <TestPanel width={width} height={height}>
      <TransformScriptEditor
        id="transform-script-panel"
        script={TransformService.getBuiltInScripts()[0]}
        scriptText={TransformService.getBuiltInScripts()[0].script}
        allScripts={TransformService.getBuiltInScripts()}
        canRun={true}
        isRunning={true}
        onScriptChange={action('script changed')}
        onScriptTextChange={action('script text changed')}
        onTransformClick={action('transform clicked')}
      />
    </TestPanel>
  );
});
