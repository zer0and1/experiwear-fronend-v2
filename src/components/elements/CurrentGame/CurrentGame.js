import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Box, Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import TeamLogo from 'components/parts/TeamLogo';
import { getEnglishDateWithTime } from 'utils/helpers/time';

const useStyles = makeStyles((theme) => ({
  root: {},
  date: {
    fontFamily: theme.custom.fonts.SFProDisplayBlackItalic,
    fontSize: 16,
    fontWeight: 900,
    letterSpacing: 0.48,
    color: theme.palette.info.main,
  },
  teamName: {
    marginLeft: 14,
    fontFamily: theme.custom.fonts.SFProTextMedium,
    fontSize: 14,
    letterSpacing: 0.28,
    color: '#000',
  },
  score: {
    fontFamily: theme.custom.fonts.SFProTextMedium,
    fontSize: 14,
    letterSpacing: 0.28,
    color: '#000',
  },
}));

const CurrentGame = () => {
  const classes = useStyles();
  const selectedGame = useSelector((state) => state.games.selectedGame);

  return (
    selectedGame && (
      <div className={classes.root}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb="19px"
        >
          <Typography className={classes.date}>
            {getEnglishDateWithTime(selectedGame.date)}
          </Typography>
          <Link component="button" variant="body2">
            More info
          </Link>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb="26px"
        >
          <Box display="flex" alignItems="center">
            <TeamLogo size={28} team={selectedGame.visitorTeam.abbreviation} />
            <Typography className={classes.teamName}>
              {selectedGame.visitorTeam.name}
            </Typography>
          </Box>
          <Typography color="textPrimary" className={classes.score}>
            {selectedGame.visitorTeamScore}
          </Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb="26px"
        >
          <Box display="flex" alignItems="center">
            <TeamLogo size={28} team={selectedGame.homeTeam.abbreviation} />
            <Typography className={classes.teamName}>
              {selectedGame.homeTeam.name}
            </Typography>
          </Box>
          <Typography color="textPrimary" className={classes.score}>
            {selectedGame.homeTeamScore}
          </Typography>
        </Box>
      </div>
    )
  );
};

export default memo(CurrentGame);
