import * as React from "react";
import { Card } from "react-bootstrap";

import EditorView from "../core/EditorView";

type ProjectJsonPanelProps = {
  title: string;
  json: string;
};

export default ({ title, json }: ProjectJsonPanelProps) => {
  return (
    <Card>
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <EditorView text={json} isEditable={false} onTextChange={text => {}} />
      </Card.Body>
    </Card>
  );
};
