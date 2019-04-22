import * as React from 'react';
import {
  Container,
  Row,
  Col,
  CardGroup,
  Card,
  Button,
  ButtonGroup,
  DropdownButton,
  Dropdown
} from 'react-bootstrap';

import ProjectsPanel from './ProjectsPanel';
import EditorView from './EditorView';
import { RppProject, importProjects, saveProjects } from '../project/rppProject';
import { allScripts, runTransformScript, ITransformScript } from '../transform/transformScript';

export default () => {
  const [projects, setProjects] = React.useState<RppProject[]>([]);
  const [selectedProject, setSelectedProject] = React.useState<RppProject | null>(null);
  const [sourceProject, setSourceProject] = React.useState<RppProject | null>(null);
  const [script, setScript] = React.useState(allScripts[0]);
  const [scriptText, setScriptText] = React.useState(allScripts[0].script);
  const [projectJson, setProjectJson] = React.useState('');

  const handleTransformClick = async () => {
    if (sourceProject === null) {
      return;
    }

    try {
      const source = await sourceProject.getData();
      const othersPromise = projects
        .filter(proj => proj.id !== sourceProject.id)
        .map(proj => proj.getData());

      const others = await Promise.all(othersPromise);
      const transformedRpps = await runTransformScript(scriptText, source, others);
      await saveProjects(transformedRpps);
    } catch (e) {
      alert(`Error: ${e.message}`);
    }
  };

  const handleFileImport = async (files: FileList | null) => {
    if (!files) {
      return;
    }

    const importedProjects = await importProjects(files);
    if (!importedProjects) {
      return;
    }

    if (!selectedProject) {
      setSelectedProject(importedProjects[0]);
      updateProjectJson(importedProjects[0]);
    }

    if (!sourceProject) {
      setSourceProject(importedProjects[0]);
    }

    setProjects([...projects, ...importedProjects]);
  };

  const handleProjectClick = (project: RppProject) => {
    setSelectedProject(project);
    updateProjectJson(project);
  };

  const handleSetSourceClick = (project: RppProject) => {
    setSourceProject(project);
  };

  const handleDeleteClick = (project: RppProject) => {
    const newProjects = projects.filter(proj => proj.id !== project.id);
    setProjects(newProjects);

    if (selectedProject && project.id === selectedProject.id) {
      setSelectedProject(newProjects[0]);
    }

    if (sourceProject && project.id === sourceProject.id) {
      setSourceProject(newProjects[0]);
    }
  };

  const handleScriptChange = (selectedScript: ITransformScript) => {
    setScript(selectedScript);
    setScriptText(selectedScript.script);
  };

  const handleScriptTextChange = (text: string) => {
    setScriptText(text);
  };

  const updateProjectJson = (project: RppProject) => {
    project
      .getData()
      .then(obj => setProjectJson(JSON.stringify(obj, null, 2)))
      .catch(error => console.log((error as Error).message));
  };

  const message = selectedProject ? `JSON for ${selectedProject.name}` : 'No Project Selected';

  return (
    <Container fluid>
      <Row className="app-header">
        ReaProject
      </Row>

      <Row className="app-content">
        <Col lg="3">
          <ProjectsPanel
            projects={projects}
            selectedProject={selectedProject!}
            sourceProject={sourceProject!}
            onFileImport={files => handleFileImport(files)}
            onProjectClick={project => handleProjectClick(project)}
            onSetSourceClick={project => handleSetSourceClick(project)}
            onDeleteClick={project => handleDeleteClick(project)}
          />
        </Col>

        <Col lg>
          <CardGroup className="h-100">
            <Card>
              <Card.Header>
                Transform Script
                  <ButtonGroup>
                  <DropdownButton
                    id="script-dropdown"
                    size="sm"
                    variant="outline-light"
                    title={script.name}>
                    {allScripts.map(s => {
                      return (
                        <Dropdown.Item
                          key={s.name}
                          onClick={() => handleScriptChange(s)}>
                          {s.name}
                        </Dropdown.Item>
                      );
                    })}
                  </DropdownButton>
                  <Button size="sm" variant="outline-light" onClick={() => handleTransformClick()}>
                    Run
                    </Button>
                </ButtonGroup>
              </Card.Header>
              <Card.Body>
                <EditorView
                  text={scriptText}
                  isEditable={true}
                  onTextChange={text => handleScriptTextChange(text)}
                />
              </Card.Body>
            </Card>

            <Card>
              <Card.Header>{message}</Card.Header>
              <Card.Body>
                <EditorView
                  text={projectJson}
                  isEditable={false}
                  onTextChange={text => { }}
                />
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
};
