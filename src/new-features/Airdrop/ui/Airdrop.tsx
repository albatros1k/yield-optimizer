/* eslint-disable react/no-unescaped-entities */
import { FC, useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import Confetti from 'react-confetti';

import { Button } from '../../../shared/ui/Buttons';
import { Column, Row, SvgContainer } from '../../../shared/ui/Containers';
import { icons } from '../../../shared/Icons';
import { Caption, SubTitle } from '../../../shared/ui/Typography';
import { InfoTooltip } from '../../../shared/ui/Tooltip';

import { selectGalaxyPoints } from '../../../features/data/selectors/points';
import { useAppDispatch, useAppSelector } from '../../../store';
import { selectWalletAddressIfKnown } from '../../../features/data/selectors/wallet';
import { getBeefyApi } from '../../../features/data/apis/instances';
import { fetchGalaxyPoints } from '../../../features/data/actions/points';
import { useToggle } from '../../../helpers/hooks';
import { SmallLoader } from '../../../shared/ui/Loaders';

const { question, star } = icons;

export const Airdrop: FC = () => {
  const { points } = useAppSelector(selectGalaxyPoints);
  const walletAddress = useAppSelector(selectWalletAddressIfKnown);
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

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

  return (
    <Button
      bg="transparent"
      borderColor={colors.subAccentSecondary}
      w="180px"
      h="46px"
      p="0 16px"
      m="0 20px 0 0"
      pos="relative"
      overflowHidden
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
          <SubTitle m="0 0 0 10px">{loading ? `...` : `${points} STARDUST`} </SubTitle>
        </Row>

        <InfoTooltip
          id="airdrop"
          icon={question}
          place="left"
          iconSize={12}
          Component={
            <Column>
              <Caption color={colors.alterText}>
                Stardusts are a unique system of loyalty points <br /> tailored to recognize and
                reward platform users <br /> who actively engage and return consistently, <br />
                providing them with a mix of social and gamified benefits.
              </Caption>
            </Column>
          }
        />
      </Row>
    </Button>
  );
};
