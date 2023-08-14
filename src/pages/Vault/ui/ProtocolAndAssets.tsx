import { memo } from 'react';
import { useTheme } from 'styled-components';

import { Block, Card } from '../../../shared/ui/Containers';
import { H3 } from '../../../shared/ui/Typography';

import { VaultEntity } from '../../../features/data/entities/vault';
import { selectVaultById } from '../../../features/data/selectors/vaults';

import { useAppSelector } from '../../../store';

import { TokenCard } from './TokenCard';

interface ProtocolAndAssetsProps {
  vaultId: VaultEntity['id'];
}

export const ProtocolAndAssets = memo<ProtocolAndAssetsProps>(({ vaultId }) => {
  const vault = useAppSelector(state => selectVaultById(state, vaultId));
  const { colors } = useTheme();

  return (
    <Card p="25px">
      <H3 m="0 0 24px" color={colors.alterText}>{`Vault's Protocol & Asset`}</H3>
      <Block>
        {vault.assetIds.map((tokenId, index, { length }) => (
          <TokenCard
            key={tokenId}
            chainId={vault.chainId}
            tokenId={tokenId}
            isLast={length - index === 1}
          />
        ))}
      </Block>
    </Card>
  );
});
