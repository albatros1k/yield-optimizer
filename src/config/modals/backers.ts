export type Backer = {
  backer: string;
  partnership: string;
  proof: string | null;
};

export const BACKERS: Record<string, Record<string, Backer[]>> = {
  'aave-bal-aura': {
    aave: [
      {
        backer: 'COIND',
        partnership: 'Seed Round - Aave',
        proof: 'https://www.crunchbase.com/organization/ethlend/company_financials',
      },
      {
        backer: 'DTC Capital',
        partnership: 'Initial Coin Offering - Aave',
        proof: null,
      },
      {
        backer: 'Framework Ventures',
        partnership: 'Initial Coin Offering - Aave',
        proof: null,
      },
      {
        backer: 'James Sowers',
        partnership: 'Secondary Market - Aave',
        proof: null,
      },
      {
        backer: 'Blockchain Capital',
        partnership: 'Venture Round - Aave',
        proof: null,
      },
      {
        backer: 'Blockchain.com Ventures',
        partnership: 'Venture Round - Aave',
        proof: null,
      },
      {
        backer: 'Standard Crypto',
        partnership: 'Venture Round - Aave',
        proof: null,
      },
      {
        backer: 'ParaFi Capital',
        partnership: 'Initial Coin Offering - Aave',
        proof: null,
      },
      {
        backer: 'Three Arrows Capital',
        partnership: 'Initial Coin Offering - Aave',
        proof: null,
      },
    ],
    balancer: [
      {
        backer: ' Alameda Research',
        partnership: 'Investor',
        proof: 'https://messari.io/asset/balancer/profile/investors',
      },
      {
        backer: ' Blockchain Capital',
        partnership: 'Investor',
        proof: 'https://messari.io/asset/balancer/profile/investors',
      },
      {
        backer: ' Defiance Capital',
        partnership: 'Investor',
        proof: 'https://messari.io/asset/balancer/profile/investors',
      },
      {
        backer: ' Pantera Capital',
        partnership: 'Investor',
        proof: 'https://messari.io/asset/balancer/profile/investors',
      },
      {
        backer: ' Three Arrows Capital',
        partnership: 'Investor',
        proof: 'https://messari.io/asset/balancer/profile/investors',
      },
      {
        backer: ' Accomplice',
        partnership: 'Investor',
        proof: 'https://messari.io/asset/balancer/profile/investors',
      },
      {
        backer: ' Fenbushi Capital',
        partnership: 'Investor',
        proof: 'https://messari.io/asset/balancer/profile/investors',
      },
    ],
  },
  'sdai-leverage': {
    MakerDAO: [
      {
        backer: 'Andreesen Horowitz',
        partnership: 'Investor',
        proof: 'https://a16z.com/',
      },
      {
        backer: 'Polychain Capital',
        partnership: 'Investor',
        proof: 'https://polychain.capital/',
      },
      {
        backer: 'Founders Fund',
        partnership: 'Investor',
        proof: 'https://www.foundersfund.com/',
      },
      {
        backer: 'Dragonfly Capital',
        partnership: 'Investor',
        proof: 'https://www.dcp.capital/',
      },
      {
        backer: 'Pantera Capital',
        partnership: 'Investor',
        proof: 'https://panteracapital.com/',
      },
      {
        backer: 'Coinbase Ventures',
        partnership: 'Investor',
        proof: 'https://ventures.coinbase.com/',
      },
    ],
    Aave: [
      {
        backer: 'Blockchain Capital',
        partnership: 'Investor',
        proof: 'https://blockchain.capital/',
      },
      {
        backer: 'Standard Crypto',
        partnership: 'Investor',
        proof: 'https://standardcrypto.com/',
      },
      {
        backer: 'Three Arrows Capital',
        partnership: 'Investor',
        proof: 'https://three-arrows.capital/',
      },
      {
        backer: 'ParaFi Capital',
        partnership: 'Investor',
        proof: 'https://parafi.capital/',
      },
      {
        backer: 'Framework Ventures',
        partnership: 'Investor',
        proof: 'https://framework.ventures/',
      },
    ],
  },
  'sdai-gnosis': {
    gnosis: [
      {
        backer: 'Blockchain Capital',
        partnership: 'Venture Capital',
        proof: null,
      },
      {
        backer: 'ConsenSys',
        partnership: 'Blockchain Technology Company',
        proof: null,
      },
      {
        backer: 'Pantera Capital',
        partnership: 'Cryptocurrency Investment Firm',
        proof: null,
      },
      {
        backer: 'Blockchain.com Ventures',
        partnership: 'Venture Arm of Blockchain.com',
        proof: null,
      },
    ],
    makerdao: [
      {
        backer: 'Andreesen Horowitz',
        partnership: 'Venture Capital Firm',
        proof: 'https://a16z.com/',
      },
      {
        backer: 'Polychain Capital',
        partnership: 'Cryptocurrency Investment Fund',
        proof: 'https://polychain.capital/',
      },
      {
        backer: 'Founders Fund',
        partnership: 'Venture Capital Firm',
        proof: 'https://www.foundersfund.com/',
      },
      {
        backer: 'Dragonfly Capital',
        partnership: 'Cryptocurrency Investment Firm',
        proof: 'https://www.dcp.capital/',
      },
      {
        backer: 'Pantera Capital',
        partnership: 'Cryptocurrency Investment Firm',
        proof: 'https://panteracapital.com/',
      },
      {
        backer: 'Coinbase Ventures',
        partnership: 'Venture Arm of Coinbase',
        proof: 'https://ventures.coinbase.com/',
      },
    ],
  },
};
