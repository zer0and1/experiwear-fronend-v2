import { makeStyles } from '@material-ui/core';
import { getNotifications } from 'redux/actions';
import clsx from 'clsx';
import { AlertItem, FHCard, FHCardContent, FHCardHeader } from 'components';
import { Fragment, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ALERT_PROTO_TYPES } from 'utils/constants';
import { useAsyncAction } from 'hooks';

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'auto',
  },
  table: {
    tableLayout: 'fixed',
    width: '100%',
    marginTop: -92,
  },
  cell: {
    fontFamily: theme.custom.fonts.SFProDisplayBlackItalic,
    fontSize: 16,
    letterSpacing: '0.48px',
    color: 'black',
    textTransform: 'uppercase',
    textAlign: 'center',
    height: 92,
  },
  divider: {
    height: 0,
    borderBottom: '1px solid #9ea3ba',
  },
  color0: {
    color: '#53c76e',
  },
  color1: {
    color: '#d02231',
  },
  color2: {
    color: '#53c76e',
  },
}));

const QuickPollAlertsSent = () => {
  const classes = useStyles();
  const alerts = useSelector((state) =>
    state.notifications.survey.results.filter((alert) => alert.isSent)
  );
  const responses = useMemo(
    () =>
      alerts.reduce(
        (acc, alert) =>
          acc.find((res) =>
            alert.surveyResponses.find((sr) => sr.response === res)
          )
            ? acc
            : [...acc, ...alert.surveyResponses.map((sr) => sr.response)],
        []
      ),
    [alerts]
  );
  const surveys = useMemo(
    () =>
      alerts.map((alert) => {
        // TODO: aggregates reponses, sent, open, avg and md
        return {
          ...alert,
          aggr: {
            ...responses.reduce(
              (acc, res) => ({ ...acc, [res]: { count: 40, percent: 50 } }),
              {}
            ),
            sent: {
              count: 80,
              percent: 80,
            },
            open: {
              count: 80,
              percent: 80,
            },
            avg: '0.00',
            md: '0.00',
          },
        };
      }),
    [alerts, responses]
  );

  useAsyncAction(getNotifications(ALERT_PROTO_TYPES.survey), !alerts.length);

  return (
    <FHCard className={classes.root}>
      <FHCardHeader title="Quick Poll ALERTS SENT" />
      <FHCardContent>
        <table className={classes.table}>
          <thead>
            <tr>
              <td style={{ width: 300 }}></td>
              {responses.map((res, idx) => (
                <td
                  key={res}
                  className={clsx(classes.cell, classes[`color${idx}`])}
                >
                  {res}
                </td>
              ))}
              <th className={classes.cell}>sent</th>
              <th className={classes.cell}>open</th>
              <th className={classes.cell}>avg</th>
              <th className={classes.cell}>md</th>
            </tr>
          </thead>
          <tbody>
            {surveys.map((alert) => (
              <Fragment key={alert.id}>
                <tr>
                  <td className={classes.cell}>
                    <AlertItem data={alert} />
                  </td>
                  {responses.map((res, idx) => (
                    <td
                      key={res}
                      className={clsx(
                        classes.cell,
                        classes[`color${Math.min(idx, 2)}`]
                      )}
                    >
                      {alert.aggr?.[res].count} <br />
                      {alert.aggr?.[res].percent}%
                    </td>
                  ))}
                  <td className={classes.cell}>
                    {alert.aggr.sent.count} <br /> {alert.aggr.sent.percent}%
                  </td>
                  <td className={classes.cell}>
                    {alert.aggr.open.count} <br /> {alert.aggr.open.percent}%
                  </td>
                  <td className={classes.cell}>{alert.aggr.avg}</td>
                  <td className={classes.cell}>{alert.aggr.md}</td>
                </tr>
                <tr>
                  <td
                    className={classes.divider}
                    colSpan={responses.length + 5}
                  ></td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </FHCardContent>
    </FHCard>
  );
};

export default QuickPollAlertsSent;
