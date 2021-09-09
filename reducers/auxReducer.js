
import * as TYPES from 'actions/types'

const initialState = {
  pathTokens: [
    { path: '', label: 'Experiwear' },
    { path: '', label: 'Home' },
  ],
};

export default function auxReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.SET_PATH_TOKENS:
      return { ...state, pathTokens: action.payload };
    default:
      return state;
  }
};
