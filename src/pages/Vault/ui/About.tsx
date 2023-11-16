import { Fragment, memo, useMemo } from 'react';
import { capitalize } from 'lodash-es';
import { useTheme } from 'styled-components';

import { icons } from '../../../shared/Icons';
import { Button } from '../../../shared/ui/Buttons';
import { CircleImage } from '../../../shared/ui/Images';
import { Caption, H1, H3, Main, SubTitle } from '../../../shared/ui/Typography';
import { Block, Card, Column, Grid, Row, SvgContainer } from '../../../shared/ui/Containers';

import { selectVaultById } from '../../../features/data/selectors/vaults';
import { VaultEntity, VaultStandard } from '../../../features/data/entities/vault';

import { useAppSelector } from '../../../store';
import { AssetsImage } from '../../../components/AssetsImage';

import { Daily } from '../../Discover/ui/stats/Daily';
import { Apy } from '../../Discover/ui/stats/Apy';
import { Tvl } from '../../Discover/ui/stats/Tvl';
import { YourDeposit } from '../../Discover/ui/stats/YourDeposit';

import { punctuationWrap } from '../../../helpers/string';
import { getNetworkSrc } from '../../../helpers/networkSrc';
import { SafetyScore } from './Modals/SafetyScore';
import { useToggle } from '../../../helpers/hooks';
import { ABOUT } from '../../../config/about';
import { SAFETY_SCORE } from '../../../config/modals/safety-score';

interface AboutProps {
  vaultId: VaultEntity['id'];
}

export const About = memo<AboutProps>(({ vaultId }) => {
  const vault = useAppSelector(state => selectVaultById(state, vaultId)) as VaultStandard;
  const [modalOpen, toggleModalOpen] = useToggle();

  const { colors } = useTheme();
  const { maximize } = icons;

  const { description } = useMemo(() => ABOUT[vaultId], [vaultId]);
  const safetyScore = useMemo(() => SAFETY_SCORE[vaultId] || {}, [vaultId]);

  const totalSafetyScore = useMemo<number>(
    () =>
      Object.values(safetyScore)
        .flat()
        .reduce((acc, { score }) => (acc += score), 0),
    [safetyScore]
  );

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
            <H1 m="0 0 0 10px">{punctuationWrap(vault.name)}</H1>
          </Row>
          <Caption color={colors.alterText} m="0 0 6px">
            Vault Description
          </Caption>
          <SubTitle m="0 0 24px">{description}</SubTitle>
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
            {vault.protocols.map(protocol => (
              <Card key={protocol} bg={colors.alterHelp} w="fit-content" p="5px 8px" m="0 10px 0 0">
                <SubTitle>{capitalize(protocol)}</SubTitle>
              </Card>
            ))}
          </Row>
        </Block>
        <Block w="100%" p="25px" bg={colors.alterBg}>
          <Grid
            w="100%"
            colTemplate="repeat(4,1fr)"
            rowTemplate="none"
            colGap="10px"
            rowGap="0px"
            align="flex-start"
          >
            <Column>
              <Caption color={colors.alterText} m="0 0 6px">
                Current APY
              </Caption>
              <Row align="center">
                <Apy vaultId={vaultId} typography={H1} margin="0 6px 0 0" />
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
            <Column>
              <Caption color={colors.alterText} m="0 0 6px">
                Your Deposit
              </Caption>
              <YourDeposit vaultId={vaultId} typography={H1} margin="0 6px 0 0" />
            </Column>
          </Grid>
        </Block>
      </Card>
      <SafetyScore vaultId={vaultId} isModalOpen={modalOpen} closeModal={toggleModalOpen} />
    </Fragment>
  );
});
