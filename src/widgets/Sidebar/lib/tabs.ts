import { icons } from '../../../shared/Icons';
import { TabInfo } from '../types';

const { house, market, swap, speed, star } = icons;

export enum Tabs {
  VAULTS = 'Vaults',
  MY_PORTFOLIO = 'My Portfolio',
  REWARDS = 'Rewards',
  DEBT = 'Debt',
  SWAP = 'Swap',
  MARKET = 'Market',
}

export enum LinksTo {
  VAULTS = '/',
  MY_PORTFOLIO = '/my_portfolio',
  REWARDS = '/rewards',
  DEBT = '/debts',
  SWAP = '/swap',
  MARKET = '/market',
}

export const tabs: TabInfo[] = [
  { name: Tabs.VAULTS, icon: star, to: LinksTo.VAULTS },
  { name: Tabs.MY_PORTFOLIO, icon: house, to: LinksTo.MY_PORTFOLIO },
  { name: Tabs.REWARDS, icon: star, to: LinksTo.REWARDS },
  { name: Tabs.DEBT, icon: speed, to: LinksTo.DEBT },
  { name: Tabs.SWAP, icon: swap, to: LinksTo.SWAP },
  { name: Tabs.MARKET, icon: market, to: LinksTo.MARKET },
];
