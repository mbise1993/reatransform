import { TransformActions, TransformActionTypes } from '../actions';
import { ITransformScript } from '../domain';

export interface ITransformState {
  scripts: ITransformScript[];
}

export const createDefaultTransformState = () => {
  return {
    scripts: [],
  };
};

export const transformReducer = (state: ITransformState, action: TransformActions) => {
  if (action.type === TransformActionTypes.GET_ALL_SCRIPTS) {
    return {
      scripts: [...state.scripts, ...action.payload.scripts],
    };
  } else if (action.type === TransformActionTypes.ADD_SCRIPT) {
    return {
      scripts: [...state.scripts, action.payload.script],
    };
  } else if (action.type === TransformActionTypes.UPDATE_SCRIPT) {
    let newScripts = [...state.scripts];
    const index = newScripts.findIndex(script => script.id === action.payload.script.id);
    newScripts[index] = action.payload.script;
    return {
      scripts: newScripts,
    };
  } else if (action.type === TransformActionTypes.DELETE_SCRIPT) {
    return {
      scripts: state.scripts.filter(script => script.id !== action.payload.scriptId),
    };
  }

  return state;
};
