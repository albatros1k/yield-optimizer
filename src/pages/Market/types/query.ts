import { kpiKey } from '../../../features/data/entities/market';
import { OrderEnum } from '../../../shared/types';

export interface Query {
  page: number;
  size: number;
  sort: keyof typeof OrderEnum;
  sortKey: kpiKey;
}
