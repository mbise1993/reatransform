import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Modal, Spinner } from 'react-bootstrap';

import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { login, signUp } from './state/userActions';
import { UserState } from './state/userReducer';

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

type StateProps = {
  isInProgress: boolean;
  error: Error | undefined;
};

type DispatchProps = {
  onLogin: (username: string, password: string) => void;
  onSignUp: (username: string, password: string) => void;
};

type AuthDialogContainerProps = {
  show: boolean;
  onClose: () => void;
} & StateProps &
  DispatchProps &
  React.ComponentProps<'div'>;

const AuthDialog = ({ show, isInProgress, error, onClose, onLogin, onSignUp }: AuthDialogContainerProps) => {
  const [isOnLoginScreen, setOnLoginScreen] = React.useState(true);

  const handleLoginSubmit = (username: string, password: string) => {
    onLogin(username, password);
    onClose();
  };

  const handleSignUpSubmit = (username: string, password: string) => {
    onSignUp(username, password);
    onClose();
  };

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
          <LoginForm onSubmit={handleLoginSubmit} onSignUpClick={() => setOnLoginScreen(false)} />
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
          <SignUpForm onBackClick={() => setOnLoginScreen(true)} onSubmit={handleSignUpSubmit} />
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

const mapStateToProps = (state: UserState): StateProps => {
  return {
    isInProgress: state.isInProgress,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onLogin: bindActionCreators(login, dispatch),
    onSignUp: bindActionCreators(signUp, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthDialog);
