import { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import LinkButton from 'components/UI/Buttons/LinkButton'
import LINKS from 'utils/constants/links'
import { ALERT_IMAGE_PLACEHOLDER_IMAGE_PATH } from 'utils/constants/image-paths'
import getLatestNewsNotifications from 'actions/getLatestNewsNotifications'
import { isEmpty } from 'utils/helpers/utility'
import { useCommonStyles } from 'styles/use-styles'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  carousel: {
    position: 'relative',
    width: '100%',
  },
  image: {
    width: '100%',
    height: 320,
    objectFit: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    height: '100%',
    background: 'linear-gradient(0deg, rgba(73,73,73,0.55) 0%, rgba(100,100,100,0.20) 100%)',
    width: '100%',
  },
  container: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: theme.spacing(2),
    bottom: theme.spacing(3)
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 1,
    WebkitLineClamp: 1,
    color: theme.custom.palette.white,
    marginBottom: theme.spacing(1)
  },
  text: {
    fontSize: 14,
    lineHeight: 1,
    WebkitLineClamp: 3,
    color: theme.custom.palette.white,
  },
  addButton: {
    position: 'absolute',
    top: 10,
    right: 12,
    fontSize: 14,
    color: theme.custom.palette.white,
    textDecoration: 'underline'
  }
}));

const AlertCarousel = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const dispatch = useDispatch();

  const { latestNews = [] } = useSelector(state => state.notifications)

  useEffect(() => {
    dispatch(getLatestNewsNotifications())
  }, [dispatch])

  return (
    <Card>
      <Carousel
        infiniteLoop
        autoPlay={true}
        interval={3000}
        showStatus={false}
        showThumbs={false}
        showArrows={false}
        showIndicators={true}
        className={classes.carousel}
      >
        {
          !isEmpty(latestNews) &&
          latestNews.map((item, index) =>
            <div key={index}>
              <img
                alt='carousel'
                src={item.imageUrl || ALERT_IMAGE_PLACEHOLDER_IMAGE_PATH}
                className={classes.image}
              />
              <div className={classes.overlay}>
                <div className={classes.container}>
                  <Typography className={clsx(commonClasses.breakWords, classes.title)}>
                    {item.title}
                  </Typography>
                  <Typography className={clsx(commonClasses.breakWords, classes.text)}>
                    {item.body}
                  </Typography>
                </div>
                <LinkButton
                  href={LINKS.NEWS.HREF}
                  className={classes.addButton}
                >
                  + Create News Alert
                </LinkButton>
              </div>

            </div>
          )
        }
      </Carousel>
    </Card>
  );
};

export default  memo(AlertCarousel);
