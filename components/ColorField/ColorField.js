import { Box, Button, fade, makeStyles } from "@material-ui/core";
import { ColorPicker } from "material-ui-color";
import { useCallback, useState } from "react";

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    marginBottom: theme.spacing(2),
    '&>div': {
      top: '4px',
      left: 'calc(50% - 18px)',
      position: 'absolute',
      visibility: 'hidden',
    },
  },
  button: ({ color }) => ({
    backgroundColor: color,
    color: theme.palette.getContrastText(color),
    borderRadius: 5,
    fontFamily: theme.custom.fonts.SFUITextRegular,
    fontSize: 12,
    height: 35,
    '&:hover': {
      backgroundColor: fade(color, 0.6),
    },
  }),
}));

const ColorField = ({ label, name = 'color_field', value = '#fff', onChange }) => {
  const classes = useStyles({ color: value });
  const [pickerToggled, togglePicker] = useState(false);
  const handleTogglePicker = useCallback(() => togglePicker(true), []);
  const handleColorChange = useCallback((val) => onChange({ target: { name, value: `#${val.hex}` } }), [name, onChange]);
  const handleClosePicker = useCallback((open) => togglePicker(open), []);

  return (
    <Box className={classes.root}>
      <Button onClick={handleTogglePicker} className={classes.button}>
        {label}
      </Button>
      {pickerToggled && (
        <ColorPicker openAtStart hideTextfield value={value} onChange={handleColorChange} onOpen={handleClosePicker} />
      )}
    </Box>
  )
};

export default ColorField;