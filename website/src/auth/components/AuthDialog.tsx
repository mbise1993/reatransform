import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import AuthForm from './AuthForm';

type AuthDialogProps = {
  show: boolean;
  onClose: () => void;
} & React.ComponentProps<'div'>;

export default ({ show, onClose }: AuthDialogProps) => {
  const handleLoginSubmit = (username: string, password: string) => {};

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Body>
        <AuthForm title="Login to ReaTransform" onSubmit={handleLoginSubmit} />
        <div className="text-muted" style={styles.signupText}>
          No account?&nbsp;<a href="https://github.com/mbise1993/reatransform">Signup!</a>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const styles = {
  signupText: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '13px',
    padding: '10px 0px',
  },
};
