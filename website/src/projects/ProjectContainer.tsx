import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import ProjectList from './ProjectList';
import ProjectJsonPanel from './ProjectJsonPanel';
import { Project } from './domain';
import { importFiles, deleteProject, select, setSource } from './state';
import { AppState } from '../app/state';

type ObjectProps = {
  projects: Project[];
  selectedProject: Project | undefined;
  sourceProject: Project | undefined;
};

type FuncProps = {
  onImportClick: (files: FileList | null) => void;
  onDeleteClick: (project: Project) => void;
  onProjectClick: (project: Project) => void;
  onSetSourceClick: (project: Project) => void;
};

type ProjectContainerProps = ObjectProps & FuncProps;

const ProjectContainer = ({
  projects,
  selectedProject,
  sourceProject,
  onImportClick,
  onDeleteClick,
  onProjectClick,
  onSetSourceClick,
}: ProjectContainerProps) => {
  const [projectJson, setProjectJson] = React.useState('');

  React.useEffect(() => {
    if (!selectedProject) {
      setProjectJson('');
      return;
    }

    selectedProject.getRppData().then(data => setProjectJson(JSON.stringify(data, null, 2)));
  }, [selectedProject]);

  return (
    <>
      <ProjectList
        id="projects-panel"
        projects={projects}
        selectedProject={selectedProject}
        sourceProject={sourceProject}
        onFileImport={files => onImportClick(files)}
        onProjectClick={project => onProjectClick(project)}
        onSetSourceClick={project => onSetSourceClick(project)}
        onDeleteClick={project => onDeleteClick(project)}
      />

      <ProjectJsonPanel
        id="project-json-panel"
        title={selectedProject ? `JSON for ${selectedProject.name}` : 'No Project Selected'}
        json={projectJson}
      />
    </>
  );
};

const mapStateToProps = (state: AppState): ObjectProps => {
  return {
    projects: state.project.projects,
    selectedProject: state.project.selectedProject,
    sourceProject: state.project.sourceProject,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): FuncProps => {
  return {
    onImportClick: bindActionCreators(importFiles, dispatch),
    onDeleteClick: bindActionCreators(deleteProject, dispatch),
    onProjectClick: bindActionCreators(select, dispatch),
    onSetSourceClick: bindActionCreators(setSource, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectContainer);
