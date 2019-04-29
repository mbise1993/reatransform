import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { withProvider } from '../../test/decorators';
import TestPanel from '../../test/TestPanel';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import AuthDialog from './AuthDialog';

const width = '400px';
const height = '300px';

storiesOf('AuthDialog', module)
  .addDecorator(withProvider)
  .add('login form', () => (
    <TestPanel width={width} height={height}>
      <LoginForm onSignUpClick={action('sign up clicked')} />
    </TestPanel>
  ));

storiesOf('AuthDialog', module)
  .addDecorator(withProvider)
  .add('sign up form', () => (
    <TestPanel width={width} height={height}>
      <SignUpForm onSubmit={action('submit clicked')} />
    </TestPanel>
  ));

storiesOf('AuthDialog', module)
  .addDecorator(withProvider)
  .add('full dialog', () => <AuthDialog show={true} onClose={() => {}} />);
