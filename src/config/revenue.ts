import { Risk } from './risk';

export const REVENUE: Record<string, Risk> = {
  MAIN_REVENUE_SOURCE: {
    title: 'Yield Token Volatility',
    explanation: 'The main revenue comes from BAL and AURA tokens',
  },
  YIELD_SIZE: {
    title: 'Unpeg',
    explanation: 'auraBAL is not hard-pegged to B-80BAL-20WETH token.',
  },
  DURATION: {
    title: 'Duration',
    explanation:
      'The incentive tokens have a hard cap however continuously decreasing distribution of BAL tokens (and corresponding distribution of AURA) makes incentives program duration very long (example of BAL distribution).',
  },
  REWARD_DISTRIBUTION: {
    title: 'Reward Distribution Frequency',
    explanation:
      'BAL tokens accrued each block, corresponding amount of AURA distributed when harvesting BAL',
  },
  ADDITIONAL_REVENUE: {
    title: 'Additional Revenue',
    explanation: 'Trading fees 2.62% APY',
  },
  DSR_YIELDS: {
    title: 'DSR yields',
    explanation:
      'The main revenue comes from yield on Tbills, USDC & RWA’s held by MakerDAO on the behalf of DAI stakers in the DSR',
  },
  ADDITIONAL_REVENUE_DAI: {
    title: 'Additional Revenue',
    explanation:
      'Additional revenue is derived from leveraging up the exposure through borrowing more DAI & staking in the DSR',
  },
  DSR_YIELDS_GNOSIS: {
    title: 'DSR yields',
    explanation:
      'The main revenue comes from yield on Tbills, managed by Maker on behalf of DAI stakers in the DSR. The additional yield (vs normal DSR) is due to the fact that all DAI in the Gnosis bridge is deposited in the DSR, and the yield generated will only be distributed to Agave DAI stakers.',
  },
  CNOTE_YIELD: {
    title: 'cNote Yield Risk',
    explanation:
      'cNote yield is an organic yield paid in kind by Note borrowers on the Canto Lending market.',
  },
  CANTO_INCENTIVES: {
    title: 'Canto Incentives Risk',
    explanation:
      'Canto incentives are liquidity mining rewards that are paid by the Canto Blockchain to incentivize LPs that provide liquidity on public goods protocols on the chain.',
  },
};
