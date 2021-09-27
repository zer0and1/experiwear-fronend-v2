import { FormControlLabel, Checkbox, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  label: {
    color: '#333',
    fontFamily: theme.custom.fonts.SFUITextMedium,
    fontSize: 16,
  },
  checkbox: ({ color }) => ({
    color: theme.palette[color].main,
    fontSize: '2rem',
    '&.Mui-checked': {
      color: theme.palette[color].dark,
    },
    '& .MuiSvgIcon-root': {
      fontSize: 'inherit',
    },
  }),
}));

const CheckBox = (props) => {
  const classes = useStyles(props);

  return (
    <FormControlLabel
      control={<Checkbox {...props} classes={{ root: classes.checkbox }} />}
      label={props.label}
      classes={{ label: classes.label }}
    />
  );
};

export default CheckBox;