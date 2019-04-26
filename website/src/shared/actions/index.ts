export const createAction = <T>(type: string, payload?: T, error?: Error) => {
  return {
    type,
    payload,
    errorMessage: error ? error.message : undefined,
  };
};
