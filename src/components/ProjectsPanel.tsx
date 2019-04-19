import * as React from 'react';
import { Card, Row, Button, ListGroup } from 'react-bootstrap';
import { PlusSquare, Square, CheckSquare, MinusSquare } from 'styled-icons/feather';

import { RppProject } from '../project/rppProject';

interface IProjectsPanelProps {
  projects: RppProject[];
  selectedProject: RppProject;
  sourceProject: RppProject;
  onFileImport: (file: FileList | null) => void;
  onProjectClick: (project: RppProject) => void;
  onSetSourceClick: (project: RppProject) => void;
  onDeleteClick: (project: RppProject) => void;
}

export default ({
  projects,
  selectedProject,
  sourceProject,
  onFileImport,
  onProjectClick,
  onSetSourceClick,
  onDeleteClick
}: IProjectsPanelProps) => {

  let importFileInput: HTMLInputElement;

  const padLeft = {
    paddingLeft: '4px'
  };

  return (
    <Card>
      <Card.Header>
        <Row style={{justifyContent: 'space-between'}}>
          Projects
          <span>
            <input
              ref={ref => (importFileInput = ref!)}
              multiple
              type="file"
              id="import-file-input"
              name="files[]"
              style={{ display: 'none' }}
              onChange={e => onFileImport(e.target.files)}
            />
            <Button 
              variant="outline-light" 
              onClick={() => importFileInput!.click()}>
              <PlusSquare size={20} />
            </Button>
          </span>
        </Row>
      </Card.Header>

      <Card.Body>
        <ListGroup as="ul">
          {projects.map(project => (
            <ListGroup.Item 
              style={{justifyContent: 'space-between'}} 
              active={project.id === selectedProject.id}
              onClick={() => onProjectClick(project)}>
              {project.name}
              <span>
                <Button
                  variant="outline-light"
                  style={padLeft}
                  onClick={() => onSetSourceClick(project)}>
                  {project.id === sourceProject.id ? <CheckSquare size={20} /> : <Square size={20} />}
                </Button>
                <Button 
                  variant="outline-light" 
                  style={padLeft} 
                  onClick={() => onDeleteClick(project)}>
                  <MinusSquare size={20} />
                </Button>
              </span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};
