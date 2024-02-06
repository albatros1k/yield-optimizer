import { FC, memo, useMemo } from 'react';
import { useTheme } from 'styled-components';

import { Card, Row } from '../../../shared/ui/Containers';
import { SubTitle } from '../../../shared/ui/Typography';

import { useAppSelector } from '../../../store';
import { TagProps } from '../types/tag';

import { selectVaultById } from '../../../features/data/selectors/vaults';
import { selectVaultTvl } from '../../../features/data/selectors/tvl';
import { formatBigUsd } from '../../../helpers/format';

export const Tvl: FC<TagProps> = memo(({ vaultId }) => {
  const vault = useAppSelector(state => selectVaultById(state, vaultId));
  const tvl = useAppSelector(state => selectVaultTvl(state, vaultId));
  const { byChainId, global } = useAppSelector(state => state.ui.dataLoader);

  const isLoaded = useMemo<boolean>(
    () =>
      byChainId[vault.chainId]?.contractData.alreadyLoadedOnce && global.prices.alreadyLoadedOnce,
    [byChainId, global, vault.chainId]
  );

  const value = useMemo<string>(() => (isLoaded ? formatBigUsd(tvl) : '...'), [isLoaded, tvl]);

  const {
    colors: { bgColor, alterText },
  } = useTheme();
  return (
    <Card bg={bgColor} w="fit-content" p="8px 10px">
      <Row>
        <SubTitle color={alterText} m="0 6px 0 0">
          TVL:
        </SubTitle>
        <SubTitle>{value}</SubTitle>
      </Row>
    </Card>
  );
});
