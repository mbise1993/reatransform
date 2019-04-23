import * as React from "react";
import { Modal, Button, ListGroup, Row, Col } from "react-bootstrap";

import { IRppData, saveProjects } from "../project/reaperProject";
import elementToRpp from "../project/elementToRpp";

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
  const [rppText, setRppText] = React.useState("");

  React.useEffect(() => {
    elementToRpp(transformedRpps[0].rootElement).then(text => setRppText(text));
  }, []);

  const handleRppClick = async (rpp: IRppData) => {
    setSelectedRpp(rpp);
    setRppText(await elementToRpp(rpp.rootElement));
  };

  const handleDownloadClick = async () => {
    await saveProjects(transformedRpps);
    onClose();
  };

  const rppTextStyle: React.CSSProperties = {
    padding: "8px",
    height: "100%",
    overflow: "auto",
    whiteSpace: "pre",
    fontSize: 12,
    fontFamily: "monospace",
  };

  return (
    <Modal size="lg" show={show} onHide={onClose}>
      <Modal.Header>
        <Modal.Title>Transformed Projects</Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ height: "50vh" }}>
        <Row style={{ height: "100%" }} noGutters>
          <Col lg="5">
            <ListGroup as="ul" style={{ height: "100%", borderRight: "1px solid white" }}>
              {transformedRpps.map((rpp, i) => (
                <ListGroup.Item key={i} active={rpp === selectedRpp} onClick={() => handleRppClick(rpp)}>
                  {rpp.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>

          <Col lg="7" style={{ height: "100%" }}>
            <div style={rppTextStyle}>{rppText}</div>
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-light" size="sm" onClick={() => handleDownloadClick()}>
          Download All
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
