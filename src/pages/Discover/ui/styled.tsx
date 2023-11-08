import { memo } from 'react';
import { styled } from 'styled-components';

import { Row } from '../../../shared/ui/Containers';

import cosmos from '../../../images/cosmos.png';
import cards from '../../../images/cards.png';

import { useAppSelector } from '../../../store';
import { selectWalletAddressIfKnown } from '../../../features/data/selectors/wallet';
import { Image } from '../../../shared/ui/Images';

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

export const CosmoBackground = styled(Row)`
  flex: 1;
  height: 100%;
  background-image: url(${cosmos});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0 0;
`;

export const StarDust = memo(() => {
  const isConnected = Boolean(useAppSelector(selectWalletAddressIfKnown));

  return (
    <CosmoBackground>{!isConnected && <Image w="70%" h="100%" src={cards} />}</CosmoBackground>
  );
});
