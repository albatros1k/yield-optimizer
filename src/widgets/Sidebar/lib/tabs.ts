import { icons } from '../../../shared/Icons';
import { TabInfo } from '../types';

const { house, market, swap, speed, star } = icons;

export enum Tabs {
  DISCOVER = 'Discover',
  DASHBOARD = 'Dashboard',
  REWARDS = 'Rewards',
  DEBT = 'Debt',
  SWAP = 'Swap',
  MARKET = 'Market',
}

export enum LinksTo {
  DISCOVER = '/',
  DASHBOARD = '/dashboard',
  REWARDS = '/rewards',
  DEBT = '/debts',
  SWAP = '/swap',
  MARKET = '/market',
}

export const tabs: TabInfo[] = [
  { name: Tabs.DISCOVER, icon: star, to: LinksTo.DISCOVER },
  { name: Tabs.DASHBOARD, icon: house, to: LinksTo.DASHBOARD },
  { name: Tabs.REWARDS, icon: star, to: LinksTo.REWARDS },
  { name: Tabs.DEBT, icon: speed, to: LinksTo.DEBT },
  { name: Tabs.SWAP, icon: swap, to: LinksTo.SWAP },
  { name: Tabs.MARKET, icon: market, to: LinksTo.MARKET },
];
