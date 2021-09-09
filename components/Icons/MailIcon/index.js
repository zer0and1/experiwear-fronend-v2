
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SvgIcon from '@material-ui/core/SvgIcon'
import clsx from 'clsx'

const useStyles = makeStyles(() => ({
  root: {
    width: 18
  }
}));

const MailIcon = ({
  isActive = false,
  className,
  viewBox,
  ...rest
}) => {
  const classes = useStyles();
  const color = isActive ? '#01a1c3' : '#9ea3ba';

  return (
    <SvgIcon viewBox={viewBox || '0 0 18 17'} {...rest} className={clsx(classes.root, className)}>
      <g transform="translate(0 -1)" fill="none" stroke="none">
        <path d="m1.862 6.456 5.614 5.003a.8.8 0 0 0 1.064 0l5.607-4.997-5.71-3.732a.8.8 0 0 0-.875 0l-5.7 3.726zm12.538.172V8.38l-4.795 4.273a2.4 2.4 0 0 1-3.194 0L1.6 8.365V6.628v8.734h12.8V6.628zM.725 5.288l5.962-3.897a2.4 2.4 0 0 1 2.626 0l5.962 3.897c.452.296.725.8.725 1.34v8.734a1.6 1.6 0 0 1-1.6 1.6H1.6a1.6 1.6 0 0 1-1.6-1.6V6.628a1.6 1.6 0 0 1 .725-1.34z" fill={color} fill-rule="nonzero" />
      </g>
    </SvgIcon>
  )
}

export default memo(MailIcon);
