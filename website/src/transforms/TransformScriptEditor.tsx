import * as React from 'react';
import { Card, ButtonGroup, DropdownButton, Dropdown, Button, Spinner } from 'react-bootstrap';

import EditorView from '../shared/components/EditorView';
import { TransformScript } from './domain/transformModel';

type TransformScriptPanelProps = {
  script: TransformScript;
  scriptText: string;
  allScripts: TransformScript[];
  canRun: boolean;
  isRunning: boolean;
  onScriptChange: (script: TransformScript) => void;
  onScriptTextChange: (text: string) => void;
  onTransformClick: () => void;
} & React.ComponentPropsWithoutRef<'div'>;

export default ({
  script,
  scriptText,
  allScripts,
  canRun,
  isRunning,
  onScriptChange,
  onScriptTextChange,
  onTransformClick,
  ...otherProps
}: TransformScriptPanelProps) => {
  return (
    <Card {...otherProps}>
      <Card.Header>
        Transform Script
        <ButtonGroup>
          <DropdownButton id="script-dropdown" size="sm" variant="outline-light" title={script.name}>
            {allScripts.map(s => {
              return (
                <Dropdown.Item key={s.name} onClick={() => onScriptChange(s)}>
                  {s.name}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
          <Button size="sm" variant="outline-light" disabled={!canRun} onClick={() => onTransformClick()}>
            {isRunning ? <Spinner animation="border" size="sm" /> : 'Run'}
          </Button>
        </ButtonGroup>
      </Card.Header>
      <Card.Body>
        <EditorView text={scriptText} isEditable={true} onTextChange={text => onScriptTextChange(text)} />
      </Card.Body>
    </Card>
  );
};
