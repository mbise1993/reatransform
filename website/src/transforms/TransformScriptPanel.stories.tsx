import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import TestPanel from '../test/TestPanel';
import TransformScriptPanel from './TransformScriptPanel';
import { allScripts } from './domain/transformScript';
import AsyncLoader from '../test/AsyncLoader';

const width = '600px';
const height = '100%';

storiesOf('TransformScriptPanel', module).add('with no text', () => {
  return (
    <TestPanel width={width} height={height}>
      <TransformScriptPanel
        id="transform-script-panel"
        script={allScripts[0]}
        scriptText={''}
        allScripts={allScripts}
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
      <TransformScriptPanel
        id="transform-script-panel"
        script={allScripts[0]}
        scriptText={allScripts[0].script}
        allScripts={allScripts}
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
      <TransformScriptPanel
        id="transform-script-panel"
        script={allScripts[0]}
        scriptText={allScripts[0].script}
        allScripts={allScripts}
        canRun={true}
        isRunning={true}
        onScriptChange={action('script changed')}
        onScriptTextChange={action('script text changed')}
        onTransformClick={action('transform clicked')}
      />
    </TestPanel>
  );
});
