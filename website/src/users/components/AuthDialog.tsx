import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Modal, Spinner } from 'react-bootstrap';

import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { login, signUp } from '../actions';
import { UserState } from '../reducers';

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
  title: {
    fontSize: '28px',
    fontWeight: 200,
  },
};

type AuthDialogProps = {
  show: boolean;
  isInProgress: boolean;
  error: Error | null;
  onClose: () => void;
  onLogin: (username: string, password: string) => void;
  onSignUp: (username: string, password: string) => void;
} & React.ComponentProps<'div'>;

const AuthDialog = ({ show, isInProgress, error, onClose, onLogin, onSignUp }: AuthDialogProps) => {
  const [isOnLoginScreen, setOnLoginScreen] = React.useState(true);

  const renderLoginForm = () => {
    return (
      <>
        <Modal.Header>
          <Modal.Title style={styles.title}>
            Login&nbsp;
            <span role="img" aria-label="Heart emoji">
              🚀
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm onSubmit={onLogin} onSignUpClick={() => setOnLoginScreen(false)} />
        </Modal.Body>
      </>
    );
  };

  const renderSignUpForm = () => {
    return (
      <>
        <Modal.Header>
          <Modal.Title style={styles.title}>Sign up to manage your scripts!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignUpForm onBackClick={() => setOnLoginScreen(true)} onSubmit={onSignUp} />
        </Modal.Body>
      </>
    );
  };

  const renderContent = () => {
    if (isInProgress) {
      return (
        <Modal.Body style={styles.runningPanel}>
          <Spinner animation="border" />
          <div style={styles.runningText}>{isOnLoginScreen ? 'Logging in...' : 'Signing up...'}</div>
        </Modal.Body>
      );
    }

    return isOnLoginScreen ? renderLoginForm() : renderSignUpForm();
  };

  return (
    <Modal show={show} onExited={() => setOnLoginScreen(true)} onHide={onClose}>
      {renderContent()}
    </Modal>
  );
};

const mapStateToProps = (state: UserState) => {
  return {
    isInProgress: state.isInProgress,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onLogin: bindActionCreators(login, dispatch),
    onSignUp: bindActionCreators(signUp, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthDialog);
