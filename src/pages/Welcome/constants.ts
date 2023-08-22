import { icons } from '../../shared/Icons';

export interface IOption {
  title: string;
  caption: string;
  icon: JSX.Element;
}

export const options: IOption[] = [
  {
    title: 'Manage all your positions at one stop',
    caption: 'Compound, AAVE, Uniswap, and more!',
    icon: icons.plate,
  },
  { title: 'Create Smart Wallet', caption: 'Which will automate your routine', icon: icons.wallet },
  {
    title: 'See your P&L in real time',
    caption: 'Never miss the moment to update your position',
    icon: icons.search,
  },
];
