export const INITIAL_MAIN_STATE = {
  fanbands: {
    results: [],
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

export const setFanbandsUpdater = (state, { payload }) => ({
  ...state,
  fanbands: {
    ...state.fanbands,
    ...payload,
  },
});

export const setFanbandsStatisticsUpdater = (state, { payload }) => ({
  ...state,
  fanbands: {
    ...state.fanbands,
    statistics: payload,
  },
});
