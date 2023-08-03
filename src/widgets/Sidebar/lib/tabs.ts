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

export enum LinksTo {
  DISCOVER = '/',
  DASHBOARD = '/dashboard',
  PROTOCOLS = '/protocols',
  STRATEGIES = '/strategies',
  REWARDS = '/rewards',
  DEBT = '/debts',
  SWAP = '/swap',
  ANALYTICS = '/analytics',
  MARKET = '/market',
}

export const tabs: TabInfo[] = [
  { name: Tabs.DISCOVER, icon: star, to: LinksTo.DISCOVER },
  { name: Tabs.DASHBOARD, icon: house, to: LinksTo.DASHBOARD },
  { name: Tabs.PROTOCOLS, icon: grid, to: LinksTo.PROTOCOLS },
  { name: Tabs.STRATEGIES, icon: strategies, to: LinksTo.STRATEGIES },
  { name: Tabs.REWARDS, icon: star, to: LinksTo.REWARDS },
  { name: Tabs.DEBT, icon: speed, to: LinksTo.DEBT },
  { name: Tabs.SWAP, icon: swap, to: LinksTo.SWAP },
  { name: Tabs.ANALYTICS, icon: analytics, to: LinksTo.ANALYTICS },
  { name: Tabs.MARKET, icon: market, to: LinksTo.MARKET },
];
