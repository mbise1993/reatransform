import * as React from "react";
import { Card, ButtonGroup, DropdownButton, Dropdown, Button, Spinner } from "react-bootstrap";

import EditorView from "../common/EditorView";
import { ITransformScript } from "./transformScript";

type TransformScriptPanelProps = {
  script: ITransformScript;
  scriptText: string;
  allScripts: ITransformScript[];
  canRun: boolean;
  isRunning: boolean;
  onScriptChange: (script: ITransformScript) => void;
  onScriptTextChange: (text: string) => void;
  onTransformClick: () => void;
};

export default ({
  script,
  scriptText,
  allScripts,
  canRun,
  isRunning,
  onScriptChange,
  onScriptTextChange,
  onTransformClick,
}: TransformScriptPanelProps) => {
  return (
    <Card>
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
            {isRunning ? <Spinner animation="border" size="sm" /> : "Run"}
          </Button>
        </ButtonGroup>
      </Card.Header>
      <Card.Body>
        <EditorView text={scriptText} isEditable={true} onTextChange={text => onScriptTextChange(text)} />
      </Card.Body>
    </Card>
  );
};
