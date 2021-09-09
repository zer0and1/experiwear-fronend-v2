
import * as TYPES from 'actions/types'

const INITIAL_STATE = Object.freeze({
  results: [{ "id": "60a849834b8d810048203d6c", "gameId": 9396, "identifier": "11da32d78aec7661cf6ff33e50f16b66", "seasonYear": 2020, "date": "2021-06-04T00:00:00.000Z", "startTime": "2021-06-04T00:00:00.000Z", "currentPeriod": "0/4", "seasonStage": 4, "statusShortGame": 1, "statusGame": "Scheduled", "homeTeam": { "teamId": 41, "abbreviation": "WAS", "fullName": "Washington Wizards", "name": "Wizards" }, "visitorTeam": { "teamId": 27, "abbreviation": "PHI", "fullName": "Philadelphia 76ers", "name": "76ers" } }, { "id": "60a849824b8d810048203d68", "gameId": 9395, "identifier": "e3ce4c6f4fa134eaaedc3755d22cfc32", "seasonYear": 2020, "date": "2021-06-02T00:00:00.000Z", "startTime": "2021-06-02T00:00:00.000Z", "currentPeriod": "0/4", "seasonStage": 4, "statusShortGame": 1, "statusGame": "Scheduled", "homeTeam": { "teamId": 27, "abbreviation": "PHI", "fullName": "Philadelphia 76ers", "name": "76ers" }, "visitorTeam": { "teamId": 41, "abbreviation": "WAS", "fullName": "Washington Wizards", "name": "Wizards" } }, { "id": "60bc10054b8d810048203daf", "gameId": 9405, "identifier": "00a8b6e096e6433150d3b3749a49f1a7", "seasonYear": 2020, "date": "2021-05-31T23:00:00.000Z", "startTime": "2021-05-31T23:00:00.000Z", "endTime": "2021-06-01T02:01:00.000Z", "city": "Washington", "country": "USA", "gameDuration": "2:43", "currentPeriod": "4/4", "seasonStage": 4, "statusShortGame": 3, "statusGame": "Finished", "homeTeamScore": 122, "visitorTeamScore": 114, "homeTeam": { "teamId": 41, "abbreviation": "WAS", "fullName": "Washington Wizards", "name": "Wizards" }, "visitorTeam": { "teamId": 27, "abbreviation": "PHI", "fullName": "Philadelphia 76ers", "name": "76ers" } }, { "id": "60a849834b8d810048203d6d", "gameId": 9394, "identifier": "706de71c549e98266d06e2a62d35b9d5", "seasonYear": 2020, "date": "2021-05-31T00:00:00.000Z", "startTime": "2021-05-31T00:00:00.000Z", "currentPeriod": "0/4", "seasonStage": 4, "statusShortGame": 1, "statusGame": "Scheduled", "homeTeam": { "teamId": 41, "abbreviation": "WAS", "fullName": "Washington Wizards", "name": "Wizards" }, "visitorTeam": { "teamId": 27, "abbreviation": "PHI", "fullName": "Philadelphia 76ers", "name": "76ers" } }],
  select: {},
  closestUpcoming: {}
});

const gamesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.FETCH_GAMES:
      return { ...state, results: action.payload };
    case TYPES.SET_SELECT_GAME:
      return { ...state, select: action.payload };
    case TYPES.SET_CLOSEST_UPCOMING_GAME:
      return { ...state, closestUpcoming: action.payload };
    default:
      return state;
  }
};

export default gamesReducer;
