import { memo } from 'react';
import { useTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { icons } from '../../../shared/Icons';
import { Image } from '../../../shared/ui/Images';
import { IBlock } from '../../../shared/styles/types';
import { Button } from '../../../shared/ui/Buttons';
import { Circle, Column, Row } from '../../../shared/ui/Containers';
import { ButtonText, H1, Main } from '../../../shared/ui/Typography';

import { selectGalaxyPoints } from '../../../features/data/selectors/points';

import { MissionAvatar, RocketCard } from './styled';
import { useAppSelector } from '../../../store';

import { LevelStep, levelData, mission } from '../../Leaderboard/lib/missions';

const { lock } = icons;

export const AcademyMissions = memo(() => {
  const { colors } = useTheme();
  const { points, rank, missionLevel: level } = useAppSelector(selectGalaxyPoints);
  const navigate = useNavigate();

  const { icon, title, textBtn, color, desc } = levelData[level];

  const iconSize: Pick<IBlock, 'w' | 'h'> =
    level === LevelStep.Begginer ? { w: '42px', h: '42px' } : { w: '110px', h: '110px' };

  const isLastLevel = level === LevelStep.Erudit;

  const getMoreStardust = () => window.open(mission.link, '_blank', 'noopener,noreferrer');

  const completeMissions = () => navigate(`/leaderboard`);

  return (
    <RocketCard p="37px 40px" h="100%">
      <Row align="stretch">
        <MissionAvatar
          borderColor={color}
          minW="100px"
          minH="100px"
          align="center"
          justify="center"
        >
          <Circle w="90px" h="90px" bg={color} justify="center" align="center">
            <Image {...iconSize} src={icon} />
          </Circle>
        </MissionAvatar>
        <Column justify="space-around" m="0 0 0 24px">
          <H1>{title}</H1>
          {desc ? (
            <Main color={colors.alterText}>{desc}</Main>
          ) : (
            <>
              <Row align="center">
                <Main color={colors.alterText}>Stardust:</Main>
                <Main m="0 6px 0 3px">{points}</Main>
              </Row>
              <Row>
                <Main color={colors.alterText} m="0 3px 0 0">
                  Rank:
                </Main>
                <Main>{rank}</Main>
              </Row>
            </>
          )}
        </Column>
      </Row>
      <Row w="100%" justify="space-between" m="30px 0 0">
        <Button bg={colors.subAccentMain} h="42px" w="calc(50% - 10px)" onClick={getMoreStardust}>
          {textBtn}
        </Button>
        <Button
          bg={isLastLevel ? colors.subAccentSecondary : 'transparent'}
          borderColor={isLastLevel ? null : colors.alterText}
          h="42px"
          w="calc(50% - 10px)"
          onClick={isLastLevel ? completeMissions : undefined}
        >
          <Row align="center">
            {!isLastLevel && lock}
            <ButtonText m="0 0 0 5px" color={isLastLevel ? colors.textColor : colors.alterText}>
              Claim Reward
            </ButtonText>
          </Row>
        </Button>
      </Row>
    </RocketCard>
  );
});
