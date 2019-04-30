import { Dispatch } from 'redux';

import { ReaperProject, importProjects } from '../domain';
import { createAction } from '../../shared/actions';

export enum ProjectActionTypes {
  IMPORT = 'project/IMPORT',
  DELETE = 'transform/DELETE',
  SELECT = 'transform/SELECT',
  SET_SOURCE = 'transform/SET_SOURCE',
}

type ImportAction = {
  readonly type: ProjectActionTypes.IMPORT;
  readonly payload: {
    projects: ReaperProject[];
  };
};

type DeleteAction = {
  readonly type: ProjectActionTypes.DELETE;
  readonly payload: {
    projectId: string;
  };
};

type SelectAction = {
  readonly type: ProjectActionTypes.SELECT;
  readonly payload: {
    projectId: string;
  };
};

type SetSourceAction = {
  readonly type: ProjectActionTypes.SET_SOURCE;
  readonly payload: {
    projectId: string;
  };
};

export type ProjectActions = ImportAction | DeleteAction | SelectAction | SetSourceAction;

export const importFiles = (files: FileList | null) => {
  return async (dispatch: Dispatch) => {
    const projects = await importProjects(files);
    dispatch(createAction(ProjectActionTypes.IMPORT, { projects }));
  };
};

export const deleteProject = (projectId: string) => createAction(ProjectActionTypes.DELETE, { projectId });

export const select = (projectId: string) => createAction(ProjectActionTypes.SELECT, { projectId });

export const setSource = (projectId: string) => createAction(ProjectActionTypes.SET_SOURCE, { projectId });
