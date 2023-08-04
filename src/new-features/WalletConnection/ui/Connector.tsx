import { FC, memo } from 'react';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../store';

import { icons } from '../../../shared/Icons';
import { Button } from '../../../shared/ui/Buttons';
import { SubTitle } from '../../../shared/ui/Typography';
import { SmallLoader } from '../../../shared/ui/Loaders';
import { Circle, Row } from '../../../shared/ui/Containers';

import { useResolveAddress } from '../../../features/data/hooks/resolver';
import { askForWalletConnection } from '../../../features/data/actions/wallet';
import { selectIsWalletPending } from '../../../features/data/selectors/data-loader';
import { selectWalletAddressIfKnown } from '../../../features/data/selectors/wallet';
import { isFulfilledStatus } from '../../../features/data/reducers/wallet/resolver-types';

import { ACCOUNT_CENTER_WIDTH, AVATAR_SIZE } from '../lib/constants';
import { formatAddressShort, formatDomain } from '../../../helpers/format';
import { IconContainer } from '../../../widgets/Sidebar/ui/styled';

const { wallet, arrow } = icons;

export const Connector: FC = memo(() => {
  const walletPending = useAppSelector(selectIsWalletPending);
  const walletAddress = useAppSelector(selectWalletAddressIfKnown);
  const resolverStatus = useResolveAddress(walletAddress);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const {
    colors: { accentMain, alterBg },
  } = useTheme();

  const handleWalletConnect = () => {
    dispatch(askForWalletConnection());
  };

  return (
    <Button
      h="46px"
      w={`${ACCOUNT_CENTER_WIDTH}px`}
      borderColor={accentMain}
      p="0 16px"
      onClick={handleWalletConnect}
    >
      <Row w="100%" h="100%" align="center" justify="space-between">
        <Row align="center">
          {walletPending ? (
            <SmallLoader size={AVATAR_SIZE} m="0 12px 0 0" />
          ) : (
            <Circle
              align="center"
              justify="center"
              bg={alterBg}
              w={`${AVATAR_SIZE}px`}
              h={`${AVATAR_SIZE}px`}
              m="0 12px 0 0"
            >
              {wallet}
            </Circle>
          )}
          <SubTitle>
            {walletAddress
              ? isFulfilledStatus(resolverStatus)
                ? formatDomain(resolverStatus.value)
                : formatAddressShort(walletAddress)
              : t('Network-ConnectWallet')}
          </SubTitle>
        </Row>
        <IconContainer w="26px" h="26px" tf="rotate(0.75turn)">
          {arrow}
        </IconContainer>
      </Row>
    </Button>
  );
});
