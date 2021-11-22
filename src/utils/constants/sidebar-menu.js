import LINKS from 'utils/constants/links';
import {
  HomeIcon,
  MailIcon,
  MessageSquareIcon,
  CheckSquareIcon,
  DealIcon,
  CalendarIcon,
  AccelerometerIcon,
  StatsIcon,
  AlertIcon,
} from 'components/icons';

export const OVERVIEW_ITEMS = [
  {
    icon: HomeIcon,
    ...LINKS.home,
  },
  {
    icon: StatsIcon,
    ...LINKS.stats,
  },
];

export const ALERT_ACTIONS_ITEMS = [
  {
    icon: MailIcon,
    ...LINKS.news,
  },
  {
    icon: MessageSquareIcon,
    ...LINKS.quickPoll,
  },
  {
    icon: CheckSquareIcon,
    ...LINKS.score,
  },
  {
    icon: DealIcon,
    ...LINKS.promo,
  },
  {
    icon: CalendarIcon,
    ...LINKS.schedule,
  },
  {
    icon: AccelerometerIcon,
    ...LINKS.accelerometer,
  },
];

export const SAVED_ALERTS_ITEMS = [
  {
    icon: AlertIcon,
    ...LINKS.savedAlerts,
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
