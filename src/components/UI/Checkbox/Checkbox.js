import { FormControlLabel, Checkbox, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  label: {
    color: '#333',
    fontFamily: theme.custom.fonts.SFUITextRegular,
    fontSize: 16,
  },
  checkbox: ({ color, size = '1.5rem' }) => ({
    color: theme.palette[color].main,
    fontSize: size,
    '&.Mui-checked': {
      color: theme.palette[color].light,
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
      control={
        <Checkbox
          {...props}
          classes={{ root: classes.checkbox }}
          color="default"
        />
      }
      label={props.label}
      classes={{ label: classes.label }}
    />
  );
};

export default CheckBox;
