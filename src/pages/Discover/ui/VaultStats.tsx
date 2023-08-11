import { memo } from 'react';
import { useTheme } from 'styled-components';

import { icons } from '../../../shared/Icons';
import { Main } from '../../../shared/ui/Typography';
import { Grid, SvgContainer } from '../../../shared/ui/Containers';

import { Tvl } from './stats/Tvl';
import { Apy } from './stats/Apy';
import { Daily } from './stats/Daily';
import { SafetyScore } from './stats/SafetyScore';
import { AnimatedRow } from './styled';
import { useHistory } from 'react-router';

const { arrow } = icons;

export const VaultStats = memo<{ vaultId: string }>(({ vaultId }) => {
  const { colors } = useTheme();
  const history = useHistory();

  const goToDetails = (): void => history.push(`/vault/${vaultId}`);

  return (
    <Grid
      colTemplate="repeat(5, minmax(0, 1fr))"
      rowGap="none"
      colGap="20px"
      rowTemplate="none"
      w="100%"
    >
      <Apy vaultId={vaultId} />
      <Daily vaultId={vaultId} />
      <Tvl vaultId={vaultId} />
      <SafetyScore vaultId={vaultId} />
      <AnimatedRow align="center" pointer onClick={goToDetails}>
        <Main color={colors.alterText} m="0 20px 0 0">
          Vault Details
        </Main>
        <SvgContainer tf="rotate(-0.25turn)" size={14} stroke={colors.alterText} strokeWidth={2}>
          {arrow}
        </SvgContainer>
      </AnimatedRow>
    </Grid>
  );
});
