import { Dispatch } from 'redux';

import { ITransformScript, TransformScriptService } from '../domain';
import { createAction } from '../../shared/actions';

export enum TransformActionTypes {
  GET_ALL_SCRIPTS = 'transform/GET_ALL_SCRIPTS',
  ADD_SCRIPT = 'transform/ADD_SCRIPT',
  UPDATE_SCRIPT = 'transform/UPDATE_SCRIPT',
  DELETE_SCRIPT = 'transform/DELETE_SCRIPT',
  IN_PROGRESS = 'transform/IN_PROGRESS',
  ERROR = 'transform/ERROR',
}

type GetAllScriptsAction = {
  readonly type: TransformActionTypes.GET_ALL_SCRIPTS;
  readonly payload: {
    readonly scripts: ITransformScript[];
  };
};

type AddScriptAction = {
  readonly type: TransformActionTypes.ADD_SCRIPT;
  readonly payload: {
    readonly script: ITransformScript;
  };
};

type UpdateScriptAction = {
  readonly type: TransformActionTypes.UPDATE_SCRIPT;
  readonly payload: {
    readonly script: ITransformScript;
  };
};

type DeleteScriptAction = {
  readonly type: TransformActionTypes.DELETE_SCRIPT;
  readonly payload: {
    readonly scriptId: string;
  };
};

type InProgressAction = {
  readonly type: TransformActionTypes.IN_PROGRESS;
};

type ErrorAction = {
  readonly type: TransformActionTypes.ERROR;
  readonly payload: {
    readonly error: Error;
  };
};

export type TransformActions =
  | GetAllScriptsAction
  | AddScriptAction
  | UpdateScriptAction
  | DeleteScriptAction
  | InProgressAction
  | ErrorAction;

export const getAllScripts = () => {
  return async (dispatch: Dispatch) => {
    dispatch(createAction(TransformActionTypes.IN_PROGRESS));
    try {
      const scripts = await TransformScriptService.getAllScripts();
      return dispatch(createAction(TransformActionTypes.GET_ALL_SCRIPTS, { scripts }));
    } catch (e) {
      return dispatch(createAction(TransformActionTypes.ERROR, { error: e }));
    }
  };
};

export const addScript = (script: ITransformScript) => {
  return async (dispatch: Dispatch) => {
    dispatch(createAction(TransformActionTypes.IN_PROGRESS));
    try {
      await TransformScriptService.addScript(script);
      return dispatch(createAction(TransformActionTypes.ADD_SCRIPT, { script }));
    } catch (e) {
      return dispatch(createAction(TransformActionTypes.ERROR, { error: e }));
    }
  };
};

export const updateScript = (script: ITransformScript) => {
  return async (dispatch: Dispatch) => {
    dispatch(createAction(TransformActionTypes.IN_PROGRESS));
    try {
      await TransformScriptService.updateScript(script);
      return dispatch(createAction(TransformActionTypes.UPDATE_SCRIPT, { script }));
    } catch (e) {
      return dispatch(createAction(TransformActionTypes.ERROR, { error: e }));
    }
  };
};

export const deleteScript = (scriptId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(createAction(TransformActionTypes.IN_PROGRESS));
    try {
      await TransformScriptService.deleteScript(scriptId);
      return dispatch(createAction(TransformActionTypes.DELETE_SCRIPT, { scriptId }));
    } catch (e) {
      return dispatch(createAction(TransformActionTypes.ERROR, { error: e }));
    }
  };
};
