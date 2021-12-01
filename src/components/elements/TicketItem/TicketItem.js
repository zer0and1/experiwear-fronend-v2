import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { TicketIcon } from 'components';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    textAlign: 'left',
    textTransform: 'none',
    justifyContent: 'space-between',
  },
  icon: {
    width: 80,
    height: 80,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f6f5',
    marginRight: 16,
    color: theme.palette.info.main,
  },
  content: {
    fontFamily: theme.custom.fonts.SFProTextSemibold,
    fontSize: 14,
    color: '#000',
    '&>span': {
      fontFamily: theme.custom.fonts.SFProTextRegular,
    },
    flexGrow: 1,
  },
  action: {
    width: 120,
    backgroundColor: theme.palette.info.main,
    fontSize: 12,
    fontFamily: theme.custom.fonts.SFProTextSemibold,
  },
}));

const TicketItem = ({
  data: {
    barcode = '0 705632 441947',
    section = 'G9',
    row = '12',
    seat = '9A',
    order = 'XXXXXXXXX',
    fanband = 'Fanband name',
  },
  className,
  ...boxProps
}) => {
  const classes = useStyles();

  return (
    <Box {...boxProps} className={clsx(classes.root, className)}>
      <Box className={classes.icon}>
        <TicketIcon width="18px" />
      </Box>
      <Typography className={classes.content}>
        Barcode: <span>{barcode}</span> <br />
        Section: <span>{section}</span> ∙ Row: <span>{row}</span> ∙ Seat:{' '}
        <span>{seat}</span> <br />
        Order: <span>{order}</span> <br />
        Fanband: <span>{fanband}</span> <br />
      </Typography>
      <Button fullWidth={false} className={classes.action}>
        Modify
      </Button>
    </Box>
  );
};

export default TicketItem;
