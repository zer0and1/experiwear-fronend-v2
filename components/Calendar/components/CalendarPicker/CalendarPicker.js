import { Box, IconButton, makeStyles } from "@material-ui/core";
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@material-ui/icons";
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2.5),
  },
  arrowButton: {
    margin: -12,
  },
  label: {
    fontFamily: theme.custom.fonts.SFProDisplayBlackItalic,
    fontSize: 16,
    fontWeight: 900,
    color: theme.palette.info.main,
    letterSpacing: 0.48,
    padding: theme.spacing(0, 0.5),
    minWidth: 147,
    textAlign: 'center',
  },
}));

const CalendarPicker = ({ year, month, onChange }) => {
  const classes = useStyles();

  const handleArrowBackClick = () => {
    if (month === 1) {
      onChange(year - 1, 12);
    } else {
      onChange(year, month - 1);
    }
  };

  const handleArrowForwardClick = () => {
    if (month === 12) {
      onChange(year + 1, 1);
    } else {
      onChange(year, month + 1);
    }
  };

  return (
    <Box className={classes.root}>
      <IconButton className={classes.arrowButton} onClick={handleArrowBackClick}>
        <ArrowBackIosOutlined />
      </IconButton>
      <Box className={classes.label}>
        {`${moment.months(month - 1)} ${year}`}
      </Box>
      <IconButton className={classes.arrowButton} onClick={handleArrowForwardClick}>
        <ArrowForwardIosOutlined />
      </IconButton>
    </Box>
  )
};

export default CalendarPicker;