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
                          40 <br /> 50%
                        </td>
                      ))}
                      <td className={classes.cell}>
                        80 <br /> 80%
                      </td>
                      <td className={classes.cell}>
                        80 <br /> 100%
                      </td>
                      <td className={classes.cell}>0.00</td>
                      <td className={classes.cell}>0.00</td>
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
