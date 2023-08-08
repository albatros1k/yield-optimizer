import { FC, Fragment, memo, useMemo } from 'react';
import { useTheme } from 'styled-components';
import { capitalize } from 'lodash-es';
// import { Link } from 'react-router-dom';

import { icons } from '../../../shared/Icons';
import { Line } from '../../../shared/ui/Spacer';
import { CircleImage } from '../../../shared/ui/Images';
import { ButtonText, H2, H3, SubTitle } from '../../../shared/ui/Typography';
import { Block, Card, Column, Row, SvgContainer } from '../../../shared/ui/Containers';

import { selectVaultById } from '../../../features/data/selectors/vaults';
import { selectVaultsByTvl } from '../../../features/data/selectors/tvl';
import { selectPlatformById } from '../../../features/data/selectors/platforms';
import { ApyTag, DailyTag } from '../../../new-features/Tags';

import { useAppSelector } from '../../../store';

import { getNetworkSrc } from '../../../helpers/networkSrc';
import { punctuationWrap } from '../../../helpers/string';

const { question, arrow } = icons;

interface BestVaultsProps {}

export const BestVaults: FC<BestVaultsProps> = memo(() => {
  const vaultsByTvl = useAppSelector(selectVaultsByTvl);

  const bestVaults = useMemo<JSX.Element[]>(
    () =>
      Object.entries(vaultsByTvl)
        .sort((a, b) => Number(b[1].tvl) - Number(a[1].tvl))
        .map(([vaultId]) => <Vault key={vaultId} vaultId={vaultId} />),
    [vaultsByTvl]
  );

  return (
    <Fragment>
      <Row align="center" m="0 0 32px">
        <H2 m="0 12px 0 0">Best Vaults This Week</H2>
        {question}
      </Row>
      <Row w="100%" justify="space-between">
        {bestVaults}
      </Row>
    </Fragment>
  );
});

interface VaultProps {
  vaultId: string;
}

export const Vault: FC<VaultProps> = ({ vaultId }) => {
  const vault = useAppSelector(state => selectVaultById(state, vaultId));
  const platform = useAppSelector(state => selectPlatformById(state, vault.platformId));

  const {
    colors: { alterText, bgColor },
  } = useTheme();

  return (
    // <Link to={`/vault/${vaultId}`}>
    <Card w="calc(33% - 13px)" overflowHidden pointer>
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

        <Card bg={bgColor} w="fit-content" p="8px 10px">
          <Row>
            <SubTitle color={alterText} m="0 6px 0 0">
              TVL:
            </SubTitle>
            <SubTitle>$13,492,302</SubTitle>
          </Row>
        </Card>
      </Block>

      <Block p="27px 19px 30px">
        <Row>
          <Column>
            <H3 m="0 0 4px">{punctuationWrap(vault.name)}</H3>
            <SubTitle color={alterText}>48% / 52%</SubTitle>
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
    // </Link>
  );
};
