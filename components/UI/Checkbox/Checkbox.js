import { FormControlLabel, Checkbox } from "@material-ui/core";

const CheckBox = (...props) => {
  return (
    <FormControlLabel
      control={<Checkbox {...props} />}
      label={props.label}
    />
  );
};

export default CheckBox;