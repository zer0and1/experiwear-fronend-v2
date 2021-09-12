
import LINKS from 'utils/constants/links'
import HomeIcon from 'components/Icons/HomeIcon'
import MailIcon from 'components/Icons/MailIcon'
import MessageSquareIcon from 'components/Icons/MessageSquareIcon'
import CheckSquareIcon from 'components/Icons/CheckSquareIcon'
import DealIcon from 'components/Icons/DealIcon'
import CalendarIcon from 'components/Icons/CalendarIcon'
import AccelerometerIcon from 'components/Icons/AccelerometerIcon'
import StatsIcon from 'components/Icons/StatsIcon';
import AlertIcon from 'components/Icons/AlertIcon'

export const OVERVIEW_ITEMS = [
  {
    icon: HomeIcon,
    path: LINKS.HOME.HREF,
    title: LINKS.HOME.TITLE
  },
  {
    icon: StatsIcon,
    path: LINKS.STATS.HREF,
    title: LINKS.STATS.TITLE,
  }
]

export const ALERT_ACTIONS_ITEMS = [
  {
    icon: MailIcon,
    path: LINKS.NEWS.HREF,
    title: LINKS.NEWS.TITLE
  },
  {
    icon: MessageSquareIcon,
    path: LINKS.SURVEY.HREF,
    title: LINKS.SURVEY.TITLE
  },
  {
    icon: CheckSquareIcon,
    path: LINKS.SCORE.HREF,
    title: LINKS.SCORE.TITLE
  },
  {
    icon: DealIcon,
    path: LINKS.PROMO.HREF,
    title: LINKS.PROMO.TITLE
  },
  {
    icon: CalendarIcon,
    path: LINKS.SCHEDULE.HREF,
    title: LINKS.SCHEDULE.TITLE
  },
  {
    icon: AccelerometerIcon,
    path: LINKS.ACCELEROMETER.HREF,
    title: LINKS.ACCELEROMETER.TITLE
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
  }
];

export default SIDEBAR_GROUPS;
