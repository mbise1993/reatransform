import { TransformActions, TransformActionTypes } from './transformActions';
import { ITransformScript } from '../domain';

export type TransformState = {
  readonly scripts: ITransformScript[];
};

const initialState: TransformState = {
  scripts: [],
};

export const transformReducer = (state = initialState, action: TransformActions) => {
  switch (action.type) {
    case TransformActionTypes.GET_ALL_SCRIPTS:
      return {
        scripts: [...state.scripts, ...action.payload.scripts],
      };
    case TransformActionTypes.ADD_SCRIPT:
      return {
        scripts: [...state.scripts, action.payload.script],
      };
    case TransformActionTypes.UPDATE_SCRIPT:
      let newScripts = [...state.scripts];
      const index = newScripts.findIndex(script => script.id === action.payload.script.id);
      newScripts[index] = action.payload.script;
      return {
        scripts: newScripts,
      };
    case TransformActionTypes.DELETE_SCRIPT:
      return {
        scripts: state.scripts.filter(script => script.id !== action.payload.scriptId),
      };
    default:
      return state;
  }
};
