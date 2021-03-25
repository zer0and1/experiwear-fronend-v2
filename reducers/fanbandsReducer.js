
import * as TYPES from 'actions/types'

const INITIAL_STATE = Object.freeze({
  statistics: {}
});

const fanbandsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.FETCH_FANBANDS_STATISTICS:
      return { ...state, statistics: action.payload };
    default:
      return state;
  }
};

export default fanbandsReducer;
