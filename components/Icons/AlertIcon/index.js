
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SvgIcon from '@material-ui/core/SvgIcon'
import clsx from 'clsx'

const useStyles = makeStyles(() => ({
  root: {
    width: 20
  }
}));

const AlertIcon = ({
  isActive = false,
  className,
  viewBox,
  ...rest
}) => {
  const classes = useStyles();
  const color = isActive ? '#01a1c3' : '#606060';

  return (
    <SvgIcon viewBox={viewBox || '0 0 16 16'} {...rest} className={clsx(classes.root, className)}>
      <g transform="translate(0 -1)" fill="none" fill-rule="evenodd" stroke={color}>
        <path d="M8 17A8 8 0 1 1 8 1a8 8 0 0 1 0 16zm0-1.6A6.4 6.4 0 1 0 8 2.6a6.4 6.4 0 0 0 0 12.8zM8 5a.8.8 0 0 1 .8.8v4a.8.8 0 1 1-1.6 0v-4A.8.8 0 0 1 8 5zm0 8a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6z" fill="#000" fill-rule="nonzero" />
      </g>
    </SvgIcon>
  )
}

export default memo(AlertIcon);
