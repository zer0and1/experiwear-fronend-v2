import { memo, useMemo } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import ArrowDownward from '@material-ui/icons/ArrowDownward'

import CircleIcon from 'components/Icons/CircleIcon'
import getChartFooterInfo from 'utils/helpers/getChartFooterInfo'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: theme.spacing(1)
  },
  rowView: {
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    margin: theme.spacing(0, 1)
  },
  upIcon: {
    fontSize: 14,
    color: theme.custom.palette.green
  },
  downIcon: {
    fontSize: 14,
    color: theme.custom.palette.red
  }
}));

const ChartFooterItem = ({
  type = 'yes',
  isAction = false,
  count,
  percent,
  ratePercent
}) => {
  const classes = useStyles();

  const info = useMemo(() => getChartFooterInfo(type), [type]);

  return (
    <div className={classes.container}>
      <div className={classes.rowView}>
        <CircleIcon color={info.color} />
        <Typography color='textPrimary' className={classes.text}>
          {isAction ? info.label : `${info.label} - ${percent} %`}
        </Typography>
      </div>

      <div className={classes.rowView}>
        {count &&
          <Typography color='textPrimary' className={classes.text}>
            {count}
          </Typography>
        }
        {
          false && ratePercent &&
          <>
            <Typography color='textPrimary' className={classes.text}>
              {ratePercent}
            </Typography>
            {
              ratePercent > 0
                ? <ArrowUpward className={classes.upIcon} />
                : <ArrowDownward className={classes.downIcon} />
            }
          </>
        }
      </div>
    </div>
  );
};

export default memo(ChartFooterItem);
