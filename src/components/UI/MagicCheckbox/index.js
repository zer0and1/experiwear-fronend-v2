import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import clsx from 'clsx';

import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked';

RadioButtonUnchecked;
const useStyles = makeStyles((theme) => ({
  checkbox: {
    padding: 0,
    marginRight: theme.spacing(0.75),
  },
  checkedIcon: {
    color: theme.custom.palette.purple,
  },
}));

const MagicCheckbox = React.forwardRef(({ className, ...rest }, ref) => {
  const classes = useStyles();

  return (
    <Checkbox
      {...rest}
      icon={<RadioButtonUnchecked />}
      checkedIcon={<RadioButtonChecked className={classes.checkedIcon} />}
      className={clsx(classes.checkbox, className)}
      inputProps={{
        'aria-label': 'primary checkbox',
      }}
      inputRef={ref}
    />
  );
});

export default memo(MagicCheckbox);
