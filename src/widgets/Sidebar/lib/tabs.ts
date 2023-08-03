import { icons } from '../../../shared/Icons';
import { TabInfo } from '../types';

const { house, grid, analytics, market, swap, speed, star, strategies } = icons;

export enum Tabs {
  DISCOVER = 'Discover',
  DASHBOARD = 'Dashboard',
  PROTOCOLS = 'Protocols',
  STRATEGIES = 'Strategies',
  REWARDS = 'Rewards',
  DEBT = 'Debt',
  SWAP = 'Swap',
  ANALYTICS = 'Analytics',
  MARKET = 'Market',
}

export const tabs: TabInfo[] = [
  { name: Tabs.DISCOVER, icon: house, to: '' },
  { name: Tabs.DASHBOARD, icon: house, to: '' },
  { name: Tabs.PROTOCOLS, icon: grid, to: '' },
  { name: Tabs.STRATEGIES, icon: strategies, to: '' },
  { name: Tabs.REWARDS, icon: star, to: '' },
  { name: Tabs.DEBT, icon: speed, to: '' },
  { name: Tabs.SWAP, icon: swap, to: '' },
  { name: Tabs.ANALYTICS, icon: analytics, to: '' },
  { name: Tabs.MARKET, icon: market, to: '' },
];
