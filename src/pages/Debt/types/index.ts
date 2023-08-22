import { ILPToken } from '../../../features/data/apis/merlin/types/poolInfo';

export interface IBorrowPosition {
  protocolName: string;
  protocol: string;
  chain: string;
  logo: string | null;
  borrowed: ILPToken[];
  totalDebt: number;
  isSupported: boolean;
}
