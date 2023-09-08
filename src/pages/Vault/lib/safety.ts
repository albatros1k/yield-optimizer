interface Score {
  name: string;
  score: number;
}

export const safetyScores: Record<string, Score[]> = {
  'Tech Analysis': [
    {
      name: 'Multiple audits for all the protocols',
      score: 2,
    },
    {
      name: 'Product architecture complexity',
      score: 2,
    },
    {
      name: 'Time lock',
      score: 0,
    },
    {
      name: 'No Backers and Team is unknown',
      score: 0,
    },
  ],
  'Economic Analysis': [
    {
      name: 'Economic model originality',
      score: 2,
    },
    {
      name: 'How long the project survives with no hacks',
      score: 2,
    },
  ],

  'Market Analysis': [
    {
      name: 'How significant is expected Impermanent Loss',
      score: 1,
    },
    {
      name: 'Volatility',
      score: 2,
    },

    {
      name: 'Instant liquidity',
      score: 2,
    },
    {
      name: 'No insurance for Aura Finance',
      score: 0,
    },
    {
      name: 'Possible unpeg ',
      score: 0,
    },
  ],
};

export const totalSafetyScore = Object.values(safetyScores)
  .flat()
  .reduce((acc, { score }) => (acc += score), 0);

export const MAX_SAFETY_SCORE = 24;
