import { MissionsProps } from '../ui/Missions';
import { ReactComponent as Academy } from '../../../images/academy.svg';

import book from '../../../images/academy/book.svg';
import freshman from '../../../images/academy/freshman.png';
import graduate from '../../../images/academy/graduate.png';
import academic from '../../../images/academy/academic.png';
import erudit from '../../../images/academy/erudit.png';

export const MISSION_END_DAY_STORAGE_KEY = 'missions_end_date';

// Till the end of the year ex. moment('2023-12-31T23:59:59')
export const FIXED_END_DATE = null;

export const mission: MissionsProps = {
  title: 'Odysea Academy',
  subtitle: 'Learn and be rewarded',
  link: 'https://galxe.com/odysea/campaign/GC6CFttotD',
  duration: FIXED_END_DATE,
  icon: <Academy width={30} height={30} />,
};

interface LevelData {
  icon: string;
  title: string;
  desc?: string;
  textBtn: string;
  color: string;
}

export enum LevelStep {
  Begginer,
  Freshman,
  Graduate,
  Academic,
  Erudit,
}

export const levelData: Record<LevelStep, LevelData> = {
  [LevelStep.Begginer]: {
    icon: book,
    title: 'Odysea Academy',
    desc: 'Elevate your journey into DeFi Universe with Odysea Academy and get rewarded ',
    textBtn: 'Start Learning',
    color: '#10B981',
  },
  [LevelStep.Freshman]: {
    icon: freshman,
    title: 'Freshman',
    textBtn: 'Continue Learning',
    color: '#C2EA42',
  },
  [LevelStep.Graduate]: {
    icon: graduate,
    title: 'Graduate',
    textBtn: 'Continue Learning',
    color: '#6BC6FF',
  },
  [LevelStep.Academic]: {
    icon: academic,
    title: 'Academic',
    textBtn: 'Continue Learning',
    color: '#FF297B',
  },
  [LevelStep.Erudit]: {
    icon: erudit,
    title: 'Erudit',
    textBtn: 'Continue Learning',
    color: '#B52FCC',
  },
};
