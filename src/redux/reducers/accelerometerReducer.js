import * as TYPES from 'redux/actions/types';

const INITIAL_STATE = Object.freeze({
  accelerometerData: {
    results: [],
    total: 0,
  },
});

const accelerometerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.SET_ACC_NOTIFICATION:
      return { ...state, notification: action.payload };
    case TYPES.SET_ACC_DATA:
      return { ...state, accelerometerData: action.payload };
    default:
      return state;
  }
};

export default accelerometerReducer;
