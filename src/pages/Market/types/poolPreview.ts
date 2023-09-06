import { IPoolPreview } from '../../../features/data/entities/market';
import { Query } from './query';

export interface PoolsPreviewState {
  loading: boolean;
  errorMessage: string;
  data: IPoolPreview[];
  totalElements: number;
  query: Query;
}

export type sourcePage = 'MAIN_PAGE' | 'POOLS';
