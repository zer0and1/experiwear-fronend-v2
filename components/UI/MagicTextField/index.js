
import React, { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Typography,
  TextField
} from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100%'
  },
  container: {
    width: '100%'
  },
  textField: {
    width: '100%',
  },
  input: {
    color: theme.custom.palette.lightBlack,
    fontSize: 16,
    fontFamily: 'roboto, sans-serif',
    lineHeight: 'normal',
    padding: theme.spacing(1),
    '&::placeholder': {
      lineHeight: 'normal',
      color: theme.palette.text.secondary
    },
    '&:-ms-input-placeholder': {
      lineHeight: 'normal',
      color: theme.palette.text.secondary
    },
    '&::-ms-input-placeholder': {
      lineHeight: 'normal',
      color: theme.palette.text.secondary
    }
  },
  multiline: {
    padding: 0
  },
  notchedOutline: {
    border: 'none'
  },
  errorInput: {
    border: `1px solid ${theme.palette.danger.main}`
  },
  label: (props) => ({
    fontSize: 16,
    width: props.labelWidth,
    textAlign: 'end',
    paddingRight: theme.spacing(1),
    margin: theme.spacing(0.75, 0)
  }),
  error: {
    fontSize: 14
  },
}));

const MagicTextField = React.forwardRef(({
  label,
  labelWidth = 150,
  type = 'text',
  error,
  className,
  ...rest
}, ref) => {

  const classes = useStyles({ labelWidth });

  return (
    <div className={clsx(classes.root, className)}>
      <div className={classes.container}>
        <TextField
          inputRef={ref}
          type={type}
          label={label}
          error={!!error}
          className={clsx(
            'form-control form-control-lg',
            classes.textField
          )}
          {...rest}
        />
        {
          !!error &&
          <Typography
            color='error'
            variant='subtitle2'
            className={classes.error}
          >
            {error}
          </Typography>
        }
      </div>
    </div>
  );
});

export default memo(MagicTextField);