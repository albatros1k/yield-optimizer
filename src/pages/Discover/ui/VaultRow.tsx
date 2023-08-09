import { memo } from 'react';
import { useTheme } from 'styled-components';

import { Block, Grid } from '../../../shared/ui/Containers';

import { VaultIdentity } from './VaultIdentity';
import { VaultStats } from './VaultStats';

interface VaultRowProps {
  vaultId: string;
}

export const VaultRow = memo<VaultRowProps>(({ vaultId }) => {
  const { colors } = useTheme();
  return (
    <Block bg={colors.alterBg} p="17px 25px" w="100%" style={{ borderBottom: '1px solid #3C3F59' }}>
      <Grid
        colTemplate="minmax(0, 30fr) minmax(0, 70fr)"
        rowGap="0px"
        colGap="20px"
        rowTemplate="none"
        w="100%"
      >
        <VaultIdentity vaultId={vaultId} />
        <VaultStats vaultId={vaultId} />
      </Grid>
    </Block>
  );
});
