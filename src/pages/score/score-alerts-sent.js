import { ALERT_TYPES, LINKS } from 'utils/constants';
import { useAlertsSent, usePathIndicator } from 'hooks';

const ScoreAlertsSent = () => {
  usePathIndicator([
    { path: LINKS.SCORE.HREF, label: LINKS.SCORE.TITLE },
    {
      path: LINKS.SCORE_ALERTS_SENT.HREF,
      label: LINKS.SCORE_ALERTS_SENT.TITLE,
    },
  ]);

  return useAlertsSent(ALERT_TYPES.SCORE.VALUE, 'Score alerts sent');
};

export default ScoreAlertsSent;
