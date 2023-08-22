import { ILPToken } from '../../../features/data/apis/merlin/types/poolInfo';

export interface IRewardPosition {
  protocolName: string;
  chain: string;
  logo: string | null;
  reward: ILPToken[];
  totalRewards: number;
  protocol: string;
  isSupported: boolean;
  isAbleToClaim?: boolean;
}
