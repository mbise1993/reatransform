import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Modal, Button, ListGroup } from 'react-bootstrap';

import { RppData, ProjectService } from '../projects/domain';
import { clearTransformedProjects } from './state';
import { AppState } from '../app/state';

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

type TransformDialogProps = {
  show: boolean;
  transformedRpps: RppData[];
  onClose: () => void;
};

const TransformDialog = ({ show, transformedRpps, onClose }: TransformDialogProps) => {
  const [selectedRpp, setSelectedRpp] = React.useState(transformedRpps[0]);
  const [rppText, setRppText] = React.useState('');

  React.useEffect(() => {
    if (transformedRpps.length === 0) {
      setRppText('');
      return;
    }

    ProjectService.elementToRpp(transformedRpps[0].rootElement).then(text => setRppText(text));
  }, [transformedRpps]);

  const handleRppClick = async (rpp: RppData) => {
    setSelectedRpp(rpp);
    setRppText(await ProjectService.elementToRpp(rpp.rootElement));
  };

  const handleDownloadClick = async () => {
    await ProjectService.saveProjects(transformedRpps);
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

const mapStateToProps = (state: AppState) => {
  return {
    show: state.transform.transformedProjects.length > 0,
    transformedRpps: state.transform.transformedProjects,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onClose: bindActionCreators(clearTransformedProjects, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransformDialog);
