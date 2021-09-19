import { Box, IconButton, makeStyles } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  root: ({ minimized }) => ({
    width: minimized ? 54 : theme.spacing(12),
    height: minimized ? 52 : theme.spacing(12),
  }),
  button: ({ minimized }) => ({
    width: minimized ? 32 : 53,
    height: minimized ? 32 : 53,
    fontFamily: theme.custom.fonts.SFUITextMedium,
    fontSize: minimized ? 14 : 20,
    fontWeight: 500,
    color: '#333',
    textAlign: 'center',
    borderRadius: '38%',
  }),
  selected: {
    backgroundColor: theme.palette.info.main,
    color: '#fff !important',
    '&:hover': {
      backgroundColor: theme.palette.info.main,
    },
  },
  infoSection: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  infoBox: ({ minimized }) => ({
    width: 0,
    height: minimized ? 4 : 7,
    borderRadius: '50%',
    background: 'none',
  }),
  infoBoxActive: ({ minimized }) => ({
    width: minimized ? 4 : 7,
    margin: '0 2px',
  }),
  news: {
    backgroundColor: `${theme.palette.news.main} !important`,
  },
  survey: {
    backgroundColor: `${theme.palette.survey.main} !important`,
  },
  score: {
    backgroundColor: `${theme.palette.score.main} !important`,
  },
  promo: {
    backgroundColor: `${theme.palette.promo.main} !important`,
  },
}));

const CalendarCell = ({ day, selected, data = {}, onSelect, minimized }) => {
  const classes = useStyles({ minimized });
  const { news, survey, score, promo } = data;

  const handleClick = () => {
    onSelect(day);
  };

  return (
    <td className={classes.root}>
      {day && (
        <Box display="flex" alignItems="center" justifyContent="space-between" flexDirection="column" width="100%" height="80%">
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <IconButton className={clsx(classes.button, { [classes.selected]: selected })} onClick={handleClick}>
              {day}
            </IconButton>
          </Box>
          <Box className={classes.infoSection}>
            <Box className={clsx(classes.infoBox, { [classes.news]: news, [classes.infoBoxActive]: news })} />
            <Box className={clsx(classes.infoBox, { [classes.survey]: survey, [classes.infoBoxActive]: survey })} />
            <Box className={clsx(classes.infoBox, { [classes.score]: score, [classes.infoBoxActive]: score })} />
            <Box className={clsx(classes.infoBox, { [classes.promo]: promo, [classes.infoBoxActive]: promo })} />
          </Box>
        </Box>
      )}
    </td>
  );
};

export default CalendarCell;