import React from 'react';
import { storiesOf } from '@storybook/react';
import _ from 'lodash';

import TransformListContainer from './TransformListContainer';
import TestPanel from '../test/TestPanel';
import { TestProvider } from '../test/TestProvider';
import { TransformScript } from './domain';
import { User } from '../users/domain';

const width = '300px';
const height = '100%';

const createTestScripts = (start: number, end: number, userId?: string): TransformScript[] => {
  return _.range(start, end).map(n => {
    return {
      id: n.toString(),
      userId: userId || `user${n}`,
      name: `Test script ${n}`,
      script: `// Test script ${n}`,
    };
  });
};

storiesOf('TransformListContainer', module).add('No scripts', () => {
  return (
    <TestPanel width={width} height={height}>
      <TestProvider state={{}}>
        <TransformListContainer />
      </TestProvider>
    </TestPanel>
  );
});

storiesOf('TransformListContainer', module).add('Only user scripts', () => {
  const scripts = createTestScripts(1, 4, 'user');

  const state = {
    transform: {
      scripts: scripts,
      selectedScript: scripts[0],
    },
    user: {
      loggedInUser: {
        id: 'user',
        username: 'username',
      },
    },
  };

  return (
    <TestPanel width={width} height={height}>
      <TestProvider state={state}>
        <TransformListContainer />
      </TestProvider>
    </TestPanel>
  );
});

storiesOf('TransformListContainer', module).add('Only public scripts', () => {
  const scripts = createTestScripts(1, 4);

  const state = {
    transform: {
      scripts: scripts,
      selectedScript: scripts[0],
    },
    user: {
      loggedInUser: {
        id: 'user',
        username: 'username',
      },
    },
  };

  return (
    <TestPanel width={width} height={height}>
      <TestProvider state={state}>
        <TransformListContainer />
      </TestProvider>
    </TestPanel>
  );
});

storiesOf('TransformListContainer', module).add('User scripts and public scripts', () => {
  const scripts = [...createTestScripts(1, 4, 'user'), ...createTestScripts(4, 8)];

  const state = {
    transform: {
      scripts: scripts,
      selectedScript: scripts[0],
    },
    user: {
      loggedInUser: {
        id: 'user',
        username: 'username',
      },
    },
  };

  return (
    <TestPanel width={width} height={height}>
      <TestProvider state={state}>
        <TransformListContainer />
      </TestProvider>
    </TestPanel>
  );
});
