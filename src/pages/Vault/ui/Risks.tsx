import { FC, memo } from 'react';
import { useTheme } from 'styled-components';

import { Card, Circle, Column, Row } from '../../../shared/ui/Containers';
import { H3, Main, SubTitle } from '../../../shared/ui/Typography';
import { icons } from '../../../shared/Icons';

import { VaultEntity } from '../../../features/data/entities/vault';
import { selectVaultById } from '../../../features/data/selectors/vaults';

import { RiskContainer } from './styled';

import { useAppSelector } from '../../../store';
import { POTENTIAL_RISKS, Risk } from '../../../config/risk';

export const RiskCard: FC<Risk> = ({ title, explanation }) => {
  const { colors } = useTheme();
  const { report } = icons;

  return (
    <Card p="20px 22px" bg={colors.alterBg} w="100%">
      <Row w="100%">
        <Circle
          style={{ minWidth: 36 }}
          w="36px"
          h="36px"
          align="center"
          justify="center"
          bg={colors.alterText}
          m="0 14px 0 0"
        >
          {report}
        </Circle>
        <Column w="fit-content">
          <Row m="0 0 5px" align="center">
            <Main m="0 4px 0 0">{title}</Main>
          </Row>
          <SubTitle color={colors.alterText}>{explanation}</SubTitle>
        </Column>
      </Row>
    </Card>
  );
};

interface RisksProps {
  vaultId: VaultEntity['id'];
}

export const Risks = memo<RisksProps>(({ vaultId }) => {
  const vault = useAppSelector(state => selectVaultById(state, vaultId));
  const { colors } = useTheme();

  const risks = vault.risks.map(key => POTENTIAL_RISKS[key]).filter(Boolean);

  return (
    <Card p="25px" h="100%">
      <H3 m="0 0 24px" color={colors.alterText}>
        Potential Risks
      </H3>
      <RiskContainer>
        {risks.map(risk => (
          <RiskCard key={risk.title} {...risk} />
        ))}
      </RiskContainer>
    </Card>
  );
});
