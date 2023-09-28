interface Score {
  name: string;
  score: number;
  desc: string;
}

export const safetyScores: Record<string, Score[]> = {
  'Tech Design Risk': [
    {
      name: 'Is the project audited',
      score: 2,
      desc: 'Multiple audits for all the protocols',
    },
    {
      name: 'Product architecture complexity',
      score: 2,
      desc: '3 protocols: Balancer, Aura Finance, AAVE',
    },
    {
      name: 'Time lock',
      score: 0,
      desc: `There should be no circumstances under which it is possible for admin functions to syphon off or redirect user capital and thus time-lock delays are not required. - ©Docks
 (however, Multisig exists with wide list of not affiliated members)`,
    },
    {
      name: 'Team & backers',
      score: 0,
      desc: 'Anonymous team without backers for Aura Finance',
    },
  ],
  'Economic Design': [
    {
      name: 'Economic model originality',
      score: 2,
      desc: 'Successful model (copy of Convex for Balancer)',
    },
    {
      name: 'How long the project survives with no hacks',
      score: 2,
      desc: 'There were not any hacks for a long time for Balancer (the last was 2 years ago) and Aura is a new projects that lives for 5 months w/o hacks.',
    },
  ],
  'Market Risk': [
    {
      name: 'How significant is expected Impermanent Loss',
      score: 1,
      desc: 'No IL, stablecoin pool',
    },
    {
      name: 'Volatility',
      score: 2,
      desc: `Voodoo uses 4h prices, so 8h window of 2 ticks was used. 
BAL price swing is 0.21 ETH price swing is 0.1`,
    },
    {
      name: 'Debt Position',
      score: 2,
      desc: 'No debt used',
    },

    {
      name: 'Is the token instantly liquid',
      score: 2,
      desc: 'Instant liquidity',
    },
    {
      name: 'Is insurance available',
      score: 0,
      desc: 'No insurance for Aura Finance',
    },
    {
      name: 'Is unpeg possible?',
      score: 1,
      desc: 'auraBAL has no cases of >5% unpeg from B-80BAL-20ETH, but has cases of 3% unpeg ',
    },
  ],
};

export const totalSafetyScore = Object.values(safetyScores)
  .flat()
  .reduce((acc, { score }) => (acc += score), 0);

export const MAX_SAFETY_SCORE = 24;
