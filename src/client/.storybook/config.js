import { configure } from '@storybook/react';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles.css';

const req = require.context('../', true, /\.stories\.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
