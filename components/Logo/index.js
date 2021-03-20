
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import { LOGO_IMAGE_PATH } from 'utils/constants/image-paths'

const useStyles = makeStyles(() => ({
  picture: {
    display: 'flex',
  },
  img: props => ({
    width: props.width,
    objectFit: 'contain'
  })
}));

const Logo = ({
  width = 166,
  className,
  ...rest
}) => {
  const classes = useStyles({ width });

  return (
    <picture className={clsx(classes.picture, className)} {...rest}>
      <source srcSet={LOGO_IMAGE_PATH} />
      <img
        className={classes.img}
        src={LOGO_IMAGE_PATH}
        alt='logo' />
    </picture>
  )
}

export default memo(Logo);
