import { MenuItem, Select, Typography } from "@material-ui/core";
import TeamLogo from "parts/TeamLogo";
import { useSelector } from "react-redux";
import { getEnglishDateWithTime } from "utils/helpers/time";

const GameSelector = () => {
  const { results: games = [] } = useSelector(state => state.games);

  return (
    <Select>
      {games.map(item =>
        <MenuItem>
          <Typography color='textSecondary'>
            {getEnglishDateWithTime(item.date)}
          </Typography>
          <TeamLogo team={item.visitorTeam.abbreviation} />
          <Typography>
            {item.visitorTeam.name}
          </Typography>
          <Typography>@</Typography>
          <TeamLogo team={item.homeTeam.abbreviation} />
          <Typography>
            {item.homeTeam.name}
          </Typography>
        </MenuItem>
      )}
    </Select>
  )
};

export default GameSelector;
