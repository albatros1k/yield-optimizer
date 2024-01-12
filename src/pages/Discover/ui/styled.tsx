import { styled } from 'styled-components';

import { Card, Circle, Row } from '../../../shared/ui/Containers';

import cosmos from '../../../images/cosmos.png';
import rocket from '../../../images/rocket.png';

export const SwitcherContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  position: relative;
  width: 100%;
  height: 36px;
  background: ${({ theme: { colors } }) => colors.alterBg};
  border-radius: 6px;
  align-items: center;
`;

export const Slider = styled.div<{ index: number }>`
  display: flex;
  position: absolute;
  left: ${({ index }) => (index === 1 ? 'calc(100% / 3)' : index === 2 ? 'calc(100% / 3 * 2)' : 0)};
  transition: all 0.3s ease 0s;
  background: ${({ theme: { colors } }) => colors.alterHelp};
  border-radius: 6px;
  width: calc(100% / 3);
  height: 100%;
`;

export const AnimatedRow = styled(Row)`
  > div,
  p {
    transition: all 0.3s ease 0s;
  }

  &:hover > div {
    transform: translateX(5px);
  }

  &:hover > p {
    color: ${({ theme: { colors } }) => colors.textColor};
  }
`;

export const CosmoCard = styled(Card)`
  background-image: url(${cosmos});
  background-size: 50% 100%;
  background-repeat: no-repeat;
  background-position: 140% 10%;
`;

export const RocketCard = styled(Card)`
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: url(${rocket});
    background-repeat: no-repeat;
    background-position: 100% 10%;
    opacity: 0.4;
    z-index: -1;
  }
`;

export const MissionAvatar = styled(Circle)<{ borderColor?: string }>`
  border: ${({ borderColor }) => (borderColor ? `1px solid ${borderColor}` : 'none')};
  position: relative;
  overflow: hidden;
`;
