import { Box, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { getEnglishDate, getEnglishTime } from 'utils/helpers/time';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    textAlign: 'left',
    textTransform: 'none',
  },
  icon: {
    marginRight: theme.spacing(1.5),
    objectFit: 'cover',
    width: 46,
    height: 46,
    borderRadius: 6,
  },
  title: {
    fontFamily: theme.custom.fonts.SFUITextMedium,
    fontSize: 14,
    color: '#333',
    textTransform: 'capitalize',
  },
  description: {
    fontSize: 12,
    color: '#333',
  },
}));

const AlertItem = ({
  data: { imageUrl, type, title, createdAt },
  ...boxProps
}) => {
  const classes = useStyles();

  return (
    <Box {...boxProps} className={clsx(classes.root, boxProps.className)}>
      <img className={classes.icon} src={imageUrl} />
      <div>
        <Typography className={classes.title}>{`${type} alert`}</Typography>
        <Typography className={classes.description}>{title}</Typography>
        <Typography className={classes.description}>
          {`${getEnglishDate(createdAt)} @ ${getEnglishTime(createdAt)}`}
        </Typography>
      </div>
    </Box>
  );
};

export default AlertItem;
