import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { ProjectState, projectReducer } from '../../projects/state';
import { TransformState, transformReducer } from '../../transforms/state';
import { TransformService } from '../../transforms/domain';
import { UserState, userReducer } from '../../users/state';

export type AppState = {
  readonly project: ProjectState;
  readonly transform: TransformState;
  readonly user: UserState;
};

const builtInScripts = TransformService.getBuiltInScripts();

const initialState: AppState = {
  project: {
    projects: [],
    selectedProject: undefined,
    selectedProjectJson: '',
    sourceProject: undefined,
    isImportInProgress: false,
    importError: undefined,
  },
  transform: {
    scripts: builtInScripts,
    selectedScript: builtInScripts[0],
    scriptText: builtInScripts[0].script,
    isInProgress: false,
    error: undefined,
    transformedProjects: [],
    transformError: undefined,
    isTransformRunning: false,
  },
  user: {
    loggedInUser: undefined,
    isInProgress: false,
    error: undefined,
  },
};

const rootReducer = combineReducers({
  project: projectReducer,
  transform: transformReducer,
  user: userReducer,
});

export const configureStore = (state: any = initialState) => {
  return createStore(rootReducer, state, applyMiddleware(thunkMiddleware));
};
