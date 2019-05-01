import React from 'react';
import { Button } from 'react-bootstrap';

import AuthDialogContainer from '../users/AuthDialogContainer';

const styles: any = {
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

type PageHeaderProps = {
  onShowTransformListClick: () => void;
} & React.ComponentProps<'div'>;

export default ({ onShowTransformListClick, ...otherProps }: PageHeaderProps) => {
  const [showAuthDialog, setShowAuthDialog] = React.useState(false);

  return (
    <div style={styles.root} {...otherProps}>
      <span style={styles.inline}>ReaTransform 🎚</span>
      <span style={styles.inline}>
        <Button variant="outline-light" size="sm" onClick={() => setShowAuthDialog(true)}>
          Login or Sign Up
        </Button>

        <Button style={styles.marginLeft} variant="outline-light" size="sm" onClick={onShowTransformListClick}>
          {'<< Transforms'}
        </Button>
      </span>

      <AuthDialogContainer show={showAuthDialog} onClose={() => setShowAuthDialog(false)} />
    </div>
  );
};
