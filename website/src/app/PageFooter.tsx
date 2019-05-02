import React from 'react';
import { Button } from 'react-bootstrap';

import DocsDialog from './DocsDialog';
import githubLogo from '../assets/GitHub-Mark-Light-32px.png';

export default ({ ...otherProps }: React.ComponentProps<'div'>) => {
  const [showDocsDialog, setShowDocsDialog] = React.useState(false);

  return (
    <div style={styles.root} {...otherProps}>
      <span>
        Built with&nbsp;
        <span role="img" aria-label="Heart emoji">
          ❤️
        </span>
        &nbsp;by Matt Bise&nbsp;&nbsp;
        <a href="https://github.com/mbise1993/reatransform" target="_blank" rel="noopener noreferrer">
          <img src={githubLogo} title="GitHub" alt="GitHub" width="20" height="20" />
        </a>
      </span>

      <Button variant="outline-light" size="sm" onClick={() => setShowDocsDialog(true)}>
        Read the Docs!
      </Button>
      <DocsDialog show={showDocsDialog} onClose={() => setShowDocsDialog(false)} />
    </div>
  );
};

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '12px',
  },
};
