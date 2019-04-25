import React from 'react';
import { storiesOf } from '@storybook/react';

import AuthDialog from './AuthDialog';

storiesOf('AuthDialog', module).add('simple login dialog', () => <AuthDialog show={true} onClose={() => {}} />);
