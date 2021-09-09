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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    '& .MuiSelect-select:focus': {
      backgroundColor: 'unset',
    }
  },
}));

const GameSelector = () => {
  const classes = useStyles();
  const { results: games = [] } = useSelector(state => state.games);
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <Select
      variant="outlined"
      displayEmpty
      className={classes.root}
      value={selectedGame}
      onChange={e => setSelectedGame(e.target.value)}
    >
      <MenuItem value={null} disabled>
        Select Gameday
      </MenuItem>
      {games.map(item =>
        <MenuItem key={item.id} value={item.id}>
          
          <TeamLogo team={item.visitorTeam.abbreviation} />
          <Typography>
            {item.visitorTeam.name}
          </Typography>
          <Box px={1} color="#01a1c3">@</Box>
          <TeamLogo team={item.homeTeam.abbreviation} />
          <Typography>
            {item.homeTeam.name}
          </Typography>
          <Typography color='textSecondary'>
            &nbsp;({getEnglishDateWithTime(item.date)})
          </Typography>
        </MenuItem>
      )}
    </Select>
  )
};

export default GameSelector;
