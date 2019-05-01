import { TransformActions, TransformActionTypes } from './transformActions';
import { allScripts, ITransformScript } from '../domain';
import { IRppData } from '../../projects/domain';

export type TransformState = {
  readonly scripts: ITransformScript[];
  readonly selectedScript: ITransformScript;
  readonly scriptText: string;
  readonly transformedProjects: IRppData[];
  readonly isInProgress: boolean;
  readonly error: Error | undefined;
  readonly isTransformRunning: boolean;
  readonly transformError: Error | undefined;
};

const initialState: TransformState = {
  scripts: allScripts,
  selectedScript: allScripts[0],
  scriptText: allScripts[0].script,
  transformedProjects: [],
  isInProgress: false,
  error: undefined,
  isTransformRunning: false,
  transformError: undefined,
};

const getScriptsSuccess = (state: TransformState, scripts: ITransformScript[]) => {
  return {
    ...state,
    isInProgress: false,
    scripts: [...state.scripts, ...scripts],
  };
};

const saveScriptSuccess = (state: TransformState, script: ITransformScript) => {
  return {
    ...state,
    isInProgress: false,
    scripts: [...state.scripts, script],
  };
};

const deleteScriptSuccess = (state: TransformState, script: ITransformScript) => {
  const index = state.scripts.findIndex(s => s.id === script.id);
  let newSelection = state.selectedScript;
  if (script === state.selectedScript) {
    newSelection = index < state.scripts.length ? state.scripts[index] : state.scripts[index - 1];
  }

  return {
    ...state,
    isInProgress: false,
    selectScript: newSelection,
    scripts: state.scripts.filter(s => s.id !== script.id),
  };
};

const callInProgress = (state: TransformState) => {
  return {
    ...state,
    isInProgress: true,
  };
};

const callFailed = (state: TransformState, error: Error) => {
  return {
    ...state,
    isInProgress: false,
    error: error,
  };
};

const selectScript = (state: TransformState, script: ITransformScript) => {
  return {
    ...state,
    scriptText: script.script,
    selectScript: script,
  };
};

const modifyScriptText = (state: TransformState, scriptText: string) => {
  return {
    ...state,
    scriptText: scriptText,
  };
};

const transformInProgress = (state: TransformState) => {
  return {
    ...state,
    isTransformRunning: true,
  };
};

const transformSuccess = (state: TransformState, transformedProjects: IRppData[]) => {
  return {
    ...state,
    isTransformRunning: false,
    transformedProjects: transformedProjects,
  };
};

const transformFailed = (state: TransformState, error: Error) => {
  return {
    ...state,
    isTransformRunning: false,
    transformError: error,
  };
};

const clearTransformedProjects = (state: TransformState) => {
  return {
    ...state,
    transformedProjects: [],
  };
};

export const transformReducer = (state = initialState, action: TransformActions): TransformState => {
  switch (action.type) {
    case TransformActionTypes.GET_SCRIPTS_SUCCESS:
      return getScriptsSuccess(state, action.payload.scripts);
    case TransformActionTypes.SAVE_SCRIPT_SUCCESS:
      return saveScriptSuccess(state, action.payload.script);
    case TransformActionTypes.DELETE_SCRIPT_SUCCESS:
      return deleteScriptSuccess(state, action.payload.script);
    case TransformActionTypes.SELECT_SCRIPT:
      return selectScript(state, action.payload.script);
    case TransformActionTypes.MODIFY_SCRIPT_TEXT:
      return modifyScriptText(state, action.payload.scriptText);
    case TransformActionTypes.TRANSFORM_SUCCESS:
      return transformSuccess(state, action.payload.transformedProjects);
    case TransformActionTypes.CALL_INPROGRESS:
      return callInProgress(state);
    case TransformActionTypes.CALL_FAILED:
      return callFailed(state, action.payload.error);
    case TransformActionTypes.TRANSFORM_INPROGRESS:
      return transformInProgress(state);
    case TransformActionTypes.TRANSFORM_FAILED:
      return transformFailed(state, action.payload.error);
    case TransformActionTypes.CLEAR_TRANSFORMED_PROJECTS:
      return clearTransformedProjects(state);
    default:
      return state;
  }
};
