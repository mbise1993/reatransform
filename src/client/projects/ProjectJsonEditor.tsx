import * as React from 'react';
import { Card } from 'react-bootstrap';

import EditorView from '../shared/components/EditorView';

type ProjectJsonEditorProps = {
  title: string;
  json: string;
} & React.ComponentPropsWithoutRef<'div'>;

export default ({ title, json, ...otherProps }: ProjectJsonEditorProps) => {
  return (
    <Card {...otherProps}>
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <EditorView text={json} isEditable={false} onTextChange={_text => {}} />
      </Card.Body>
    </Card>
  );
};
