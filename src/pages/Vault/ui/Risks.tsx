import { FC, memo } from 'react';
import { useTheme } from 'styled-components';

import { Card, Circle, Column, Row, SvgContainer } from '../../../shared/ui/Containers';
import { H3, Main, SubTitle } from '../../../shared/ui/Typography';
import { icons } from '../../../shared/Icons';

import { RiskContainer } from './styled';

interface RiskCardProps {
  name: string;
  desc: string;
  icon: JSX.Element;
}

const RiskCard: FC<RiskCardProps> = ({ name, desc, icon }) => {
  const { colors } = useTheme();
  return (
    <Card p="20px 22px" bg={colors.alterBg} w="100%">
      <Row>
        <Circle
          w="36px"
          h="36px"
          align="center"
          justify="center"
          bg={colors.alterText}
          m="0 14px 0 0"
        >
          {icon}
        </Circle>
        <Column>
          <Row m="0 0 5px" align="center">
            <Main m="0 4px 0 0">{name}</Main>
            <SvgContainer size={12}>{icons.question}</SvgContainer>
          </Row>
          <SubTitle color={colors.alterText}>{desc}</SubTitle>
        </Column>
      </Row>
    </Card>
  );
};

export const Risks = memo(() => {
  const { colors } = useTheme();
  const { report, unpeg } = icons;

  const risks: RiskCardProps[] = [
    {
      name: 'Yield Token Volatility',
      desc: 'The main revenue comes from BAL and AURA tokens',
      icon: report,
    },
    {
      name: 'Unpeg',
      desc: 'auraBAL is not hard-pegged to B-80BAL-20WETH token.',
      icon: unpeg,
    },
    {
      name: 'Negative Funding Fee',
      desc: 'Historical modelling shows small negative influence (-3% pa) of funding rates',
      icon: report,
    },
  ];

  return (
    <Card p="25px" h="100%">
      <H3 m="0 0 24px" color={colors.alterText}>
        Potential Risks
      </H3>
      <RiskContainer>
        {risks.map(risk => (
          <RiskCard key={risk.name} {...risk} />
        ))}
      </RiskContainer>
    </Card>
  );
});
