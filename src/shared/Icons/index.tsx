import { ReactComponent as Grid } from '../../images/nav-icons/grid.svg';
import { ReactComponent as Strategies } from '../../images/nav-icons/strategies.svg';
import { ReactComponent as House } from '../../images/nav-icons/house.svg';
import { ReactComponent as Market } from '../../images/nav-icons/market.svg';
import { ReactComponent as Analytics } from '../../images/nav-icons/analytics.svg';
import { ReactComponent as Speed } from '../../images/nav-icons/speed.svg';
import { ReactComponent as Star } from '../../images/nav-icons/star.svg';
import { ReactComponent as Swap } from '../../images/nav-icons/swap.svg';
import { ReactComponent as Plate } from '../../images/nav-icons/plate.svg';
import { ReactComponent as Search } from '../../images/nav-icons/search.svg';
import { ReactComponent as Wallet } from '../../images/nav-icons/wallet.svg';
import { ReactComponent as Arrow } from '../../images/nav-icons/arrow.svg';
import { ReactComponent as Logout } from '../../images/nav-icons/log-out.svg';
import { ReactComponent as Repeat } from '../../images/nav-icons/repeat.svg';
import { ReactComponent as ExternalLink } from '../../images/nav-icons/external-link.svg';
import { ReactComponent as Copy } from '../../images/nav-icons/copy.svg';
import { ReactComponent as Chevron } from '../../images/nav-icons/chevron.svg';
import { ReactComponent as Airdrop } from '../../images/nav-icons/airdrop.svg';
import { ReactComponent as Question } from '../../images/nav-icons/question.svg';
import { ReactComponent as More } from '../../images/nav-icons/more-vertical.svg';
import { ReactComponent as NoIcon } from '../../images/nav-icons/no-icon.svg';
import { ReactComponent as BackArrow } from '../../images/nav-icons/backarrow.svg';
import { ReactComponent as X } from '../../images/nav-icons/x.svg';
import { ReactComponent as Twitter } from '../../images/nav-icons/twitter.svg';
import { ReactComponent as Calendar } from '../../images/nav-icons/calendar.svg';
import { ReactComponent as File } from '../../images/nav-icons/file.svg';
import { ReactComponent as Screw } from '../../images/nav-icons/screw.svg';
import { ReactComponent as ChartArrow } from '../../images/nav-icons/arrow-chart.svg';
import { ReactComponent as Check } from '../../images/nav-icons/check.svg';
import { ReactComponent as Info } from '../../images/nav-icons/info.svg';
import { ReactComponent as SmallCalendar } from '../../images/nav-icons/small-calendar.svg';
import { ReactComponent as Bell } from '../../images/nav-icons/bell.svg';
import { ReactComponent as Report } from '../../images/nav-icons/report.svg';
import { ReactComponent as Unpeg } from '../../images/nav-icons/unpeg.svg';
import { ReactComponent as Maximize } from '../../images/nav-icons/maximize.svg';
import { ReactComponent as List } from '../../images/nav-icons/list.svg';
import { ReactComponent as Clock } from '../../images/nav-icons/clock.svg';
import { ReactComponent as Link } from '../../images/nav-icons/link.svg';
import { ReactComponent as FullStar } from '../../images/nav-icons/full-star.svg';
import { ReactComponent as User } from '../../images/nav-icons/user.svg';

type IconName =
  | 'grid'
  | 'house'
  | 'market'
  | 'analytics'
  | 'speed'
  | 'star'
  | 'swap'
  | 'wallet'
  | 'search'
  | 'plate'
  | 'arrow'
  | 'externalLink'
  | 'logout'
  | 'repeat'
  | 'chevron'
  | 'copy'
  | 'airdrop'
  | 'question'
  | 'more'
  | 'noIcon'
  | 'backarrow'
  | 'x'
  | 'twitter'
  | 'calendar'
  | 'file'
  | 'screw'
  | 'chartArrow'
  | 'check'
  | 'info'
  | 'strategies'
  | 'smallCalendar'
  | 'bell'
  | 'report'
  | 'unpeg'
  | 'maximize'
  | 'clock'
  | 'list'
  | 'link'
  | 'fullStar'
  | 'user';

export const icons: Record<IconName, JSX.Element> = {
  grid: <Grid />,
  house: <House />,
  market: <Market />,
  analytics: <Analytics />,
  speed: <Speed />,
  star: <Star />,
  swap: <Swap />,
  wallet: <Wallet />,
  search: <Search />,
  plate: <Plate />,
  arrow: <Arrow />,
  copy: <Copy />,
  logout: <Logout />,
  externalLink: <ExternalLink />,
  repeat: <Repeat />,
  chevron: <Chevron />,
  airdrop: <Airdrop />,
  question: <Question />,
  more: <More />,
  noIcon: <NoIcon />,
  backarrow: <BackArrow />,
  x: <X />,
  twitter: <Twitter />,
  file: <File />,
  calendar: <Calendar />,
  screw: <Screw />,
  chartArrow: <ChartArrow />,
  check: <Check />,
  info: <Info />,
  strategies: <Strategies />,
  smallCalendar: <SmallCalendar />,
  bell: <Bell />,
  report: <Report />,
  unpeg: <Unpeg />,
  maximize: <Maximize />,
  clock: <Clock />,
  list: <List />,
  link: <Link />,
  fullStar: <FullStar />,
  user: <User />,
};
