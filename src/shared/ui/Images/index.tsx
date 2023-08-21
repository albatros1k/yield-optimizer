import { FC } from 'react';
import { styled, useTheme } from 'styled-components';

import { IBlock } from '../../styles/types';
import { block } from '../../styles/mixins';
import { Circle, Row, SvgContainer } from '../Containers';
import { onImageError } from '../../../helpers/merlinHelpers';
import { Main } from '../Typography';

export const Image = styled.img<IBlock>`
  ${block}
  object-fit: cover;
  overflow: clip;
  overflow-clip-margin: content-box;
`;

export const Logo = styled(Image)`
  width: 140px;
  height: 64px;
`;

export const CircleImage = styled(Image)`
  border-radius: 50%;
  overflow: hidden;
`;

export const SquareImage = styled(Image)`
  border-radius: 4px;
`;

interface TokenIconProps {
  address: string;
  w?: string;
  h?: string;
  m?: string;
}

export const TokenIcon: FC<TokenIconProps> = ({ address, w = '32px', h = '32px', m = '0' }) => {
  const {
    colors: { alterBg },
  } = useTheme();
  return (
    <CircleImage
      m={m}
      w={w}
      h={h}
      src={`https://valk-merlin.s3.amazonaws.com/token-icons-small/${address.toLowerCase()}.png`}
      alt="logo"
      onError={onImageError}
      bg={alterBg}
    />
  );
};

interface MultipleTokenIconsProps {
  addresses: string[];
  size?: number;
  isProtocol?: boolean;
}

export const MultipleTokenIcons: FC<MultipleTokenIconsProps> = ({
  addresses,
  size = 32,
  isProtocol,
}) => {
  const {
    colors: { accentMain },
  } = useTheme();

  const renderTokens = (): Array<JSX.Element | null> =>
    addresses.map((address, index) => {
      const zIndex = index + 1;
      const left = zIndex * 12;

      if (index > 4) return null;
      return (
        <SvgContainer
          size={size}
          key={'token' + address + index}
          position="absolute"
          t="50%"
          l={`${left}px`}
          zIndex={zIndex}
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <CircleImage
            w={`${size}px`}
            h={`${size}px`}
            src={`https://valk-merlin.s3.amazonaws.com/${
              isProtocol ? `protocol-icons` : `token-icons-small`
            }/${address.toLowerCase()}.png`}
            alt="logo"
            onError={onImageError}
            style={{ background: 'transparent' }}
          />
        </SvgContainer>
      );
    });

  return (
    <Row pos="relative" w={`${size * addresses.length}px`} h={`${size}px`}>
      {renderTokens()}
      {addresses.length > 5 ? (
        <Circle
          bg={accentMain}
          w={`${size}px`}
          h={`${size}px`}
          pos="absolute"
          style={{ top: 0, left: 60, zIndex: 6 }}
          align="center"
          justify="center"
        >
          <Main>+{addresses.length - 5}</Main>
        </Circle>
      ) : null}
    </Row>
  );
};

interface ProtocolIconProps extends TokenIconProps {
  protocolId: string;
  m?: string;
}

export const ProtocolIcon: FC<Omit<ProtocolIconProps, 'address'>> = ({
  protocolId,
  w = '32px',
  h = '32px',
  m,
}) => {
  const {
    colors: { alterBg },
  } = useTheme();

  return (
    <CircleImage
      m={m}
      w={w}
      h={h}
      src={`https://valk-merlin.s3.amazonaws.com/token-icons-small/protocol-icons/${protocolId}.png`}
      alt="logo"
      onError={onImageError}
      bg={alterBg}
    />
  );
};
