import * as TYPES from 'redux/actions/types';

const initialState = {
  sideDrawer: true,
};

export default function sideDrawerReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.SET_SIDE_DRAWER:
      return {
        ...state,
        sideDrawer: action.payload,
      };
    default:
      return state;
  }
}
