
import * as TYPES from 'actions/types'
import LINKS from 'utils/constants/links';

const initialState = {
  pathTokens: [
    { path: '/', label: 'Experiwear' },
    { path: LINKS.HOME.HREF, label: 'Home' },
    { path: '', label: 'Jun 18, 2021, 2:00 AM'},
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
