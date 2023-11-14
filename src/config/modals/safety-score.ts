export type SafetyScore = {
  name: string;
  score: number;
  desc: string;
};

export const MAX_SAFETY_SCORE = 30;

export const SAFETY_SCORE: Record<string, Record<string, SafetyScore[]>> = {
  'aave-bal-aura': {
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
  },
  'sdai-leverage': {
    'Tech Design Risk': [
      {
        name: 'Is the project audited',
        score: 2,
        desc: 'Is the project audited +2',
      },
      {
        name: 'Product architecture complexity',
        score: 2,
        desc: 'Product architecture complexity +2',
      },
      {
        name: 'No Time lock',
        score: 2,
        desc: 'No Time lock +2',
      },
      {
        name: 'Team & backers',
        score: 1,
        desc: 'Team & backers +1',
      },
    ],
    'Economic Design': [
      {
        name: 'Economic model originality',
        score: 2,
        desc: 'Economic model originality +2',
      },
      {
        name: 'How long the project survives with no hacks',
        score: 1,
        desc: 'How long the project survives with no hacks +1',
      },
    ],
    'Market Risk': [
      {
        name: 'How significant is expected Impermanent Loss',
        score: 4,
        desc: 'How significant is expected Impermanent Loss +4',
      },
      {
        name: 'Volatility',
        score: 4,
        desc: 'Volatility +4',
      },
      {
        name: 'Debt Position',
        score: 1,
        desc: 'Debt Position +1',
      },
      {
        name: 'Is the token instantly liquid',
        score: 2,
        desc: 'Is the token instantly liquid +2',
      },
      {
        name: 'Is insurance available',
        score: 0,
        desc: 'Is insurance available 0',
      },
      {
        name: 'Is unpeg possible?',
        score: 4,
        desc: 'Is unpeg possible +4',
      },
    ],
  },

  'sdai-gnosis': {
    'Tech Design Risk': [
      {
        name: 'Is the project audited',
        score: 2,
        desc: 'Is the project audited',
      },
      {
        name: 'Product architecture complexity',
        score: 2,
        desc: 'Product architecture complexity',
      },
      {
        name: 'Time lock',
        score: 2,
        desc: 'Time lock',
      },
      {
        name: 'Team & backers',
        score: 0,
        desc: 'Team & backers',
      },
    ],
    'Economic Design': [
      {
        name: 'Economic model originality',
        score: 2,
        desc: 'Economic model originality',
      },
      {
        name: 'How long the project survives with no hacks',
        score: -1,
        desc: 'How long the project survives with no hacks',
      },
    ],
    'Market Risk': [
      {
        name: 'How significant is expected Impermanent Loss',
        score: 4,
        desc: 'How significant is expected Impermanent Loss',
      },
      {
        name: 'Volatility',
        score: 4,
        desc: 'Volatility',
      },
      {
        name: 'Debt Position',
        score: 1,
        desc: 'Debt Position',
      },
      {
        name: 'Is the token instantly liquid',
        score: 2,
        desc: 'Is the token instantly liquid',
      },
      {
        name: 'Is insurance available',
        score: 0,
        desc: 'Is insurance available',
      },
      {
        name: 'Is unpeg possible?',
        score: 4,
        desc: 'Is unpeg possible',
      },
    ],
  },
};
