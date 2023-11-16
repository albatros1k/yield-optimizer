export const MAX_SCORE = 10;

export const RISKS = {
  COMPLEXITY_LOW: {
    category: 'Categry-Beefy',
    score: 0,
    title: 'Complexity-Low-Titl',
    explanation: 'Complexity-Low-Expl',
    condition: 'Complexity-Low-Cond',
  },

  COMPLEXITY_MID: {
    category: 'Categry-Beefy',
    score: 0.3,
    title: 'Complexity-Mid-Titl',
    explanation: 'Complexity-Mid-Expl',
    condition: 'Complexity-Mid-Cond',
  },

  COMPLEXITY_HIGH: {
    category: 'Categry-Beefy',
    score: 0.5,
    title: 'Complexity-Hi-Titl',
    explanation: 'Complexity-Hi-Expl',
    condition: 'Complexity-Hi-Cond',
  },

  BATTLE_TESTED: {
    category: 'Categry-Beefy',
    score: 0,
    title: 'Testd-Battle-Titl',
    explanation: 'Testd-Battle-Expl',
    condition: 'Testd-Battle-Cond',
  },

  NEW_STRAT: {
    category: 'Categry-Beefy',
    score: 0.3,
    title: 'Testd-New-Titl',
    explanation: 'Testd-New-Expl',
    condition: 'Testd-New-Cond',
  },

  EXPERIMENTAL_STRAT: {
    category: 'Categry-Beefy',
    score: 0.7,
    title: 'Testd-Experimtl-Titl',
    explanation: 'Testd-Experimtl-Expl',
    condition: 'Testd-Experimtl-Cond',
  },

  IL_NONE: {
    category: 'Categry-Asset',
    score: 0,
    title: 'IL-None-Titl',
    explanation: 'IL-None-Expl',
    condition: 'IL-None-Cond',
  },

  IL_LOW: {
    category: 'Categry-Asset',
    score: 0.2,
    title: 'IL-Low-Titl',
    explanation: 'IL-Low-Expl',
    condition: 'IL-Low-Cond',
  },

  IL_HIGH: {
    category: 'Categry-Asset',
    score: 0.5,
    title: 'IL-High-Titl',
    explanation: 'IL-High-Expl',
    condition: 'IL-High-Cond',
  },

  ALGO_STABLE: {
    category: 'Categry-Asset',
    score: 0.9,
    title: 'IL-AlgoStable-Titl',
    explanation: 'IL-AlgoStable-Expl',
    condition: 'IL-AlgoStable-Cond',
  },

  PARTIAL_COLLAT_ALGO_STABLECOIN: {
    category: 'Categry-Asset',
    score: 0.21,
    title: 'PartialCollatAlgoStable-Titl',
    explanation: 'PartialCollatAlgoStable-Expl',
    condition: 'PartialCollatAlgoStable-Cond',
  },

  OVER_COLLAT_ALGO_STABLECOIN: {
    category: 'Categry-Asset',
    score: 0.15,
    title: 'OverCollatAlgoStable-Titl',
    explanation: 'OverCollatAlgoStable-Expl',
    condition: 'OverCollatAlgoStable-Cond',
  },

  LIQ_HIGH: {
    category: 'Categry-Asset',
    score: 0,
    title: 'Liquidt-High-Titl',
    explanation: 'Liquidt-High-Expl',
    condition: 'Liquidt-High-Cond',
  },

  LIQ_LOW: {
    category: 'Categry-Asset',
    score: 0.3,
    title: 'Liquidt-Low-Titl',
    explanation: 'Liquidt-Low-Expl',
    condition: 'Liquidt-Low-Cond',
  },

  MCAP_LARGE: {
    category: 'Categry-Asset',
    score: 0,
    title: 'MktCap-Large-Titl',
    explanation: 'MktCap-Large-Expl',
    condition: 'MktCap-Large-Cond',
  },

  MCAP_MEDIUM: {
    category: 'Categry-Asset',
    score: 0.1,
    title: 'MktCap-Mid-Titl',
    explanation: 'MktCap-Mid-Expl',
    condition: 'MktCap-Mid-Cond',
  },

  MCAP_SMALL: {
    category: 'Categry-Asset',
    score: 0.3,
    title: 'MktCap-Small-Titl',
    explanation: 'MktCap-Small-Expl',
    condition: 'MktCap-Small-Cond',
  },

  MCAP_MICRO: {
    category: 'Categry-Asset',
    score: 0.5,
    title: 'MktCap-Micro-Titl',
    explanation: 'MktCap-Micro-Expl',
    condition: 'MktCap-Micro-Cond',
  },

  SUPPLY_CENTRALIZED: {
    category: 'Categry-Asset',
    score: 1,
    title: 'Concentrated-Titl',
    explanation: 'Concentrated-Expl',
    condition: 'Concentrated-Cond',
  },

  PLATFORM_ESTABLISHED: {
    category: 'Categry-Platform',
    score: 0,
    title: 'Platfrm-Establshd-Titl',
    explanation: 'Platfrm-Establshd-Expl',
    condition: 'Platfrm-Establshd-Cond',
  },

  PLATFORM_NEW: {
    category: 'Categry-Platform',
    score: 0.5,
    title: 'Platfrm-New-Titl',
    explanation: 'Platfrm-New-Expl',
    condition: 'Platfrm-New-Cond',
  },

  NO_AUDIT: {
    category: 'Categry-Platform',
    score: 0.3,
    title: 'Platfrm-AuditNo-Titl',
    explanation: 'Platfrm-AuditNo-Expl',
    condition: 'Platfrm-AuditNo-Cond',
  },

  AUDIT: {
    category: 'Categry-Platform',
    score: 0,
    title: 'Platfrm-Audit-Titl',
    explanation: 'Platfrm-Audit-Expl',
    condition: 'Platfrm-Audit-Cond',
  },

  CONTRACTS_VERIFIED: {
    category: 'Categry-Platform',
    score: 0,
    title: 'Platfrm-Verified-Titl',
    explanation: 'Platfrm-Verified-Expl',
    condition: 'Platfrm-Verified-Cond',
  },

  CONTRACTS_UNVERIFIED: {
    category: 'Categry-Platform',
    score: 1,
    title: 'Platfrm-VerifiedNo-Titl',
    explanation: 'Platfrm-VerifiedNo-Expl',
    condition: 'Platfrm-VerifiedNo-Cond',
  },

  ADMIN_WITH_TIMELOCK: {
    category: 'Categry-Platform',
    score: 0,
    title: 'Platfrm-Timelock-Titl',
    explanation: 'Platfrm-Timelock-Expl',
    condition: 'Platfrm-Timelock-Cond',
  },

  ADMIN_WITH_SHORT_TIMELOCK: {
    category: 'Categry-Platform',
    score: 0.5,
    title: 'Platfrm-TimelockShort-Titl',
    explanation: 'Platfrm-TimelockShort-Expl',
    condition: 'Platfrm-TimelockShort-Cond',
  },

  ADMIN_WITHOUT_TIMELOCK: {
    category: 'Categry-Platform',
    score: 1,
    title: 'Platfrm-TimelockNo-Titl',
    explanation: 'Platfrm-TimelockNo-Expl',
    condition: 'Platfrm-TimelockNo-Cond',
  },
};

