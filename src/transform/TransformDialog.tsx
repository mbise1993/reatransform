import * as React from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";

import { IRppData, saveProjects } from "../project/reaperProject";

type TransformDialogProps = {
  show: boolean;
  transformedRpps: IRppData[];
  onClose: () => void;
};

export default ({ show, transformedRpps, onClose }: TransformDialogProps) => {
  if (transformedRpps.length === 0) {
    return null;
  }

  const [selectedRpp, setSelectedRpp] = React.useState(transformedRpps[0]);

  const handleDownloadClick = async () => {
    await saveProjects(transformedRpps);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header>
        <Modal.Title>Transformed Projects</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ListGroup as="ul">
          {transformedRpps.map((rpp, i) => (
            <ListGroup.Item>{rpp.name}</ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-light" size="sm" onClick={() => handleDownloadClick()}>
          Download All
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
