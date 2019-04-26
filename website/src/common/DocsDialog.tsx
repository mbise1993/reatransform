import React from 'react';
import { Modal } from 'react-bootstrap';

type DocsDialogProps = {
  show: boolean;
  onClose: () => void;
};

export default ({ show, onClose }: DocsDialogProps) => {
  return (
    <Modal size="lg" show={show} onHide={onClose}>
      <Modal.Header>
        <Modal.Title>
          ReaTransform Usage&nbsp;
          <span role="img" aria-label="Nerd emoji">
            🤓
          </span>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={styles.body}>
        <p>
          Upload your .rpp files, set one of them as the <b>Source</b>, and select the transform script to run. You can
          modify any of the available transform scripts or create your own from scratch. These global variables are
          available to use in your script:
        </p>
        <ul style={styles.list}>
          <li>
            <span style={styles.code}>sourceProject</span> - the project selected as <b>Source</b>
          </li>
          <li>
            <span style={styles.code}>otherProjects</span> - the rest of the projects not selected as <b>Source</b>
          </li>
          <li>
            <span style={styles.code}>allProjects</span> - all of the projects
          </li>
        </ul>
      </Modal.Body>
    </Modal>
  );
};

const styles = {
  body: {
    padding: '20px',
  },
  list: {
    padding: '0px 0px 0px 20px',
  },
  code: {
    fontFamily: 'monospace',
  },
};
