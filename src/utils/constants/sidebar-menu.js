import LINKS from 'utils/constants/links';
import HomeIcon from 'components/icons/HomeIcon';
import MailIcon from 'components/icons/MailIcon';
import MessageSquareIcon from 'components/icons/MessageSquareIcon';
import CheckSquareIcon from 'components/icons/CheckSquareIcon';
import DealIcon from 'components/icons/DealIcon';
import CalendarIcon from 'components/icons/CalendarIcon';
import AccelerometerIcon from 'components/icons/AccelerometerIcon';
import StatsIcon from 'components/icons/StatsIcon';
import AlertIcon from 'components/icons/AlertIcon';

export const OVERVIEW_ITEMS = [
  {
    icon: HomeIcon,
    path: LINKS.HOME.HREF,
    title: LINKS.HOME.TITLE,
  },
  {
    icon: StatsIcon,
    path: LINKS.STATS.HREF,
    title: LINKS.STATS.TITLE,
  },
];

export const ALERT_ACTIONS_ITEMS = [
  {
    icon: MailIcon,
    path: LINKS.NEWS.HREF,
    title: LINKS.NEWS.TITLE,
  },
  {
    icon: MessageSquareIcon,
    path: LINKS.QUICKPOLL.HREF,
    title: LINKS.QUICKPOLL.TITLE,
  },
  {
    icon: CheckSquareIcon,
    path: LINKS.SCORE.HREF,
    title: LINKS.SCORE.TITLE,
  },
  {
    icon: DealIcon,
    path: LINKS.PROMO.HREF,
    title: LINKS.PROMO.TITLE,
  },
  {
    icon: CalendarIcon,
    path: LINKS.SCHEDULE.HREF,
    title: LINKS.SCHEDULE.TITLE,
  },
  {
    icon: AccelerometerIcon,
    path: LINKS.ACCELEROMETER.HREF,
    title: LINKS.ACCELEROMETER.TITLE,
  },
];

export const SAVED_ALERTS_ITEMS = [
  {
    icon: AlertIcon,
    path: LINKS.SAVED_ALERTS.HREF,
    title: LINKS.SAVED_ALERTS.TITLE,
  },
];

export const SIDEBAR_GROUPS = [
  {
    title: 'Overview',
    items: OVERVIEW_ITEMS,
  },
  {
    title: 'Alert actions',
    items: ALERT_ACTIONS_ITEMS,
  },
  {
    title: 'Saved alerts',
    items: SAVED_ALERTS_ITEMS,
  },
];

export default SIDEBAR_GROUPS;
