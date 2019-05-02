import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';

import { TransformScript } from './domain';

const stopPropogation = (e: React.MouseEvent, handler: () => void) => {
  e.stopPropagation();
  handler();
};

type UserListItemProps = {
  script: TransformScript;
  isActive: boolean;
  onClick: () => void;
  onDeleteClick: () => void;
};

export const UserListItem = ({ script, isActive, onClick, onDeleteClick }: UserListItemProps) => {
  return (
    <ListGroup.Item key={script.id} active={isActive} onClick={onClick}>
      <span style={{ textOverflow: 'ellipsis' }}>{script.name}</span>

      <Button variant="outline-light" size="sm" onClick={(e: React.MouseEvent) => stopPropogation(e, onDeleteClick)}>
        Delete
      </Button>
    </ListGroup.Item>
  );
};

type PublicListItemProps = {
  script: TransformScript;
  isActive: boolean;
  onClick: () => void;
};

export const PublicListItem = ({ script, isActive, onClick }: PublicListItemProps) => {
  return (
    <ListGroup.Item key={script.id} active={isActive} onClick={onClick}>
      <span style={{ textOverflow: 'ellipsis' }}>{script.name}</span>
    </ListGroup.Item>
  );
};
