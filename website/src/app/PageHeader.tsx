import React from 'react';
import { Button, ButtonGroup, Spinner } from 'react-bootstrap';

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
    marginLeft: '12px',
  },
};

type PageHeaderProps = {
  canRunTransform: boolean;
  isTransformRunning: boolean;
  onRunTransformClick: () => void;
  onShowTransformsClick: () => void;
} & React.ComponentProps<'div'>;

export default ({
  canRunTransform,
  isTransformRunning,
  onRunTransformClick,
  onShowTransformsClick,
  ...otherProps
}: PageHeaderProps) => {
  const [showAuthDialog, setShowAuthDialog] = React.useState(false);

  return (
    <div style={styles.root} {...otherProps}>
      <span style={styles.inline}>ReaTransform 🎚</span>
      <span style={styles.inline}>
        <Button variant="outline-light" size="sm" onClick={() => setShowAuthDialog(true)}>
          Login or Sign Up
        </Button>

        <ButtonGroup style={styles.marginLeft}>
          <Button variant="outline-light" size="sm" onClick={onShowTransformsClick}>
            Show/Hide Scripts
          </Button>
          <Button size="sm" variant="outline-light" disabled={!canRunTransform} onClick={onRunTransformClick}>
            {isTransformRunning ? <Spinner animation="border" size="sm" /> : 'Run Script'}
          </Button>
        </ButtonGroup>
      </span>

      <AuthDialogContainer show={showAuthDialog} onClose={() => setShowAuthDialog(false)} />
    </div>
  );
};
