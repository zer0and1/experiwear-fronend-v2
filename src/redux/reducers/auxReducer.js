import * as TYPES from 'redux/actions/types';

const INITIAL_STATE = {
  pathTokens: [],
  loadingStatus: false,
};

export default function auxReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TYPES.SET_PATH_TOKENS:
      return {
        ...state,
        pathTokens: [{ path: '/', title: 'Experiwear' }, ...action.payload],
      };
    case TYPES.SET_LOADING_STATUS:
      return {
        ...state,
        loadingStatus: action.payload,
      };
    default:
      return state;
  }
}
