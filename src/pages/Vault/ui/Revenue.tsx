import { memo } from 'react';
import { useTheme } from 'styled-components';

import { Card } from '../../../shared/ui/Containers';
import { H3 } from '../../../shared/ui/Typography';
import { icons } from '../../../shared/Icons';

import { RiskContainer } from './styled';
import { RiskCard, RiskCardProps } from './Risks';

export const Revenue = memo(() => {
  const { colors } = useTheme();
  const { report } = icons;

  const risks: RiskCardProps[] = [
    {
      name: 'Main Revenue Source',
      desc: 'The main source of revenue are incentives from Balancer (BAL tokens) and Aura Finance (AURA tokens)',
      icon: report,
    },
    {
      name: 'Yield Size',
      desc: `Emission of BAL tokens 145,000 per week (last update was at 13 February 2022) with once-per-4-years halvings. BAL tokens are divided between pools based on voting by veBAL holders on weekly basis. Currently the B-80BAL-20ETH/ auraBAL pool gets about 6% of all BAL allocation.
			AURA token’s distribution is linked to BAL distribution. LPs who staked BLP tokens on Aura Finance initially got 3.9 AURA token per 1 BAL but this ratio will decrease down to 1.4 AURA per BAL with AURA token supply growth. `,
      icon: report,
    },
    {
      name: 'Duration',
      desc: 'The incentive tokens have a hard cap however continuously decreasing distribution of BAL tokens (and corresponding distribution of AURA) makes incentives program duration very long (example of BAL distribution).',
      icon: report,
    },
    {
      name: 'Reward Distribution Frequency',
      desc: 'BAL tokens accrued each block, corresponding amount of AURA distributed when harvesting BAL',
      icon: report,
    },
    {
      name: 'Additional Revenue',
      desc: 'Trading fees 2.62% APY',
      icon: report,
    },
  ];

  return (
    <Card p="25px" h="100%">
      <H3 m="0 0 24px" color={colors.alterText}>
        Revenue model
      </H3>
      <RiskContainer>
        {risks.map(risk => (
          <RiskCard key={risk.name} {...risk} />
        ))}
      </RiskContainer>
    </Card>
  );
});
