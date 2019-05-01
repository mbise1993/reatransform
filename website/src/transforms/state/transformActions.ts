import { Dispatch } from 'redux';

import { ITransformScript, TransformScriptService, runTransformScript } from '../domain';
import { IRppData } from '../../projects/domain';
import { createAction } from '../../shared/state';

export enum TransformActionTypes {
  GET_SCRIPTS_SUCCESS = 'transform/GET_SCRIPTS_SUCCESS',
  SAVE_SCRIPT_SUCCESS = 'transform/SAVE_SCRIPT_SUCCESS',
  DELETE_SCRIPT_SUCCESS = 'transform/DELETE_SCRIPT_SUCCESS',
  CALL_INPROGRESS = 'transform/CALL_INPROGRESS',
  CALL_FAILED = 'transform/CALL_FAILED',
  SELECT_SCRIPT = 'transform/SELECT_SCRIPT',
  MODIFY_SCRIPT_TEXT = 'transform/MODIFY_SCRIPT_TEXT',
  TRANSFORM_INPROGRESS = 'transform/TRANSFORM_INPROGRESS',
  TRANSFORM_SUCCESS = 'transform/TRANSFORM_SUCCESS',
  TRANSFORM_FAILED = 'transform/TRANSFORM_FAILED',
  CLEAR_TRANSFORMED_PROJECTS = 'transform/CLEAR_TRANSFORMED_PROJECTS',
}

type GetScriptsSuccessAction = {
  readonly type: TransformActionTypes.GET_SCRIPTS_SUCCESS;
  readonly payload: {
    readonly scripts: ITransformScript[];
  };
};

type SaveScriptSuccessAction = {
  readonly type: TransformActionTypes.SAVE_SCRIPT_SUCCESS;
  readonly payload: {
    readonly script: ITransformScript;
  };
};

type DeleteScriptSuccessAction = {
  readonly type: TransformActionTypes.DELETE_SCRIPT_SUCCESS;
  readonly payload: {
    readonly script: ITransformScript;
  };
};

type CallInProgressAction = {
  readonly type: TransformActionTypes.CALL_INPROGRESS;
};

type CallFailedAction = {
  readonly type: TransformActionTypes.CALL_FAILED;
  readonly payload: {
    readonly error: Error;
  };
};

type SelectScriptAction = {
  readonly type: TransformActionTypes.SELECT_SCRIPT;
  readonly payload: {
    readonly script: ITransformScript;
  };
};

type ModifyScriptTextAction = {
  readonly type: TransformActionTypes.MODIFY_SCRIPT_TEXT;
  readonly payload: {
    readonly scriptText: string;
  };
};

type TransformInProgressAction = {
  readonly type: TransformActionTypes.TRANSFORM_INPROGRESS;
};

type TransformSuccessAction = {
  readonly type: TransformActionTypes.TRANSFORM_SUCCESS;
  readonly payload: {
    readonly transformedProjects: IRppData[];
  };
};

type TransformFailedAction = {
  readonly type: TransformActionTypes.TRANSFORM_FAILED;
  readonly payload: {
    readonly error: Error;
  };
};

type ClearTransformedProjectsAction = {
  readonly type: TransformActionTypes.CLEAR_TRANSFORMED_PROJECTS;
};

export type TransformActions =
  | GetScriptsSuccessAction
  | SaveScriptSuccessAction
  | DeleteScriptSuccessAction
  | CallInProgressAction
  | CallFailedAction
  | SelectScriptAction
  | ModifyScriptTextAction
  | TransformSuccessAction
  | TransformInProgressAction
  | TransformFailedAction
  | ClearTransformedProjectsAction;

export const getAllScripts = () => {
  return async (dispatch: Dispatch) => {
    dispatch(createAction(TransformActionTypes.CALL_INPROGRESS));
    try {
      const scripts = await TransformScriptService.getAllScripts();
      return dispatch(createAction(TransformActionTypes.GET_SCRIPTS_SUCCESS, { scripts }));
    } catch (e) {
      return dispatch(createAction(TransformActionTypes.CALL_FAILED, { error: e }));
    }
  };
};

export const saveScript = (script: ITransformScript) => {
  return async (dispatch: Dispatch) => {
    dispatch(createAction(TransformActionTypes.CALL_INPROGRESS));
    try {
      await TransformScriptService.saveScript(script);
      return dispatch(createAction(TransformActionTypes.SAVE_SCRIPT_SUCCESS, { script }));
    } catch (e) {
      return dispatch(createAction(TransformActionTypes.CALL_FAILED, { error: e }));
    }
  };
};

export const deleteScript = (script: ITransformScript) => {
  return async (dispatch: Dispatch) => {
    dispatch(createAction(TransformActionTypes.CALL_INPROGRESS));
    try {
      await TransformScriptService.deleteScript(script.id!);
      return dispatch(createAction(TransformActionTypes.DELETE_SCRIPT_SUCCESS, { script }));
    } catch (e) {
      return dispatch(createAction(TransformActionTypes.CALL_FAILED, { error: e }));
    }
  };
};

export const selectScript = (script: ITransformScript) => createAction(TransformActionTypes.SELECT_SCRIPT, { script });

export const modifyScriptText = (scriptText: string) =>
  createAction(TransformActionTypes.MODIFY_SCRIPT_TEXT, { scriptText });

export const runTransform = (script: string, sourceProject: IRppData, otherProjects: IRppData[]) => {
  return async (dispatch: Dispatch) => {
    dispatch(createAction(TransformActionTypes.TRANSFORM_INPROGRESS));
    try {
      const transformedProjects = await runTransformScript(script, sourceProject, otherProjects);
      dispatch(createAction(TransformActionTypes.TRANSFORM_SUCCESS, { transformedProjects }));
    } catch (e) {
      dispatch(createAction(TransformActionTypes.TRANSFORM_FAILED, { error: e }));
    }
  };
};

export const clearTransformedProjects = () => createAction(TransformActionTypes.CLEAR_TRANSFORMED_PROJECTS);
