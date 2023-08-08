import { FC, memo, useMemo } from 'react';
import { useTheme } from 'styled-components';
import { capitalize } from 'lodash-es';
import { useHistory } from 'react-router';

import { icons } from '../../../shared/Icons';
import { Line } from '../../../shared/ui/Spacer';
import { CircleImage } from '../../../shared/ui/Images';
import { ButtonText, H3, SubTitle } from '../../../shared/ui/Typography';
import { Block, Card, Column, Row, SvgContainer } from '../../../shared/ui/Containers';

import { selectVaultById } from '../../../features/data/selectors/vaults';
import { selectPlatformById } from '../../../features/data/selectors/platforms';
import { selectLpBreakdownByAddress } from '../../../features/data/selectors/tokens';
import { useCalculatedBreakdown } from '../../../features/vault/components/LiquidityPoolBreakdown/hooks';
import { ApyTag, DailyTag, Tvl } from '../../../new-features/Tags';

import { useAppSelector } from '../../../store';

import { getNetworkSrc } from '../../../helpers/networkSrc';
import { punctuationWrap } from '../../../helpers/string';
import { formatPercent } from '../../../helpers/format';

import { AssetsImage } from '../../../components/AssetsImage';

const { arrow } = icons;

interface VaultProps {
  vaultId: string;
}

export const Vault: FC<VaultProps> = memo(({ vaultId }) => {
  const vault = useAppSelector(state => selectVaultById(state, vaultId));
  const platform = useAppSelector(state => selectPlatformById(state, vault.platformId));
  const breakdown = useAppSelector(state =>
    selectLpBreakdownByAddress(state, vault.chainId, vault.depositTokenAddress)
  );

  const calculatedBreakdown = useCalculatedBreakdown(vault, breakdown);

  const percentage = useMemo(
    () => calculatedBreakdown.assets.map(({ percent }) => formatPercent(percent)).join(' / '),
    [calculatedBreakdown]
  );

  const {
    colors: { alterText, bgColor },
  } = useTheme();

  const history = useHistory();

  const goToDetails = (): void => history.push(`/vault/${vaultId}`);

  return (
    <Card w="calc(33% - 13px)" overflowHidden pointer onClick={goToDetails}>
      <Block w="100%" p="20px" bg="linear-gradient(191deg, #222446 0%, #272845 100%)">
        <Row>
          <Card bg={bgColor} w="fit-content" p="8px 10px" m="0 10px 0 0">
            <Row align="center">
              <CircleImage
                src={getNetworkSrc(vault.chainId)}
                alt={vault.chainId}
                w="10px"
                h="10px"
                m="0 4px 0 0"
              />
              <SubTitle>{capitalize(vault.chainId)}</SubTitle>
            </Row>
          </Card>
          <Card bg={bgColor} w="fit-content" p="8px 10px">
            <SubTitle>{platform.name}</SubTitle>
          </Card>
        </Row>
        <Row m="12px 0">
          <ApyTag vaultId={vaultId} margin="0 10px 0 0" />
          <DailyTag vaultId={vaultId} />
        </Row>
        <Tvl vaultId={vaultId} />
      </Block>
      <Block p="27px 19px 30px">
        <Row align="center">
          <AssetsImage assetIds={vault.assetIds} chainId={vault.chainId} size={54} />
          <Column h="100%" justify="space-between" m="0 0 0 12px">
            <H3>{punctuationWrap(vault.name)}</H3>
            <SubTitle color={alterText}>{percentage}</SubTitle>
          </Column>
        </Row>
      </Block>
      <Line color={bgColor} />
      <Row w="100%" p="14px 20px" justify="space-between">
        <ButtonText color={alterText}>Vault Details</ButtonText>
        <SvgContainer stroke={alterText} tf="rotate(-0.25turn)">
          {arrow}
        </SvgContainer>
      </Row>
    </Card>
  );
});
