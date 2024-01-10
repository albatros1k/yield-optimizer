import { MissionsProps } from '../ui/Missions';
import { ReactComponent as Clous } from '../../../images/claus.svg';

export const MISSION_END_DAY_STORAGE_KEY = 'missions_end_date';

// Till the end of the year ex. moment('2023-12-31T23:59:59')
export const FIXED_END_DATE = null;

export const mission: MissionsProps = {
  title: 'Odysea Academy',
  subtitle: 'Learn and be rewarded',
  link: 'https://galxe.com/odysea/campaign/GC6CFttotD',
  duration: FIXED_END_DATE,
  icon: <Clous />,
};
