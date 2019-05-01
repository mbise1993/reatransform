import { TransformActions, TransformActionTypes } from './transformActions';
import { ITransformScript } from '../domain';
import { IRppData } from '../../projects/domain';

export type TransformState = {
  readonly scripts: ITransformScript[];
  readonly selectedScript: ITransformScript | undefined;
  readonly scriptText: string;
  readonly transformedProjects: IRppData[];
};

const initialState: TransformState = {
  scripts: [],
  selectedScript: undefined,
  scriptText: '',
  transformedProjects: [],
};

const getAllScripts = (state: TransformState, scripts: ITransformScript[]) => {
  return {
    ...state,
    scripts: [...state.scripts, ...scripts],
  };
};

const addScript = (state: TransformState, script: ITransformScript) => {
  return {
    ...state,
    scripts: [...state.scripts, script],
  };
};

const updateScript = (state: TransformState, script: ITransformScript) => {
  let newScripts = [...state.scripts];
  const index = newScripts.findIndex(s => s.id === script.id);
  newScripts[index] = script;
  return {
    ...state,
    scripts: newScripts,
  };
};

const deleteScript = (state: TransformState, scriptId: string) => {
  return {
    ...state,
    scripts: state.scripts.filter(script => script.id !== scriptId),
  };
};

const transformFinished = (state: TransformState, transformedProjects: IRppData[]) => {
  return {
    ...state,
    transformedProjects: transformedProjects,
  };
};

export const transformReducer = (state = initialState, action: TransformActions): TransformState => {
  switch (action.type) {
    case TransformActionTypes.GET_ALL_SCRIPTS:
      return getAllScripts(state, action.payload.scripts);
    case TransformActionTypes.ADD_SCRIPT:
      return addScript(state, action.payload.script);
    case TransformActionTypes.UPDATE_SCRIPT:
      return updateScript(state, action.payload.script);
    case TransformActionTypes.DELETE_SCRIPT:
      return deleteScript(state, action.payload.scriptId);
    case TransformActionTypes.TRANSFORM_FINISHED:
      return transformFinished(state, action.payload.transformedProjects);
    default:
      return state;
  }
};
