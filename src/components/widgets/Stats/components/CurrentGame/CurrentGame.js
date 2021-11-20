import { memo } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { TeamLogo } from 'components';
import { useSelector } from 'react-redux';
import { getEnglishDateWithTime } from 'utils/helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 210,
  },
  button: {
    borderRadius: theme.spacing(3),
    height: theme.spacing(6),
    marginTop: theme.spacing(2),
  },
  teamName: {
    fontFamily: theme.custom.fonts.SFProTextMedium,
    fontSize: 14,
    letterSpacing: 0.28,
    color: '#000',
  },
  vs: {
    color: theme.palette.info.main,
    fontFamily: theme.custom.fonts.SFProTextMedium,
    fontSize: 18,
  },
}));

const CurrentGame = () => {
  const classes = useStyles();
  const selectedGame = useSelector((state) => state.games.selectedGame);

  return (
    <Card className={classes.root}>
      <CardHeader
        title="Current Game"
        subheader={
          selectedGame ? getEnglishDateWithTime(selectedGame.date) : ''
        }
      />
      <CardContent className={classes.content}>
        {selectedGame ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center">
              <TeamLogo
                size={80}
                team={selectedGame.visitorTeam.abbreviation}
              />
              <Typography className={classes.teamName}>
                {selectedGame.visitorTeam.name}
              </Typography>
            </Box>
            <Typography className={classes.vs}>VS</Typography>
            <Box display="flex" alignItems="center">
              <TeamLogo size={80} team={selectedGame.homeTeam.abbreviation} />
              <Typography className={classes.teamName}>
                {selectedGame.homeTeam.name}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
            fullWidth
          >
            Select Gameday
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default memo(CurrentGame);
