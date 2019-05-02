import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import AuthDialogContainer from './AuthDialogContainer';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import TestPanel from '../test/TestPanel';
import { TestProvider } from '../test/TestProvider';

const width = '400px';
const height = '300px';

storiesOf('AuthDialog', module).add('Login form', () => (
  <TestPanel width={width} height={height}>
    <LoginForm onSubmit={action('login submit clicked')} onSignUpClick={action('sign up clicked')} />
  </TestPanel>
));

storiesOf('AuthDialog', module).add('Sign up form', () => (
  <TestPanel width={width} height={height}>
    <SignUpForm onBackClick={action('back clicked')} onSubmit={action('signup submit clicked')} />
  </TestPanel>
));

storiesOf('AuthDialog', module).add('Full dialog', () => {
  const state = {
    user: {
      isInProgress: false,
      error: undefined,
    },
  };

  return (
    <TestProvider state={state}>
      <AuthDialogContainer show={true} onClose={() => {}} />
    </TestProvider>
  );
});

storiesOf('AuthDialog', module).add('Dialog loading', () => {
  const state = {
    user: {
      isInProgress: true,
      error: undefined,
    },
  };

  return (
    <TestProvider state={state}>
      <AuthDialogContainer show={true} onClose={() => {}} />
    </TestProvider>
  );
});

storiesOf('AuthDialog', module).add('Dialog with error', () => {
  const state = {
    user: {
      isInProgress: false,
      error: new Error('Invalid username or password'),
    },
  };

  return (
    <TestProvider state={state}>
      <AuthDialogContainer show={true} onClose={() => {}} />
    </TestProvider>
  );
});
