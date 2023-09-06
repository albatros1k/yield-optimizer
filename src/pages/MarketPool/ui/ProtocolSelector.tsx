import { memo } from 'react';
import { useTheme } from 'styled-components';

import { useAppSelector } from '../../../store';
import { CheckBlock, ProtocolButton } from './styled';

import { selectProtocolNameMap } from '../../../features/data/selectors/market';
import { onImageError } from '../../../helpers/merlinHelpers';

import { CircleImage } from '../../../shared/ui/Images';
import { awsLink } from '../../../shared/lib/aws';
import { Main } from '../../../shared/ui/Typography';

export const CheckBold = ({ color, size = 7, strokeWidth = 1 }) => {
  const { colors } = useTheme();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 7 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.83317 1.75L2.62484 4.95833L1.1665 3.5"
        stroke={color || colors.subAccentMain}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

interface ProtocolSelectorProps {
  is_active: boolean;
  protocol: string;
  protocolDisplay: string;
  color: string;
  onClick: () => void;
  network: string;
}

export const ProtocolSelector = memo<ProtocolSelectorProps>(
  ({ is_active, protocol, protocolDisplay, color, network, onClick }) => {
    const protocolsMap = useAppSelector(selectProtocolNameMap);

    return (
      <ProtocolButton
        w="100%"
        align="center"
        p="0 0 0 12px"
        is_active={is_active}
        color={color}
        onClick={onClick}
        justify="flex-start"
      >
        <CircleImage
          src={`${awsLink}/protocol-icons/${protocolsMap[protocol]}.png`}
          alt={protocol}
          onError={onImageError}
          w="20px"
          h="20px"
        />
        <Main m="0 auto 0 10px" dotted={true} maxW="calc(100% - 69px)">
          {protocolDisplay} ({network})
        </Main>
        <CheckBlock {...{ is_active, color }} w="36px" h="36px" align="center" justify="center">
          <CheckBold size={16} strokeWidth={0.5} color={is_active ? color : 'transparent'} />
        </CheckBlock>
      </ProtocolButton>
    );
  }
);
