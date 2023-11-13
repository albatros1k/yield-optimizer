export interface About {
  steps: string[];
  description: string;
  explanation: string[];
}

// Key is always vaultId from the configuration
export const ABOUT: Record<string, About> = {
  'aave-bal-aura': {
    steps: [
      'Deposit USDC into AAVE',
      'Borrow ETH & BAL from AAVE',
      'Deposit ETH & BAL into the Balancer B-80BAL-20ETH pool',
      'Deposit B-80BAL-20ETH into the auraBAL Stable pool',
      'Stake the B-80BAL-20ETH/auraBAL into Aura',
    ],
    description:
      "The vault deposits the USDC in Aave, borrows WETH and BAL assets to add liquidity in Balancer and farms in Aura for more USDC. The earned USDC is then deposited back into the vault. The transaction cost required to do all this is socialized among the vault's users.",
    explanation: [
      'The user will deposit / withdraw USDC and will receive rewards in form of USDC. The investment opportunity pays return on capital provided to the Balancer B-80BAL-20ETH/auraBAL pool and then staked in Aura Finance to get boosted return.',
      'Main rewards are provided both by Balancer protocol and Aura Finance in form of BAL and AURA tokens. Also there is negligible rewards from trading fees.',
      'There is an automated mechanism to monitor and rebalance the strategy under certain conditions, making sure the strategy remains healthy over time.',
    ],
  },
  'sdai-leverage': {
    steps: [
      'Deposit DAI in Vault',
      'Deposit DAI in DSR',
      'Deposit sDAI received in Aave v3',
      'Borrow USDC - LTV 76%',
      'Sell USDC for DAI via PSM',
      'Deposit more in DSR',
      'Loop 4x',
      'Deposit last DAI and get LTV 68%',
      'Monitor through Bot',
    ],
    description:
      'The sDAI/DAI-USDC Strategy is a DeFi investment strategy designed for those seeking a straightforward yet potentially rewarding yield generation strategy. This strategy focuses on a moderate risk profile, harnessing the stability of these two very much correlated assets, investors to improvement on the base yield paid by the DSR.',
    explanation: [
      'DSR - Leveraged (USDC):',
      'The vault deposits the DAI in the Maker DSR which is currently paying 5% yield on DAI, takes the subsequent sDAI received and deposits it on Aave.',
      'The vault then borrows USDC, converts it to DAI & deposits again to the DSR for several loops.',
    ],
  },
  'sdai-gnosis': {
    steps: [
      'Deposit DAI in Vault',
      'DAI bridged to Gnosis Chain',
      'DAI deposited in sDAI on Agave',
    ],
    description:
      "The Agave sDAI Gnosis Chain strategy is a DeFi investment strategy designed to achieve higher yields than DAI-DSR by utilizing Agave's sDAI distribution on DAI in the Gnosis Bridge. It emphasizes moderate risk, leveraging DAI's stability, Agave (an Aave fork), and the trusted Gnosis team to enhance DSR's base yield.",
    explanation: [
      'The Agave sDAI Gnosis Chain strategy is a DeFi investment strategy designed to provide a higher yield than normal DAI-DSR exposure by leveraging Agave’s sDAI distribution on the DAI held in the Gnosis Bridge.',
      'This strategy focuses on a moderate risk profile, harnessing the stability of DAI, Agave (an Aave fork), and the trusted team behind Gnosis to improve on the base yield paid by the DSR.',
      'It aims to achieve higher returns while still maintaining a reasonable level of risk, making it an attractive option for those seeking a balance between yield and security in their DeFi investments.',
    ],
  },
};
