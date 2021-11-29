import * as TYPES from 'redux/action-types';

const initialState = {
  isAuthenticated: false,
  currentUser: {},
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.SET_IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
}
