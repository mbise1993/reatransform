import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import TestPanel from '../../test/TestPanel';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import AuthDialog from './AuthDialog';

const width = '400px';
const height = '300px';

storiesOf('AuthDialog', module).add('login form', () => (
  <TestPanel width={width} height={height}>
    <LoginForm onSubmit={action('login submit clicked')} onSignUpClick={action('sign up clicked')} />
  </TestPanel>
));

storiesOf('AuthDialog', module).add('sign up form', () => (
  <TestPanel width={width} height={height}>
    <SignUpForm onBackClick={action('back clicked')} onSubmit={action('signup submit clicked')} />
  </TestPanel>
));

storiesOf('AuthDialog', module).add('full dialog', () => <AuthDialog show={true} onClose={() => {}} />);
