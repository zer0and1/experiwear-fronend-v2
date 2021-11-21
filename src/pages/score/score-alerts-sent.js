import { ALERT_TYPES, LINKS } from 'utils/constants';
import { useAlertsSent, usePathIndicator } from 'hooks';

const ScoreAlertsSent = () => {
  usePathIndicator([
    { path: LINKS.score.path, label: LINKS.score.title },
    {
      path: LINKS.scoreSent.path,
      label: LINKS.scoreSent.TITLE,
    },
  ]);

  return useAlertsSent(ALERT_TYPES.SCORE.VALUE, 'Score alerts sent');
};

export default ScoreAlertsSent;
