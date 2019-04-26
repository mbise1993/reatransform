import * as React from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';

import { IRppData, saveProjects } from '../../projects/models/reaperProject';
import elementToRpp from '../../projects/models/elementToRpp';

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
  const [rppText, setRppText] = React.useState('');

  React.useEffect(() => {
    elementToRpp(transformedRpps[0].rootElement).then(text => setRppText(text));
  });

  const handleRppClick = async (rpp: IRppData) => {
    setSelectedRpp(rpp);
    setRppText(await elementToRpp(rpp.rootElement));
  };

  const handleDownloadClick = async () => {
    await saveProjects(transformedRpps);
    onClose();
  };

  return (
    <Modal size="lg" show={show} onHide={onClose}>
      <Modal.Header>
        <Modal.Title>Transformed Projects</Modal.Title>
      </Modal.Header>

      <Modal.Body style={styles.body}>
        <div style={styles.list}>
          <ListGroup as="ul">
            {transformedRpps.map((rpp, i) => (
              <ListGroup.Item key={i} active={rpp === selectedRpp} onClick={() => handleRppClick(rpp)}>
                {rpp.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>

        <div style={styles.rppText}>{rppText}</div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-light" size="sm" onClick={() => handleDownloadClick()}>
          Download All
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const styles = {
  body: {
    display: 'flex',
    height: '50vh',
    padding: '0px',
  },
  list: {
    flexGrow: 1,
    height: '100%',
    borderRight: '1px solid white',
  },
  rppText: {
    flexGrow: 1,
    padding: '8px',
    height: '100%',
    overflow: 'auto',
    whiteSpace: 'pre',
    fontSize: 12,
    fontFamily: 'monospace',
  } as React.CSSProperties,
};
