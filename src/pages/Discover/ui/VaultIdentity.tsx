import { memo } from 'react';
import { capitalize } from 'lodash-es';
import { useTheme } from 'styled-components';

import { CircleImage } from '../../../shared/ui/Images';
import { Caption, Main } from '../../../shared/ui/Typography';
import { Card, Column, Row } from '../../../shared/ui/Containers';

import { selectPlatformById } from '../../../features/data/selectors/platforms';
import { selectVaultById } from '../../../features/data/selectors/vaults';

import { useAppSelector } from '../../../store';
import { punctuationWrap } from '../../../helpers/string';
import { getNetworkSrc } from '../../../helpers/networkSrc';
import { AssetsImage } from '../../../components/AssetsImage';

export const VaultIdentity = memo<{ vaultId: string }>(({ vaultId }) => {
  const vault = useAppSelector(state => selectVaultById(state, vaultId));
  const platform = useAppSelector(state => selectPlatformById(state, vault.platformId));
  const { colors } = useTheme();

  return (
    <Row>
      <AssetsImage assetIds={vault.assetIds} chainId={vault.chainId} size={48} />
      <Column h="100%" justify="space-between" m="0 0 0 14px">
        <Main m="0 0 8px">{punctuationWrap(vault.name)}</Main>
        <Row>
          <Card bg={colors.alterHelp} w="fit-content" p="3px 7px" m="0 10px 0 0">
            <Row align="center">
              <CircleImage
                src={getNetworkSrc(vault.chainId)}
                alt={vault.chainId}
                w="10px"
                h="10px"
                m="0 4px 0 0"
              />
              <Caption>{capitalize(vault.chainId)}</Caption>
            </Row>
          </Card>
          <Card bg={colors.alterHelp} w="fit-content" p="3px 7px" m="0 10px 0 0">
            <Caption>{platform.name}</Caption>
          </Card>
        </Row>
      </Column>
    </Row>
  );
});
