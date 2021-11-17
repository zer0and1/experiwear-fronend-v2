import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';

import ButtonLink from 'components/UI/Buttons/ButtonLink';

const useStyles = makeStyles((theme) => ({
  root: (props) => ({
    fontSize: 16,
    fontWeight: 'bold',
    height: 42,
    borderRadius: theme.spacing(1),
    backgroundColor: theme.custom.palette[props.color],
    padding: theme.spacing(0, 3),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0, 2),
    },
    '&:hover': {
      backgroundColor: theme.custom.palette[props.color],
      opacity: 0.8,
    },
  }),
}));

const ContainedButton = React.forwardRef(
  (
    {
      color = 'black',
      href,
      loading,
      disabled,
      classes: propClasses = {},
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const classes = useStyles({ color });

    return (
      <Button
        ref={ref}
        href={href}
        disabled={loading || disabled}
        component={href ? ButtonLink : 'button'}
        color="primary"
        variant="contained"
        className={clsx(className, classes.root)}
        classes={{
          ...propClasses,
          disabled: classes.disabled,
        }}
        {...rest}
      >
        {children}
      </Button>
    );
  }
);

export default memo(ContainedButton);
