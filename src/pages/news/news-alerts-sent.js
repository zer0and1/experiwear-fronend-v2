import {
  Card,
  CardContent,
  CardHeader,
  Container,
  makeStyles,
} from '@material-ui/core';
import { getNotifications } from 'actions/getNotifications';
import clsx from 'clsx';
import { Layout, AlertItem } from 'components';
import { Fragment, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CurrentFanbandStats } from 'sidebars';
import { ALERT_TYPES, LINKS } from 'utils/constants';
import { useAsyncAction, usePathIndicator } from 'utils/hooks';

const useStyles = makeStyles((theme) => ({
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
    state.notifications.survey.results
      .filter((alert) => alert.isSent)
      .map((alert) => {
        // TODO: aggregates reponses, sent, open, avg and md
        return {
          ...alert,
          aggr: {
            ...responses.redux(
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
      })
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

  usePathIndicator([
    { path: LINKS.QUICKPOLL.HREF, label: LINKS.QUICKPOLL.TITLE },
    {
      path: LINKS.QUICKPOLL_ALERTS_SENT.HREF,
      label: LINKS.QUICKPOLL_ALERTS_SENT.TITLE,
    },
  ]);

  useAsyncAction(getNotifications(ALERT_TYPES.SURVEY.VALUE), !alerts.length);

  return (
    <Layout sidebar={<CurrentFanbandStats />}>
      <Card>
        <CardHeader title="Quick Poll ALERTS SENT" />
        <CardContent>
          <Container maxWidth="lg">
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
                {alerts.map((alert) => (
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
                          {alert.aggr?.[res].count} <br />{' '}
                          {alert.aggr?.[res].percent}%
                        </td>
                      ))}
                      <td className={classes.cell}>
                        {alert.aggr.sent.count} <br /> {alert.aggr.sent.percent}
                        %
                      </td>
                      <td className={classes.cell}>
                        {alert.aggr.open.count} <br /> {alert.aggr.open.percent}
                        %
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
          </Container>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default QuickPollAlertsSent;
