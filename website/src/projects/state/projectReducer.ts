import { ProjectActionTypes, ProjectActions, select } from './projectActions';
import { ReaperProject } from '../domain';

export type ProjectState = {
  readonly projects: ReaperProject[];
  readonly selectedProject: ReaperProject | undefined;
  readonly selectedProjectJson: string;
  readonly sourceProject: ReaperProject | undefined;
  readonly isImportInProgress: boolean;
  readonly importError: Error | undefined;
};

const initialState: ProjectState = {
  projects: [],
  selectedProject: undefined,
  selectedProjectJson: '',
  sourceProject: undefined,
  isImportInProgress: false,
  importError: undefined,
};

const importInProgress = (state: ProjectState) => {
  return {
    ...state,
    isImportInProgress: true,
  };
};

const importSuccess = (state: ProjectState, projects: ReaperProject[]) => {
  const newState = {
    ...state,
    isImportInProgress: false,
    importError: undefined,
    projects: [...state.projects, ...projects],
  };

  if (!newState.selectedProject && newState.projects.length > 0) {
    newState.selectedProject = newState.projects[0];
  }

  if (!newState.sourceProject && newState.selectedProject) {
    newState.sourceProject = newState.selectedProject;
  }

  return newState;
};

const importFailed = (state: ProjectState, error: Error) => {
  return {
    ...state,
    isImportInProgress: false,
    importError: error,
  };
};

const deleteProject = (state: ProjectState, project: ReaperProject) => {
  const index = state.projects.findIndex(proj => proj.id === project.id);
  const newProjects = state.projects.filter(proj => proj.id !== project.id);

  let newSelection = state.selectedProject;
  if (state.selectedProject === project) {
    if (newProjects.length === 0) {
      newSelection = undefined;
    } else {
      newSelection = index < newProjects.length ? newProjects[index] : newProjects[newProjects.length - 1];
    }
  }

  let newSource = state.sourceProject;
  if (state.sourceProject === project) {
    if (newProjects.length === 0) {
      newSource = undefined;
    } else {
      newSource = index < newProjects.length ? newProjects[index] : newProjects[newProjects.length - 1];
    }
  }

  return {
    ...state,
    selectedProject: newSelection,
    sourceProject: newSource,
    projects: newProjects,
  };
};

const selectProject = (state: ProjectState, project: ReaperProject) => {
  return {
    ...state,
    selectedProject: project,
  };
};

const setSourceProject = (state: ProjectState, project: ReaperProject) => {
  return {
    ...state,
    sourceProject: project,
  };
};

export const projectReducer = (state = initialState, action: ProjectActions): ProjectState => {
  switch (action.type) {
    case ProjectActionTypes.IMPORT_SUCCESS:
      return importSuccess(state, action.payload.projects);
    case ProjectActionTypes.DELETE:
      return deleteProject(state, action.payload.project);
    case ProjectActionTypes.SELECT:
      return selectProject(state, action.payload.project);
    case ProjectActionTypes.SET_SOURCE:
      return setSourceProject(state, action.payload.project);
    case ProjectActionTypes.IMPORT_INPROGRESS:
      return importInProgress(state);
    case ProjectActionTypes.IMPORT_FAILED:
      return importFailed(state, action.payload.error);
    default:
      return state;
  }
};
