import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Header from './Header';
import ProjectsPanel from './ProjectsPanel';
import EditorView from './EditorView';
import { FlexColumn, FlexRow, Panel, Select } from './base';
import { RppProject, importProjects, saveProjects } from '../project/rppProject';
import { allScripts, runTransformScript } from '../transform/transformScript';
import colors from './colors';

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

  const handleScriptChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedScript = allScripts.find(s => s.name === e.target.value);
    if (selectedScript) {
      setScript(selectedScript);
      setScriptText(selectedScript.script);
    }
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

  const renderScriptSelect = () => {
    return (
      <Select style={{ width: 200 }} onChange={e => handleScriptChange(e)}>
        {allScripts.map(s => {
          return (
            <option key={s.name} selected={s.name === script.name} value={s.name}>
              {s.name}
            </option>
          );
        })}
      </Select>
    );
  };

  const message = selectedProject ? `JSON for ${selectedProject.name}` : 'No Project Selected';
  const editorHeight = '500px';

  return (
    <Container fluid>
      <Row>
        <Header title="ReaProject" onTransformClick={() => handleTransformClick()} />
      </Row>
      <Row style={{ height: '' }} noGutters>
        <Col lg>
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
          <Panel
            headerBackgroundColor={colors.primary}
            bodyBackgroundColor="transparent"
            borderColor={colors.secondary}
            renderHeaderLeft={() => 'Transform Script'}
            renderHeaderRight={() => renderScriptSelect()}>
            <EditorView
              text={scriptText}
              isEditable={true}
              height={editorHeight}
              onTextChange={text => handleScriptTextChange(text)}
            />
          </Panel>
        </Col>

        <Col lg>
          <Panel
            headerBackgroundColor={colors.primary}
            bodyBackgroundColor="transparent"
            borderColor={colors.secondary}
            renderHeaderLeft={() => message}>
            <EditorView
              text={projectJson}
              isEditable={false}
              height={editorHeight}
              onTextChange={text => { }}
            />
          </Panel>
        </Col>
      </Row>
    </Container>
  );
};
