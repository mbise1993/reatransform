import { ProjectActionTypes, ProjectActions } from './projectActions';
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
  return {
    ...state,
    isImportInProgress: false,
    importError: undefined,
    projects: [...state.projects, ...projects],
  };
};

const importFailed = (state: ProjectState, error: Error) => {
  return {
    ...state,
    isImportInProgress: false,
    importError: error,
  };
};

const deleteProject = (state: ProjectState, projectId: string) => {
  return {
    ...state,
    projects: state.projects.filter(proj => proj.id.toString() !== projectId),
  };
};

const selectProject = (state: ProjectState, projectId: string) => {
  return {
    ...state,
    selectedProject: state.projects.find(proj => proj.id.toString() === projectId),
  };
};

const setProjectJson = (state: ProjectState, json: string) => {
  return {
    ...state,
    selectedProjectJson: json,
  };
};

const setSourceProject = (state: ProjectState, projectId: string) => {
  return {
    ...state,
    sourceProject: state.projects.find(proj => proj.id.toString() === projectId),
  };
};

export const projectReducer = (state = initialState, action: ProjectActions): ProjectState => {
  switch (action.type) {
    case ProjectActionTypes.IMPORT_SUCCESS:
      return importSuccess(state, action.payload.projects);
    case ProjectActionTypes.DELETE:
      return deleteProject(state, action.payload.projectId);
    case ProjectActionTypes.SELECT:
      return selectProject(state, action.payload.projectId);
    case ProjectActionTypes.SET_JSON:
      return setProjectJson(state, action.payload.json);
    case ProjectActionTypes.SET_SOURCE:
      return setSourceProject(state, action.payload.projectId);
    case ProjectActionTypes.IMPORT_INPROGRESS:
      return importInProgress(state);
    case ProjectActionTypes.IMPORT_FAILED:
      return importFailed(state, action.payload.error);
    default:
      return state;
  }
};
