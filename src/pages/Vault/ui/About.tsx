/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fragment, memo, useMemo } from 'react';
import { capitalize } from 'lodash-es';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';

import { icons } from '../../../shared/Icons';
import { Button } from '../../../shared/ui/Buttons';
import { CircleImage } from '../../../shared/ui/Images';
import { Caption, H1, H3, Main, SubTitle } from '../../../shared/ui/Typography';
import { Block, Card, Column, Grid, Row, SvgContainer } from '../../../shared/ui/Containers';

import { selectVaultById } from '../../../features/data/selectors/vaults';
import { selectChainById } from '../../../features/data/selectors/chains';
import { selectPlatformById } from '../../../features/data/selectors/platforms';
import { selectTokenByAddress } from '../../../features/data/selectors/tokens';
import { VaultEntity, VaultStandard, isGovVault } from '../../../features/data/entities/vault';

import { useAppSelector } from '../../../store';
import { AssetsImage } from '../../../components/AssetsImage';

import { Daily } from '../../Discover/ui/stats/Daily';
import { Apy } from '../../Discover/ui/stats/Apy';
import { Tvl } from '../../Discover/ui/stats/Tvl';

import { punctuationWrap } from '../../../helpers/string';
import { getNetworkSrc } from '../../../helpers/networkSrc';
import { SafetyScore } from './Modals/SafetyScore';
import { useToggle } from '../../../helpers/hooks';
import { totalSafetyScore } from '../lib/safety';

interface AboutProps {
  vaultId: VaultEntity['id'];
}

export const About = memo<AboutProps>(({ vaultId }) => {
  const vault = useAppSelector(state => selectVaultById(state, vaultId)) as VaultStandard;
  const chain = useAppSelector(state => selectChainById(state, vault.chainId));
  const vaultPlatform = useAppSelector(state => selectPlatformById(state, vault.platformId));
  const depositToken = useAppSelector(state =>
    selectTokenByAddress(state, vault.chainId, vault.depositTokenAddress)
  );
  const depositTokenProvider = useAppSelector(state =>
    depositToken.providerId ? selectPlatformById(state, depositToken.providerId) : null
  );
  const [modalOpen, toggleModalOpen] = useToggle();
  const vaultPlatformName = vaultPlatform.name;
  const depositTokenProviderName = depositTokenProvider ? depositTokenProvider.name : null;
  const assets = vault.assetIds;
  const depositTokenName = depositToken.symbol;
  const chainName = chain.name;
  const chainNativeToken = chain.walletSettings.nativeCurrency.symbol;
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();

  const usedProtocols: string[] = ['Aave', 'Balancer', 'Aura'];

  let i18nKey = `StrategyDescription-${vault.strategyTypeId}`;
  if (!i18n.exists(i18nKey, { ns: 'risks' })) {
    i18nKey = 'StrategyDescription-default';
  }

  const options = useMemo(() => {
    const opts = {
      vaultPlatform: vaultPlatformName,
      depositToken: depositTokenName,
      depositTokenProvider: depositTokenProviderName,
      chain: chainName,
      nativeToken: chainNativeToken,
      ns: 'risks',
    };

    for (const i in assets) {
      opts[`asset${i}`] = assets[i];
    }

    return opts;
  }, [
    vaultPlatformName,
    assets,
    depositTokenName,
    depositTokenProviderName,
    chainName,
    chainNativeToken,
  ]);

  const { question, maximize } = icons;

  return (
    <Fragment>
      <Card w="100%" h="100%">
        <Block p="25px">
          <Row align="center" justify="space-between" m="0 0 21px">
            <H3 color={colors.alterText}>About</H3>
            <Row align="center">
              <Button
                h="32px"
                p="6px 14px"
                bg={colors.subAccentSecondary}
                onClick={toggleModalOpen}
              >
                <Row align="center">
                  <Main m="0 6px 0 0">Safety Score: {totalSafetyScore}</Main>
                  <SvgContainer stroke={colors.textColor} size={12}>
                    {maximize}
                  </SvgContainer>
                </Row>
              </Button>
            </Row>
          </Row>
          <Row align="center" m="0 0 20px">
            <AssetsImage assetIds={[vault.assetIds[0]]} size={40} chainId={vault.chainId} />
            <H1 m="0 0 0 10px">{'USDC booster - AuraBAL' || punctuationWrap(vault.name)}</H1>
          </Row>
          <Caption color={colors.alterText} m="0 0 6px">
            Vault Description
          </Caption>
          <SubTitle m="0 0 24px">
            {`The vault deposits the USDC in Aave, borrows WETH and BAL assets to add liquidity in
            Balancer and farms in Aura for more USDC. The earned USDC is then deposited back into
            the vault. The transaction cost required to do all this is socialized among the vault's
            users.`}
          </SubTitle>
          <Row>
            <Card bg={colors.alterHelp} w="fit-content" p="5px 8px" m="0 10px 0 0">
              <Row align="center">
                <CircleImage
                  src={getNetworkSrc(vault.chainId)}
                  alt={vault.chainId}
                  w="12px"
                  h="12px"
                  m="0 6px 0 0"
                />
                <SubTitle>{capitalize(vault.chainId)}</SubTitle>
              </Row>
            </Card>
            {usedProtocols.map(protocol => (
              <Card key={protocol} bg={colors.alterHelp} w="fit-content" p="5px 8px" m="0 10px 0 0">
                <SubTitle>{protocol}</SubTitle>
              </Card>
            ))}
          </Row>
        </Block>

        <Block w="100%" p="25px" bg={colors.alterBg}>
          <Grid w="100%" colTemplate="repeat(3,1fr)" rowTemplate="none" colGap="10px" rowGap="0px">
            <Column>
              <Caption color={colors.alterText} m="0 0 6px">
                Current APY
              </Caption>
              <Row align="center">
                <Apy vaultId={vaultId} typography={H1} margin="0 6px 0 0" />
                <SvgContainer size={16}>{question}</SvgContainer>
              </Row>
            </Column>
            <Column>
              <Caption color={colors.alterText} m="0 0 6px">
                Daily APY
              </Caption>
              <Daily vaultId={vaultId} typography={H1} margin="0 6px 0 0" />
            </Column>
            <Column>
              <Caption color={colors.alterText} m="0 0 6px">
                TVL
              </Caption>
              <Tvl vaultId={vaultId} typography={H1} margin="0 6px 0 0" />
            </Column>
          </Grid>
        </Block>
      </Card>
      <SafetyScore isModalOpen={modalOpen} closeModal={toggleModalOpen} />
    </Fragment>
  );
});
