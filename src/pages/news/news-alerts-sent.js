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
            sent: {
              count: 311,
              percent: 98,
            },
            open: {
              count: 1,
              percent: 2,
            },
          },
        };
      })
  );

  usePathIndicator([
    { path: LINKS.NEWS.HREF, label: LINKS.NEWS.TITLE },
    {
      path: LINKS.NEWS_ALERTS_SENT.HREF,
      label: LINKS.NEWS_ALERTS_SENT.TITLE,
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
                  <td style={{ width: 500 }}></td>
                  <th className={classes.cell}>sent</th>
                  <th className={classes.cell}>open</th>
                </tr>
              </thead>
              <tbody>
                {alerts.map((alert) => (
                  <Fragment key={alert.id}>
                    <tr>
                      <td className={classes.cell}>
                        <AlertItem data={alert} />
                      </td>
                      <td className={classes.cell}>
                        {alert.aggr.sent.count} <br /> {alert.aggr.sent.percent}
                        %
                      </td>
                      <td className={classes.cell}>
                        {alert.aggr.open.count} <br /> {alert.aggr.open.percent}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.divider} colSpan={3}></td>
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
