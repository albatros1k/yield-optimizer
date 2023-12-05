import { FC, memo } from 'react';
import { useTheme } from 'styled-components';
import { capitalize } from 'lodash-es';

import { icons } from '../../../shared/Icons';
import { Button } from '../../../shared/ui/Buttons';
import { CircleImage } from '../../../shared/ui/Images';
import { Block, Row } from '../../../shared/ui/Containers';
import { Caption, H4 } from '../../../shared/ui/Typography';

import { IconContainer } from '../../../widgets/Sidebar/ui/styled';

import { formatAddressShort } from '../../../helpers/format';

import {
  selectCurrentChainId,
  selectWalletAddressIfKnown,
} from '../../../features/data/selectors/wallet';

import { useAppSelector } from '../../../store';
import { useBlockies, useToggle } from '../../../helpers/hooks';
import { getNetworkSrc } from '../../../helpers/networkSrc';
import { ACCOUNT_CENTER_WIDTH, AVATAR_SIZE } from '../lib/constants';

import { AccountMenu } from './AccountMenu';
import { selectGalaxyNft } from '../../../features/data/selectors/points';

export const AccountCenter: FC = memo(() => {
  const walletAddress = useAppSelector(selectWalletAddressIfKnown);
  const currentChainId = useAppSelector(selectCurrentChainId);
  const hasGalaxyNft = useAppSelector(selectGalaxyNft);
  const [open, toggleOpen] = useToggle();
  const blockiesIcon: string = useBlockies();

  const {
    colors: { subAccentMain },
  } = useTheme();

  return (
    <Block pos="relative">
      <Button
        bg="transparent"
        borderColor={subAccentMain}
        w={`${ACCOUNT_CENTER_WIDTH}px`}
        h="46px"
        p="0 16px"
        onClick={toggleOpen}
      >
        <Row w="100%" h="100%" align="center" justify="space-between">
          <Row align="center">
            <CircleImage
              style={{ border: `1px solid ${subAccentMain}` }}
              m="0 12px 0 0"
              w={`${AVATAR_SIZE}px`}
              h={`${AVATAR_SIZE}px`}
              src={hasGalaxyNft ? hasGalaxyNft.image : blockiesIcon}
            />
            <H4>{formatAddressShort(walletAddress)}</H4>
          </Row>
          <Row>
            <IconContainer h="26px" m="0 10px 0 0" p="0 8px">
              <CircleImage
                src={getNetworkSrc(currentChainId)}
                alt={currentChainId}
                w="10px"
                h="10px"
                m="0 4px 0 0"
              />
              <Caption>{capitalize(currentChainId)}</Caption>
            </IconContainer>
            <IconContainer w="26px" h="26px" tf={open ? 'rotate(0.5turn)' : ''}>
              {icons.arrow}
            </IconContainer>
          </Row>
        </Row>
      </Button>
      <AccountMenu {...{ open, toggleOpen }} />
    </Block>
  );
});
