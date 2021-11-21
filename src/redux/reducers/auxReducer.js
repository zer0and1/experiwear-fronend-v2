import * as TYPES from 'redux/actions/types';

const initialState = {
  pathTokens: [],
};

export default function auxReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.SET_PATH_TOKENS:
      return {
        ...state,
        pathTokens: [{ path: '/', title: 'Experiwear' }, ...action.payload],
      };
    default:
      return state;
  }
}
