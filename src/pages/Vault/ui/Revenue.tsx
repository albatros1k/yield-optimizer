import { memo } from 'react';
import { useTheme } from 'styled-components';

import { Card } from '../../../shared/ui/Containers';
import { H3 } from '../../../shared/ui/Typography';

import { VaultEntity } from '../../../features/data/entities/vault';
import { selectVaultById } from '../../../features/data/selectors/vaults';
import { useAppSelector } from '../../../store';

import { RiskContainer } from './styled';
import { RiskCard } from './Risks';

import { REVENUE } from '../../../config/revenue';

interface RevenueProps {
  vaultId: VaultEntity['id'];
}

export const Revenue = memo<RevenueProps>(({ vaultId }) => {
  const vault = useAppSelector(state => selectVaultById(state, vaultId));
  const { colors } = useTheme();

  const revenue = vault.revenue.map(key => REVENUE[key]).filter(Boolean);

  return (
    <Card p="25px" h="100%">
      <H3 m="0 0 24px" color={colors.alterText}>
        Revenue model
      </H3>
      <RiskContainer>
        {revenue.map(risk => (
          <RiskCard key={risk.title} {...risk} />
        ))}
      </RiskContainer>
    </Card>
  );
});
