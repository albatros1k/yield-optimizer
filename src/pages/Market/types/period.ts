export enum Periods {
  'WEEK' = 7,
  'MONTH' = 30,
  'ALL' = 60,
}

export type periodsType = keyof typeof Periods;

export type protocolType = {
  protocol: string;
  protocolDisplay: string;
  poolId: string;
  color: string;
  is_active: boolean;
  network: string;
};

export type PeriodsMap = {
  [key in keyof typeof Periods]: string;
};
