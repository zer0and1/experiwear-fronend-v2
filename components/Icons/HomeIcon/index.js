
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SvgIcon from '@material-ui/core/SvgIcon'
import clsx from 'clsx'

const useStyles = makeStyles(() => ({
  root: {
    width: 16
  }
}));

const HomeIcon = ({
  isActive = false,
  className,
  viewBox,
  ...rest
}) => {
  const classes = useStyles();
  const color = isActive ? '#01a1c3' : '#606060';

  return (
    <SvgIcon viewBox={viewBox || '0 0 16 16'} {...rest} className={clsx(classes.root, className)}>
     <g transform="translate(-39 -178)" fill="none" fill-rule="evenodd" stroke={color}>
        <path d="M53.4 192.373v-8.841l-6.4-3.905-6.4 3.905v8.841h3.2v-2.237c0-1.797 1.433-3.254 3.2-3.254 1.767 0 3.2 1.457 3.2 3.254v2.237h3.2zM48.6 194v-3.864c0-.899-.716-1.627-1.6-1.627-.884 0-1.6.728-1.6 1.627V194h-4.8c-.884 0-1.6-.728-1.6-1.627v-8.841c0-.572.295-1.101.777-1.395l6.4-3.905c.506-.31 1.14-.31 1.646 0l6.4 3.905c.482.294.777.823.777 1.395v8.841c0 .899-.716 1.627-1.6 1.627h-4.8z" fill="#000" fill-rule="nonzero" />
      </g>
    </SvgIcon>
  )
}

export default memo(HomeIcon);
