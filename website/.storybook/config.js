import { configure, addDecorator } from '@storybook/react';

import { withProvider } from '../src/test/decorators';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../src/index.css';

addDecorator(withProvider);

const req = require.context('../src', true, /\.stories\.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
