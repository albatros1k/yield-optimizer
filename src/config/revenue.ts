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
};
