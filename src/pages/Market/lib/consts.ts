import { kpiKey } from '../../../features/data/entities/market';
import { periodsType } from '../types/period';
import { URLSearchParamsInit } from '../types/searchParam';

export const initialSearchParams: URLSearchParamsInit = {
  sort: 'DESC',
  sortKey: 'tvl',
  page: '1',
} as const;

export const queryString = Object.keys(initialSearchParams)
  .map(
    key => `${encodeURIComponent(key)}=${encodeURIComponent(initialSearchParams[key] as string)}`
  )
  .join('&');

export const size: number = 10;

export const kpiParams: kpiKey[] = ['apy', 'apyBase', 'apyFarm', 'apyMean30', 'rewards', 'tvl'];

export const allValuesKey: string = 'All';

export const defaultPeriod: periodsType = 'MONTH';

export const changeThresholdPercent: number = 5;
