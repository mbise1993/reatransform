import React from 'react';
import { Form, Button, FormControlProps } from 'react-bootstrap';

type LoginFormProps = {
  onSubmit: (username: string, password: string) => void;
  onSignUpClick: () => void;
};

export default ({ onSubmit, onSignUpClick }: LoginFormProps) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <Form onSubmit={() => onSubmit(username, password)}>
      <Form.Group controlId="formTitle" style={styles.title}>
        Login&nbsp;
        <span role="img" aria-label="Heart emoji">
          🚀
        </span>
      </Form.Group>

      <Form.Group controlId="formUsername">
        <Form.Control
          type="input"
          placeholder="Username"
          onChange={(e: React.FormEvent<FormControlProps>) => setUsername(e.currentTarget.value || '')}
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e: React.FormEvent<FormControlProps>) => setPassword(e.currentTarget.value || '')}
        />
        <Form.Text>
          <a href="">Forgot password</a>
        </Form.Text>
      </Form.Group>

      <Button variant="light" type="submit">
        Submit
      </Button>

      <div style={styles.signUpText}>
        No account?&nbsp;
        <a href="javascript:void(0);" onClick={onSignUpClick}>
          Sign up!
        </a>
      </div>
    </Form>
  );
};

const styles = {
  title: {
    fontSize: '30px',
    fontWeight: 200,
  },
  signUpText: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '13px',
    padding: '10px 0px',
  },
};
