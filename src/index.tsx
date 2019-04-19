import * as React from 'react';
import { render } from 'react-dom';

import ReaProjectApp from './components/ReaProjectApp';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const rootElement = document.getElementById('app');
render(<ReaProjectApp />, rootElement);
