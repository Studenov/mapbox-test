type Actions = {
  type: string,
  payload: object
}

type Handlers = {
  [key: string]: Function
}

export function createReducer(initialState: object, handlers: Handlers) {
  return (state = initialState, action: Actions) => {
    const handler = handlers[action.type];
    if (!handler) {
      return state;
    }
    return handler({ ...state }, { ...action.payload });
  };
}
