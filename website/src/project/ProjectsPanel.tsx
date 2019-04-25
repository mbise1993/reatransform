import * as React from "react";
import { Card, Button, ButtonGroup, ListGroup } from "react-bootstrap";

import { ReaperProject } from "./reaperProject";

type ProjectsPanelProps = {
  projects: ReaperProject[];
  selectedProject: ReaperProject | null;
  sourceProject: ReaperProject | null;
  onFileImport: (file: FileList | null) => void;
  onProjectClick: (project: ReaperProject) => void;
  onSetSourceClick: (project: ReaperProject) => void;
  onDeleteClick: (project: ReaperProject) => void;
} & React.ComponentPropsWithoutRef<"div">;

export default ({
  projects,
  selectedProject,
  sourceProject,
  onFileImport,
  onProjectClick,
  onSetSourceClick,
  onDeleteClick,
  ...otherProps
}: ProjectsPanelProps) => {
  const stopPropogation = (e: React.MouseEvent, handler: (project: ReaperProject) => void, project: ReaperProject) => {
    e.stopPropagation();
    handler(project);
  };

  let importFileInput: HTMLInputElement;

  const padLeft = {
    paddingLeft: "4px",
  };

  return (
    <Card {...otherProps}>
      <Card.Header>
        Projects
        <span>
          <input
            ref={ref => (importFileInput = ref!)}
            multiple
            type="file"
            id="import-file-input"
            name="files[]"
            style={{ display: "none" }}
            onChange={e => onFileImport(e.target.files)}
          />
          <Button variant="outline-light" size="sm" onClick={() => importFileInput!.click()}>
            Import
          </Button>
        </span>
      </Card.Header>

      <Card.Body>
        <ListGroup as="ul">
          {projects.map(project => (
            <ListGroup.Item
              key={project.id}
              active={!!selectedProject && project.id === selectedProject.id}
              onClick={() => onProjectClick(project)}
            >
              <span style={{ textOverflow: "ellipsis" }}>{project.name}</span>

              <ButtonGroup>
                <Button
                  variant={
                    !sourceProject ? "outline-light" : project.id === sourceProject.id ? "light" : "outline-light"
                  }
                  size="sm"
                  style={padLeft}
                  onClick={(e: React.MouseEvent) => stopPropogation(e, onSetSourceClick, project)}
                >
                  Source
                </Button>
                <Button
                  variant="outline-light"
                  size="sm"
                  style={padLeft}
                  onClick={(e: React.MouseEvent) => stopPropogation(e, onDeleteClick, project)}
                >
                  Delete
                </Button>
              </ButtonGroup>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};
