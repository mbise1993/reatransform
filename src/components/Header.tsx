import * as React from 'react';
import { Navbar, Button } from 'react-bootstrap';

import colors from './colors';

interface IHeaderProps {
  title: string;
  onTransformClick: () => void;
}

export default ({ title, onTransformClick }: IHeaderProps) => {
  return (
    <Navbar style={{ flexGrow: 1 }} variant="dark" bg="dark" expand>
      <Navbar.Brand>{title}</Navbar.Brand>
      <Button variant="outline-light" onClick={() => onTransformClick()}>
        Run Transform Script
      </Button>
    </Navbar>
  );
};
