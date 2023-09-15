import { IPoolPreview } from '../../../features/data/entities/market';

export interface ISelectedItem {
  selected: number;
}

export interface IState {
  loading: boolean;
  errorMessage: string;
  data: IPoolPreview[];
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}
