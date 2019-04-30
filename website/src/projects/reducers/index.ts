import { ProjectActionTypes, ProjectActions } from '../actions';
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

export const projectReducer = (state = initialState, action: ProjectActions): ProjectState => {
  switch (action.type) {
    case ProjectActionTypes.IMPORT:
      return {
        ...state,
        projects: [...state.projects, ...action.payload.projects],
      };
    case ProjectActionTypes.DELETE:
      return {
        ...state,
        projects: state.projects.filter(proj => proj.id.toString() !== action.payload.projectId),
      };
    case ProjectActionTypes.SELECT:
      return {
        ...state,
        selectedProject: state.projects.find(proj => proj.id.toString() === action.payload.projectId),
      };
    case ProjectActionTypes.SET_SOURCE:
      return {
        ...state,
        sourceProject: state.projects.find(proj => proj.id.toString() === action.payload.projectId),
      };
    default:
      return state;
  }
};
