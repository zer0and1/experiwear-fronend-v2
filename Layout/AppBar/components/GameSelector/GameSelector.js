import { Box, makeStyles, MenuItem, Select } from "@material-ui/core";
import { setSelectedGame } from "actions/games";
import { useDispatch, useSelector } from "react-redux";
import { getEnglishDateWithTime } from "utils/helpers/time";
import TeamLogo from "parts/TeamLogo";
import LINKS from "utils/constants/links";
import { useRouter } from "next/router";

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 387,
    height: 48,
    backgroundColor: '#fff',
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '& .MuiSelect-selectMenu': {
      fontFamily: theme.custom.fonts.SFUITextRegular,
      fontSize: 14,
      color: theme.custom.palette.textGrey,
    },
    '& .MuiSelect-select:focus': {
      backgroundColor: 'unset',
    }
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontFamily: theme.custom.fonts.SFProTextMedium,
    fontSize: 14,
    fontWeight: 500,
    color: '#000',
  },
}));

const GameSelector = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const { results: games = [], selectedGame } = useSelector(state => state.games);
  const { pathTokens } = useSelector(state => state.aux);

  const handleGameSelect = (e) => {
    dispatch(setSelectedGame(e.target.value));

    switch (pathTokens[1].path) {
      case LINKS.HOME.HREF:
        router.push(LINKS.SELECTED_GAME.HREF);
        break;
      default:
        break;
    }
  };

  return (
    <Select
      variant="outlined"
      displayEmpty
      className={classes.root}
      value={selectedGame}
      onChange={handleGameSelect}
    >
      <MenuItem value="" disabled>
        Select Gameday
      </MenuItem>
      {games.map(item =>
        <MenuItem key={item.id} value={item.id}>
          <Box className={classes.menuItem}>
            <TeamLogo team={item.visitorTeam.abbreviation} />
            <Box>
              {item.visitorTeam.name}
            </Box>
            <Box px={1} color="#01a1c3">@</Box>
            <TeamLogo team={item.homeTeam.abbreviation} />
            <Box>
              {item.homeTeam.name}
            </Box>
            <Box color='textSecondary'>
              &nbsp;({getEnglishDateWithTime(item.date)})
            </Box>
          </Box>
        </MenuItem>
      )}
    </Select>
  )
};

export default GameSelector;
