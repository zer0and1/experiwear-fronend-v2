import { IconButton, makeStyles } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  root: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  button: {
    width: '56%',
    height: '56%',
    fontFamily: theme.custom.fonts.SFProTextMedium,
    fontSize: 20,
    fontWeight: 500,
    color: '#333',
    textAlign: 'center',
    borderRadius: '38%',
  },
  selected: {
    backgroundColor: theme.palette.info.main,
    color: '#fff',
    '&:hover': {
      color: '#333',
    },
  },
}));

const CalendarCell = ({ day, selected }) => {
  const classes = useStyles();

  return (
    <td className={classes.root}>
      <IconButton className={clsx(classes.button, { [classes.selected]: selected })}>
        {day}
      </IconButton>
    </td>
  );
};

export default CalendarCell;