export const CATEGORIES = {
  'Categry-Beefy': 0.2,
  'Categry-Asset': 0.3,
  'Categry-Platform': 0.5,
};

export interface Risk {
  title: string;
  explanation: string;
}

export const POTENTIAL_RISKS: Record<string, Risk> = {
  YIELD_VOLATILITY: {
    title: 'Yield Token Volatility',
    explanation: 'The main revenue comes from BAL and AURA tokens',
  },
  UNPEG: {
    title: 'Unpeg',
    explanation: 'auraBAL is not hard-pegged to B-80BAL-20WETH token.',
  },
  FUNDING_FEE: {
    title: 'Negative Funding Fee',
    explanation: 'Historical modeling shows a small negative influence (-3% pa) of funding rates',
  },
  DAI_DEPEG: {
    title: 'Hack or Depeg',
    explanation:
      'DAI is a smart-contract that could be hacked. DAI as an asset could depeg from $1',
  },
  USDC_DEPEG: {
    title: 'Hack or Depeg',
    explanation:
      'USDC is a smart-contract that could be hacked. USDC as an asset could depeg from $1',
  },
  MAKER_HACK: {
    title: 'Hack or Debt',
    explanation:
      'MakerDAO is a complex protocol that could be hacked, or left with bad collateral in case of failure of liquidations.',
  },
  AAVE_HACK: {
    title: 'Hack or Debt',
    explanation:
      'Aave is a complex protocol that could be hacked, or left with bad collateral in case of failure of liquidations.',
  },
  LIQUIDATION: {
    title: 'Liquidation',
    explanation:
      'The strategy borrows USDC on Aave & uses it to get additional exposure to DAI’s DSR. In case of price diversion between assets the position could be liquidated.',
  },
  DAI_HACK: {
    title: 'Hack or Depeg',
    explanation:
      'DAI is a smart-contract that could be hacked. DAI as an asset could depeg from $1',
  },
  USDC_DAI_HACK: {
    title: 'Hack & Depeg',
    explanation:
      'DAI & USDC are smart-contracts that could be hacked. DAI & USDC as assets could depeg from $1',
  },
  GNOSIS_CHAIN_RISK: {
    title: 'Gnosis Chain Risk',
    explanation: 'Gnosis chain is a POS chain that is more recent & less established than Ethereum',
  },
  GNOSIS_BRIDGE_RISK: {
    title: 'Gnosis Bridge Risk',
    explanation: 'Bridges hold original users assets in custody, & could be hacked',
  },
  AGAVE_RISK: {
    title: 'Agave (Aave fork) hack or bad debt',
    explanation:
      'Agave is a complex protocol that could be hacked, or left with bad collateral in case of failure of liquidations.',
  },
};
