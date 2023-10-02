/* eslint-disable @typescript-eslint/no-unused-vars */
import { memo, useMemo } from 'react';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../../../store';

import { Card, Column, Grid } from '../../../shared/ui/Containers';
import { H3, SubTitle } from '../../../shared/ui/Typography';

import { selectVaultById } from '../../../features/data/selectors/vaults';
import { selectChainById } from '../../../features/data/selectors/chains';
import { selectPlatformById } from '../../../features/data/selectors/platforms';
import { selectTokenByAddress } from '../../../features/data/selectors/tokens';
import { VaultEntity, VaultStandard } from '../../../features/data/entities/vault';

const steps = [
  'Deposit USDC into AAVE',
  'Borrow ETH & BAL from AAVE',
  'Deposit ETH & BAL into the Balancer B-80BAL-20ETH pool',
  'Deposit B-80BAL-20ETH into the auraBAL Stable pool',
  'Stake the B-80BAL-20ETH/auraBAL into Aura',
];

interface AboutStrategyProps {
  vaultId: VaultEntity['id'];
}

export const AboutStrategy = memo<AboutStrategyProps>(({ vaultId }) => {
  const vault = useAppSelector(state => selectVaultById(state, vaultId)) as VaultStandard;
  const chain = useAppSelector(state => selectChainById(state, vault.chainId));
  const vaultPlatform = useAppSelector(state => selectPlatformById(state, vault.platformId));
  const depositToken = useAppSelector(state =>
    selectTokenByAddress(state, vault.chainId, vault.depositTokenAddress)
  );
  const depositTokenProvider = useAppSelector(state =>
    depositToken.providerId ? selectPlatformById(state, depositToken.providerId) : null
  );
  const vaultPlatformName = vaultPlatform.name;
  const depositTokenProviderName = depositTokenProvider ? depositTokenProvider.name : null;
  const assets = vault.assetIds;
  const depositTokenName = depositToken.symbol;
  const chainName = chain.name;
  const chainNativeToken = chain.walletSettings.nativeCurrency.symbol;
  const { colors } = useTheme();
  const { t, i18n } = useTranslation();

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

  let i18nKey = `StrategyDescription-${vault.strategyTypeId}`;
  if (!i18n.exists(i18nKey, { ns: 'risks' })) {
    i18nKey = 'StrategyDescription-default';
  }

  return (
    <Card p="25px" w="100%">
      <H3 color={colors.alterText} m="0 0 24px">
        About Strategy
      </H3>
      <Grid
        w="100%"
        colTemplate="repeat(2,1fr)"
        rowTemplate="auto"
        colGap="60px"
        rowGap="none"
        minH="auto"
      >
        <Column h="100%">
          <SubTitle>
            The user will deposit / withdraw USDC and will receive rewards in form of USDC. The
            investment opportunity pays return on capital provided to the Balancer
            B-80BAL-20ETH/auraBAL pool and then staked in Aura Finance to get boosted return.
          </SubTitle>
          <SubTitle m="10px 0 ">
            Main rewards are provided both by Balancer protocol and Aura Finance in form of BAL and
            AURA tokens. Also there is negligible rewards from trading fees.
          </SubTitle>
          <SubTitle>
            There is an automated mechanim to monitor and rebalance the strategy under certain
            conditions, making sure the strategy remains healthy over time.
          </SubTitle>
        </Column>
        <Column h="100%">
          <SubTitle m="0 0 10px">There are {steps.length} steps in the strategy:</SubTitle>
          {steps.map((step, index) => (
            <SubTitle key={step} m="0 0 7px">
              {index + 1}. {step}
            </SubTitle>
          ))}
        </Column>
      </Grid>
    </Card>
  );
});
