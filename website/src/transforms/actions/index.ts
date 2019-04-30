import { Dispatch } from 'redux';

import { ITransformScript, TransformScriptService } from '../domain';
import { createAction } from '../../shared/actions';

export enum TransformActionTypes {
  GET_ALL_SCRIPTS = 'GET_ALL_SCRIPTS',
  ADD_SCRIPT = 'ADD_SCRIPT',
  UPDATE_SCRIPT = 'UPDATE_SCRIPT',
  DELETE_SCRIPT = 'DELETE_SCRIPT',
  ACTION_INPROGRESS = 'ACTION_INPROGRESS',
  ACTION_ERROR = 'ACTION_ERROR',
}

export interface IGetAllScriptsAction {
  readonly type: TransformActionTypes.GET_ALL_SCRIPTS;
  readonly payload: {
    readonly scripts: ITransformScript[];
  };
}

export interface IAddScriptAction {
  readonly type: TransformActionTypes.ADD_SCRIPT;
  readonly payload: {
    readonly script: ITransformScript;
  };
}

export interface IUpdateScriptAction {
  readonly type: TransformActionTypes.UPDATE_SCRIPT;
  readonly payload: {
    readonly script: ITransformScript;
  };
}

export interface IDeleteScriptAction {
  readonly type: TransformActionTypes.DELETE_SCRIPT;
  readonly payload: {
    readonly scriptId: string;
  };
}

export interface IActionInProgress {
  readonly type: TransformActionTypes.ACTION_INPROGRESS;
}

export interface IActionError {
  readonly type: TransformActionTypes.ACTION_ERROR;
  readonly payload: {
    readonly error: Error;
  };
}

export type TransformActions =
  | IGetAllScriptsAction
  | IAddScriptAction
  | IUpdateScriptAction
  | IDeleteScriptAction
  | IActionInProgress
  | IActionError;

export const getAllScripts = () => {
  return async (dispatch: Dispatch) => {
    dispatch(createAction(TransformActionTypes.ACTION_INPROGRESS));
    try {
      const scripts = await TransformScriptService.getAllScripts();
      return dispatch(createAction(TransformActionTypes.GET_ALL_SCRIPTS, { scripts }));
    } catch (e) {
      return dispatch(createAction(TransformActionTypes.ACTION_ERROR, { error: e }));
    }
  };
};

export const addScript = (script: ITransformScript) => {
  return async (dispatch: Dispatch) => {
    dispatch(createAction(TransformActionTypes.ACTION_INPROGRESS));
    try {
      await TransformScriptService.addScript(script);
      return dispatch(createAction(TransformActionTypes.ADD_SCRIPT, { script }));
    } catch (e) {
      return dispatch(createAction(TransformActionTypes.ACTION_ERROR, { error: e }));
    }
  };
};

export const updateScript = (script: ITransformScript) => {
  return async (dispatch: Dispatch) => {
    dispatch(createAction(TransformActionTypes.ACTION_INPROGRESS));
    try {
      await TransformScriptService.updateScript(script);
      return dispatch(createAction(TransformActionTypes.UPDATE_SCRIPT, { script }));
    } catch (e) {
      return dispatch(createAction(TransformActionTypes.ACTION_ERROR, { error: e }));
    }
  };
};

export const deleteScript = (scriptId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(createAction(TransformActionTypes.ACTION_INPROGRESS));
    try {
      await TransformScriptService.deleteScript(scriptId);
      return dispatch(createAction(TransformActionTypes.DELETE_SCRIPT, { scriptId }));
    } catch (e) {
      return dispatch(createAction(TransformActionTypes.ACTION_ERROR, { error: e }));
    }
  };
};
