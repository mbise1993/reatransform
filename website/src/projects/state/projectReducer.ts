import { ProjectActionTypes, ProjectActions } from './projectActions';
import { ReaperProject } from '../domain';

export type ProjectState = {
  readonly projects: ReaperProject[];
  readonly selectedProject: ReaperProject | undefined;
  readonly sourceProject: ReaperProject | undefined;
};

const initialState: ProjectState = {
  projects: [],
  selectedProject: undefined,
  sourceProject: undefined,
};

const importProjects = (state: ProjectState, projects: ReaperProject[]) => {
  return {
    ...state,
    projects: [...state.projects, ...projects],
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

const setSourceProject = (state: ProjectState, projectId: string) => {
  return {
    ...state,
    sourceProject: state.projects.find(proj => proj.id.toString() === projectId),
  };
};

export const projectReducer = (state = initialState, action: ProjectActions): ProjectState => {
  switch (action.type) {
    case ProjectActionTypes.IMPORT:
      return importProjects(state, action.payload.projects);
    case ProjectActionTypes.DELETE:
      return deleteProject(state, action.payload.projectId);
    case ProjectActionTypes.SELECT:
      return selectProject(state, action.payload.projectId);
    case ProjectActionTypes.SET_SOURCE:
      return setSourceProject(state, action.payload.projectId);
    default:
      return state;
  }
};
