import * as React from 'react';
import { Card } from 'react-bootstrap';

import EditorView from '../shared/components/EditorView';
import { TransformScript } from './domain/transformModel';

type TransformScriptPanelProps = {
  script: TransformScript;
  scriptText: string;
  allScripts: TransformScript[];
  onScriptChange: (script: TransformScript) => void;
  onScriptTextChange: (text: string) => void;
} & React.ComponentPropsWithoutRef<'div'>;

export default ({
  script,
  scriptText,
  allScripts,
  onScriptChange,
  onScriptTextChange,
  ...otherProps
}: TransformScriptPanelProps) => {
  return (
    <Card {...otherProps}>
      <Card.Header>{script.name}</Card.Header>
      <Card.Body>
        <EditorView text={scriptText} isEditable={true} onTextChange={text => onScriptTextChange(text)} />
      </Card.Body>
    </Card>
  );
};
