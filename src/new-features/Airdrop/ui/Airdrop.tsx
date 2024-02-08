import { FC, Fragment, useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import Confetti from 'react-confetti';

import { Button } from '../../../shared/ui/Buttons';
import { Column, Row, SvgContainer } from '../../../shared/ui/Containers';
import { icons } from '../../../shared/Icons';
import { Input } from '../../../shared/ui/Typography';
import { InfoTooltip } from '../../../shared/ui/Tooltip';
import { Label } from '../../../shared/ui/Labels';
import { SmallLoader } from '../../../shared/ui/Loaders';
import { Line } from '../../../shared/ui/Spacer';

import { selectGalaxyNft, selectGalaxyPoints } from '../../../features/data/selectors/points';
import { selectVaultTerms } from '../../../features/data/selectors/agreement';
import { selectWalletAddressIfKnown } from '../../../features/data/selectors/wallet';
import { getBeefyApi } from '../../../features/data/apis/instances';
import { fetchGalaxyPoints } from '../../../features/data/actions/points';

import { useAppDispatch, useAppSelector } from '../../../store';

import { useToggle } from '../../../helpers/hooks';

import { DailyMissions } from './DailyMissions';

const { question, star, user } = icons;

export const Airdrop: FC = () => {
  const { points, rank } = useAppSelector(selectGalaxyPoints);
  const walletAddress = useAppSelector(selectWalletAddressIfKnown);
  const termsAccepted = useAppSelector(selectVaultTerms);
  const hasGalaxyNft = useAppSelector(selectGalaxyNft);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, toggleModal] = useToggle();
  const { colors } = useTheme();
  const [isConfettiActive, toggleConfetti] = useToggle();

  useEffect(() => {
    (async () => {
      const api = getBeefyApi();

      if (walletAddress) {
        setLoading(true);
        await api
          .collectGalaxyPoints(walletAddress)
          .then(async () => {
            await dispatch(fetchGalaxyPoints());
            toggleConfetti();
            setTimeout(() => {
              toggleConfetti();
            }, 8000);
          })
          .finally(() => setLoading(false));
      }
    })();
  }, [walletAddress, dispatch, toggleConfetti]);

  useEffect(() => {
    let timeoutId;

    if (walletAddress && termsAccepted) {
      timeoutId = setTimeout(() => {
        toggleModal();
      }, 2000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [walletAddress, toggleModal, termsAccepted]);

  return (
    <Fragment>
      <Button
        onClick={toggleModal}
        bg="transparent"
        borderColor={colors.subAccentSecondary}
        w="180px"
        h="46px"
        p="0 16px"
        m="0 20px 0 0"
        pos="relative"
      >
        {isConfettiActive && (
          <Confetti width={180} height={46} numberOfPieces={25} gravity={0.04} friction={0.91} />
        )}
        <Row
          w="100%"
          h="100%"
          align="center"
          justify="space-between"
          pos="relative"
          style={{ zIndex: 1000 }}
        >
          <Row align="center">
            {loading ? (
              <SmallLoader size={14} />
            ) : (
              <SvgContainer stroke={colors.subAccentSecondary} size={14}>
                {star}
              </SvgContainer>
            )}
            <Input m="0 0 0 10px">{loading ? `...` : `${points} STARDUST`} </Input>
          </Row>
          {hasGalaxyNft ? (
            <Label value="x1.5" />
          ) : (
            <InfoTooltip
              id="airdrop"
              icon={question}
              place="bottom"
              iconSize={12}
              Component={
                <Column>
                  <Row w="100%" justify="space-between" align="center">
                    <Row align="center">
                      <SvgContainer stroke={colors.subAccentSecondary} size={14}>
                        {star}
                      </SvgContainer>
                      <Input m="0 0 0 6px">{points} STARDUST</Input>
                    </Row>
                    <Row>
                      <SvgContainer size={14}>{user}</SvgContainer>
                      <Row m="0 0 0 4px">
                        <Input color={colors.alterText} m="0 3px 0 0">
                          Rank:
                        </Input>
                        <Input>{rank}</Input>
                      </Row>
                    </Row>
                  </Row>
                  <Line m="10px 0" />
                  <Input color={colors.alterText}>
                    Stardusts are a unique system of loyalty points tailored to recognize and reward
                    platform users who actively engage and return consistently, providing them with
                    a mix of social and gamified benefits.
                  </Input>
                </Column>
              }
            />
          )}
        </Row>
      </Button>
      <DailyMissions closeModal={toggleModal} isModalOpen={isModalOpen} />
    </Fragment>
  );
};
