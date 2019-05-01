import React from 'react';
import { Form, Button, FormControlProps } from 'react-bootstrap';

type SignUpFormProps = {
  onBackClick: () => void;
  onSubmit: (username: string, password: string) => void;
};

export default ({ onBackClick, onSubmit }: SignUpFormProps) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <Form onSubmit={() => onSubmit(username, password)}>
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
      </Form.Group>

      <Button variant="outline-light" onClick={onBackClick}>
        Back
      </Button>
      <Button style={{ marginLeft: 10 }} variant="light" type="submit">
        Submit
      </Button>
    </Form>
  );
};
