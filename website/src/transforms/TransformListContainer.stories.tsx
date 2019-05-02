import React from 'react';
import { storiesOf } from '@storybook/react';

import TransformListContainer from './TransformListContainer';
import TestPanel from '../test/TestPanel';
import { TestProvider } from '../test/TestProvider';
import { TransformScript } from './domain';
import { User } from '../users/domain';

const width = '300px';
const height = '100%';

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
  const scripts: TransformScript[] = [
    {
      userId: 'user',
      name: 'Test script 1',
      script: '// Test script 1',
    },
    {
      userId: 'user',
      name: 'Test script 2',
      script: '// Test script 2',
    },
    {
      userId: 'user',
      name: 'Test script 3',
      script: '// Test script 3',
    },
  ];

  const user = new User('username');
  user.id = 'user';

  const state = {
    transform: {
      scripts: scripts,
    },
    user: {
      loggedInUser: user,
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
  const scripts: TransformScript[] = [
    {
      userId: 'user2',
      name: 'Test script 1',
      script: '// Test script 1',
    },
    {
      userId: 'user3',
      name: 'Test script 2',
      script: '// Test script 2',
    },
    {
      userId: 'user4',
      name: 'Test script 3',
      script: '// Test script 3',
    },
  ];

  const user = new User('username');
  user.id = 'user';

  const state = {
    transform: {
      scripts: scripts,
    },
    user: {
      loggedInUser: user,
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
  const scripts: TransformScript[] = [
    {
      userId: 'user',
      name: 'Test script 1',
      script: '// Test script 1',
    },
    {
      userId: 'user',
      name: 'Test script 2',
      script: '// Test script 2',
    },
    {
      userId: 'user',
      name: 'Test script 3',
      script: '// Test script 3',
    },
    {
      userId: 'user2',
      name: 'Test script 4',
      script: '// Test script 4',
    },
    {
      userId: 'user3',
      name: 'Test script 5',
      script: '// Test script 5',
    },
    {
      userId: 'user4',
      name: 'Test script 6',
      script: '// Test script 6',
    },
  ];

  const user = new User('username');
  user.id = 'user';

  const state = {
    transform: {
      scripts: scripts,
    },
    user: {
      loggedInUser: user,
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
