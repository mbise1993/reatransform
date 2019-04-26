import React from 'react';
import { Button } from 'react-bootstrap';

import { AuthDialog } from '../auth/components';
import DocsDialog from './DocsDialog';

export default ({ ...otherProps }: React.ComponentProps<'div'>) => {
  const [showAuthDialog, setShowAuthDialog] = React.useState(false);
  const [showDocsDialog, setShowDocsDialog] = React.useState(false);

  return (
    <div style={styles.root} {...otherProps}>
      <span style={styles.inline}>ReaTransform 🎚</span>
      <span style={styles.inline}>
        <Button variant="outline-light" size="sm" onClick={() => setShowAuthDialog(true)}>
          Login or Sign Up
        </Button>

        <Button style={styles.marginLeft} variant="outline-light" size="sm" onClick={() => setShowDocsDialog(true)}>
          Read the Docs!
        </Button>
      </span>

      <AuthDialog show={showAuthDialog} onClose={() => setShowAuthDialog(false)} />
      <DocsDialog show={showDocsDialog} onClose={() => setShowDocsDialog(false)} />
    </div>
  );
};

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '26px',
    fontWeight: 200,
    letterSpacing: '2px',
  },
  inline: {
    display: 'flex',
  },
  marginLeft: {
    marginLeft: '10px',
  },
};
