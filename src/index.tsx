import * as React from 'react';
import { render } from 'react-dom';

import ReaProjectApp from './components/ReaProjectApp';
import { importProjects } from './services/importProjects';

const rootElement = document.getElementById('app');
render(<ReaProjectApp importProjects={importProjects} />, rootElement);
