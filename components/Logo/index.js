
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import * as COMMON_CONSTANTS from 'utils/constants/common'
import { LOGO_IMAGE_PATH } from 'utils/constants/image-paths'

const useStyles = makeStyles(() => ({
  picture: {
    display: 'flex',
    justifyContent: 'center',
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
    <a aria-label='logo' href={COMMON_CONSTANTS.EXPERIWEAR_URL} target='_blank' rel='noreferrer'>
      <picture className={clsx(classes.picture, className)} {...rest}>
        <source srcSet={LOGO_IMAGE_PATH} />
        <img
          className={classes.img}
          src={LOGO_IMAGE_PATH}
          alt='logo' />
      </picture>
    </a>
  )
}

export default memo(Logo);
