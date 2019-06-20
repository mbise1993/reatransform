import { Dispatch } from 'redux';

import { Project, ProjectService } from '../domain';
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
    projects: Project[];
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
    project: Project;
  };
};

type SelectAction = {
  readonly type: ProjectActionTypes.SELECT;
  readonly payload: {
    project: Project;
  };
};

type SetSourceAction = {
  readonly type: ProjectActionTypes.SET_SOURCE;
  readonly payload: {
    project: Project;
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
      const projects = await ProjectService.importProjects(files);
      dispatch(createAction(ProjectActionTypes.IMPORT_SUCCESS, { projects }));
    } catch (e) {
      dispatch(createAction(ProjectActionTypes.IMPORT_FAILED, { error: e }));
    }
  };
};

export const deleteProject = (project: Project) => createAction(ProjectActionTypes.DELETE, { project });

export const select = (project: Project) => createAction(ProjectActionTypes.SELECT, { project });

export const setSource = (project: Project) => createAction(ProjectActionTypes.SET_SOURCE, { project });
