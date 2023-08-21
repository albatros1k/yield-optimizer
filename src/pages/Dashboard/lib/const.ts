export const gridColumnPattern = '3.2fr repeat(6,1fr) 3.2fr';

export const walletTitles: Array<string | null> = [
  'Asset',
  'Amount',
  'Price',
  '24H',
  null,
  null,
  'Holdings',
  null,
];

export enum ContentState {
  EXPAND = 'Expand',
  HIDE = 'Hide',
}

export type LendingHeadings = 'Supplied' | 'Borrowed' | 'Rewards';

export const moduleTitles: Array<string | null> = [
  'Asset',
  'Amount',
  null,
  'P&L',
  'Yield',
  'APY',
  'Holdings',
  'Action',
];

export const closedModuleTitles: Array<string | null> = [
  'Asset',
  'Transaction Fee',
  'P&L',
  'Yield',
];
