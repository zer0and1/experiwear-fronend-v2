import { Box, makeStyles, MenuItem, Select, Typography } from "@material-ui/core";
import TeamLogo from "parts/TeamLogo";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getEnglishDateWithTime } from "utils/helpers/time";

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 320,
    height: 48,
    backgroundColor: '#fff',
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '& .MuiSelect-selectMenu': {
      fontFamily: 'SFUIText-Regular',
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
    fontFamily: 'SFProText-Medium',
    fontSize: 14,
    fontWeight: 500,
    color: '#000',
  },
}));

const GameSelector = () => {
  const classes = useStyles();
  const { results: games = [] } = useSelector(state => state.games);
  const [selectedGame, setSelectedGame] = useState('');

  return (
    <Select
      variant="outlined"
      displayEmpty
      className={classes.root}
      value={selectedGame}
      onChange={e => setSelectedGame(e.target.value)}
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
