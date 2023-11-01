/* eslint-disable react/no-unescaped-entities */
import { FC } from 'react';
import { useTheme } from 'styled-components';
import Confetti from 'react-confetti';

import { Button } from '../../../shared/ui/Buttons';
import { Column, Row, SvgContainer } from '../../../shared/ui/Containers';
import { icons } from '../../../shared/Icons';
import { Caption, SubTitle } from '../../../shared/ui/Typography';
import { InfoTooltip } from '../../../shared/ui/Tooltip';

import { selectGalaxyPoints } from '../../../features/data/selectors/points';
import { useAppSelector } from '../../../store';

const { question, star } = icons;

export const Airdrop: FC = () => {
  const { points } = useAppSelector(selectGalaxyPoints);
  const { colors } = useTheme();

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
      <Confetti width={180} height={46} numberOfPieces={25} gravity={0.04} friction={0.91} />
      <Row
        w="100%"
        h="100%"
        align="center"
        justify="space-between"
        pos="relative"
        style={{ zIndex: 1000 }}
      >
        <Row align="center">
          <SvgContainer stroke={colors.subAccentSecondary} size={14}>
            {star}
          </SvgContainer>
          <SubTitle m="0 0 0 10px">{points} STARDUST</SubTitle>
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
