export const createAction = <T>(type: string, payload?: T) => {
  return {
    type,
    payload,
  };
};

type FuncMap<TState, TActions> = {
  [key: string]: (state: TState, action: TActions) => TState;
};

export const createReducer = <TActions extends { type: string }, TState>(
  initialState: TState,
  funcMap: FuncMap<TState, TActions>
) => {
  return (state = initialState, action: TActions) => {
    return funcMap[action.type] ? funcMap[action.type](state, action) : state;
  };
};
