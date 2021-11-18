import * as TYPES from './types';

const setSideDrawer = (sideDrawer) => {
  return {
    type: TYPES.SET_SIDE_DRAWER,
    payload: sideDrawer,
  };
};

export { setSideDrawer };
