import { memo } from 'react';
import { useTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ENSName } from 'react-ens-name';

import { Circle, Column, Row } from '../../../shared/ui/Containers';
import { ButtonText, H1, Main } from '../../../shared/ui/Typography';
import { Button } from '../../../shared/ui/Buttons';
import { Loading } from '../../../shared/ui/Loaders';
import { Label } from '../../../shared/ui/Labels';

import { selectGalaxyPoints } from '../../../features/data/selectors/points';

import { ClaimNFT, RocketCard } from './styled';
import { useAppSelector } from '../../../store';

import star from '../../../images/nav-icons/star.png';

export const NftBoost = memo(() => {
  const { colors } = useTheme();
  const { points, rank, address, loading, nft: galaxyNft } = useAppSelector(selectGalaxyPoints);
  const navigate = useNavigate();

  const getMoreStardust = () =>
    window.open(`https://galxe.com/odysea`, '_blank', 'noopener,noreferrer');

  const completeMissions = () => navigate(`/leaderboard`);

  return (
    <RocketCard p="37px 40px" h="100%">
      <Row align="stretch">
        <Circle
          p="5px"
          style={{
            border: `1px solid ${galaxyNft ? colors.subAccentMain : colors.subAccentSecondary}`,
          }}
        >
          {loading ? (
            <Loading />
          ) : (
            <ClaimNFT
              url={galaxyNft ? galaxyNft.image : star}
              w="100px"
              h="100px"
              bg={galaxyNft ? colors.alterBg : '#10B981'}
            >
              <ButtonText ta="center">
                Claim <br /> Free NFT
              </ButtonText>
            </ClaimNFT>
          )}
        </Circle>
        <Column justify="space-around" m="0 0 0 24px">
          <H1>
            <ENSName address={address.address} />
          </H1>
          <Row align="center">
            <Main color={colors.alterText}>Stardust:</Main>
            <Main m="0 6px 0 3px">{points}</Main>
            {galaxyNft && <Label value="x1.5" />}
          </Row>
          <Row>
            <Main color={colors.alterText} m="0 3px 0 0">
              Rank:
            </Main>
            <Main>{rank}</Main>
          </Row>
        </Column>
      </Row>
      <Row w="100%" justify="space-between" m="30px 0 0">
        <Button bg={colors.subAccentMain} h="42px" w="calc(50% - 10px)" onClick={getMoreStardust}>
          Get More Stardust
        </Button>
        <Button
          bg="transparent"
          borderColor={colors.subAccentMain}
          h="42px"
          w="calc(50% - 10px)"
          onClick={completeMissions}
        >
          Complete Missions
        </Button>
      </Row>
    </RocketCard>
  );
});
