export const INITIAL_MAIN_STATE = {
  fanbands: {
    resutls: [],
    take: 0,
    total: 0,
    statistics: {},
  },
  tickets: {
    results: [],
    take: 0,
    total: 0,
  },
};

export const setTicketsUpdater = (state, { payload }) => ({
  ...state,
  tickets: {
    ...state.tickets,
    ...payload,
  },
});
