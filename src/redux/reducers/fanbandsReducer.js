import * as TYPES from 'redux/action-types';

const INITIAL_STATE = Object.freeze({
  statistics: {},
  results: [],
  take: 0,
  total: 0,
});

const fanbandsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.FETCH_FANBANDS_STATISTICS:
      return { ...state, statistics: action.payload };
    case TYPES.UPDATE_FANBANDS_STATISTICS:
      return {
        ...state,
        statistics: {
          ...state.statistics,
          ...action.payload,
        },
      };
    case TYPES.SET_FANBANDS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default fanbandsReducer;
