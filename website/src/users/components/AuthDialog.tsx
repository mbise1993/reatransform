import React from 'react';
import { Modal, Spinner } from 'react-bootstrap';

import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

type AuthDialogProps = {
  show: boolean;
  onClose: () => void;
} & React.ComponentProps<'div'>;

export default ({ show, onClose }: AuthDialogProps) => {
  const [isOnLoginScreen, setOnLoginScreen] = React.useState(true);
  const [isRunning, setRunning] = React.useState(false);

  const handleLogin = (username: string, password: string) => {
    setRunning(true);
  };

  const handleSignUp = (username: string, password: string) => {
    setRunning(true);
  };

  const renderBody = () => {
    if (isRunning) {
      return (
        <div style={styles.runningPanel}>
          <Spinner animation="border" />
          <div style={styles.runningText}>{isOnLoginScreen ? 'Logging in...' : 'Signing up...'}</div>
        </div>
      );
    }

    if (isOnLoginScreen) {
      return <LoginForm onSignUpClick={() => setOnLoginScreen(false)} />;
    }

    return <SignUpForm onSubmit={handleSignUp} />;
  };

  return (
    <Modal show={show} onExited={() => setOnLoginScreen(true)} onHide={onClose}>
      <Modal.Body>{renderBody()}</Modal.Body>
    </Modal>
  );
};

const styles = {
  runningPanel: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
  } as React.CSSProperties,
  runningText: {
    marginTop: '20px',
  },
};
