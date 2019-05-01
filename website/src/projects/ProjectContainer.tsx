import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import ProjectList from './ProjectList';
import ProjectJsonPanel from './ProjectJsonPanel';
import { ReaperProject } from './domain';
import { importFiles, deleteProject, select, setSource } from './state';
import { AppState } from '../app/state';

type ObjectProps = {
  projects: ReaperProject[];
  selectedProject: ReaperProject | undefined;
  selectedProjectJson: string;
  sourceProject: ReaperProject | undefined;
};

type FuncProps = {
  onImportClick: (files: FileList | null) => void;
  onDeleteClick: (projectId: string) => void;
  onProjectClick: (project: ReaperProject) => void;
  onSetSourceClick: (projectId: string) => void;
};

type ProjectContainerProps = ObjectProps & FuncProps;

const ProjectContainer = ({
  projects,
  selectedProject,
  selectedProjectJson,
  sourceProject,
  onImportClick,
  onDeleteClick,
  onProjectClick,
  onSetSourceClick,
}: ProjectContainerProps) => {
  return (
    <>
      <ProjectList
        id="projects-panel"
        projects={projects}
        selectedProject={selectedProject}
        sourceProject={sourceProject}
        onFileImport={files => onImportClick(files)}
        onProjectClick={project => onProjectClick(project)}
        onSetSourceClick={project => onSetSourceClick(project.id.toString())}
        onDeleteClick={project => onDeleteClick(project.id.toString())}
      />

      <ProjectJsonPanel
        id="project-json-panel"
        title={selectedProject ? `JSON for ${selectedProject.name}` : 'No Project Selected'}
        json={selectedProjectJson}
      />
    </>
  );
};

const mapStateToProps = (state: AppState): ObjectProps => {
  return {
    projects: state.project.projects,
    selectedProject: state.project.selectedProject,
    selectedProjectJson: state.project.selectedProjectJson,
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
