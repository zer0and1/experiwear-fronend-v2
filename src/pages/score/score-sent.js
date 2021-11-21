import { ALERT_TYPES, LINKS } from 'utils/constants';
import { useAlertsSent, usePathIndicator } from 'hooks';

const ScoreSentPage = () => {
  usePathIndicator([LINKS.score, LINKS.scoreSent]);

  return useAlertsSent(ALERT_TYPES.SCORE.VALUE, 'Score alerts sent');
};

export default ScoreSentPage;
