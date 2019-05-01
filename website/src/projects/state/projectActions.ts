import { Dispatch } from 'redux';

import { ReaperProject, importProjects } from '../domain';
import { createAction } from '../../shared/state';

export enum ProjectActionTypes {
  IMPORT_INPROGRESS = 'project/IMPORT_INPROGRESS',
  IMPORT_SUCCESS = 'project/IMPORT',
  IMPORT_FAILED = 'project/IMPORT_FAILED',
  DELETE = 'project/DELETE',
  SELECT = 'project/SELECT',
  SET_SOURCE = 'project/SET_SOURCE',
}

type ImportInProgressAction = {
  readonly type: ProjectActionTypes.IMPORT_INPROGRESS;
};

type ImportSuccessAction = {
  readonly type: ProjectActionTypes.IMPORT_SUCCESS;
  readonly payload: {
    projects: ReaperProject[];
  };
};

type ImportFailedAction = {
  readonly type: ProjectActionTypes.IMPORT_FAILED;
  readonly payload: {
    readonly error: Error;
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

export type ProjectActions =
  | ImportInProgressAction
  | ImportSuccessAction
  | ImportFailedAction
  | DeleteAction
  | SelectAction
  | SetSourceAction;

export const importFiles = (files: FileList | null) => {
  return async (dispatch: Dispatch) => {
    dispatch(createAction(ProjectActionTypes.IMPORT_INPROGRESS));
    try {
      const projects = await importProjects(files);
      dispatch(createAction(ProjectActionTypes.IMPORT_SUCCESS, { projects }));
    } catch (e) {
      dispatch(createAction(ProjectActionTypes.IMPORT_FAILED, { error: e }));
    }
  };
};

export const deleteProject = (projectId: string) => createAction(ProjectActionTypes.DELETE, { projectId });

export const select = (projectId: string) => createAction(ProjectActionTypes.SELECT, { projectId });

export const setSource = (projectId: string) => createAction(ProjectActionTypes.SET_SOURCE, { projectId });
