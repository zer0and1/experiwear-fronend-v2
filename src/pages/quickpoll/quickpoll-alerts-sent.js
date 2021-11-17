import { Card, CardContent, CardHeader } from '@material-ui/core';
import { getNotifications } from 'actions/getNotifications';
import { Layout } from 'components';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CurrentFanbandStats } from 'sidebars';
import { ALERT_TYPES, LINKS } from 'utils/constants';
import { useAsyncAction, usePathIndicator } from 'utils/hooks';

const QuickPollAlertsSent = () => {
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
          <table>
            <thead>
              <tr>
                <td></td>
                {responses.map((response) => (
                  <td key={response}>{response}</td>
                ))}
                <td>sent</td>
                <td>open</td>
                <td>avg</td>
                <td>md</td>
              </tr>
            </thead>
          </table>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default QuickPollAlertsSent;
