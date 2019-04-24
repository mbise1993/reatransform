import * as React from "react";
import { Card } from "react-bootstrap";

import EditorView from "../common/EditorView";

type ProjectJsonPanelProps = {
  title: string;
  json: string;
} & React.ComponentPropsWithoutRef<"div">;

export default ({ title, json, ...otherProps }: ProjectJsonPanelProps) => {
  return (
    <Card {...otherProps}>
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <EditorView text={json} isEditable={false} onTextChange={text => {}} />
      </Card.Body>
    </Card>
  );
};
