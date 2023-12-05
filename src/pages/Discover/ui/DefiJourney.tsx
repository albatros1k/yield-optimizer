import { FC } from 'react';
import { useTheme } from 'styled-components';

import { Row } from '../../../shared/ui/Containers';
import { ButtonText, H1, Main } from '../../../shared/ui/Typography';
import { Button } from '../../../shared/ui/Buttons';
import { icons } from '../../../shared/Icons';

import { useAppDispatch, useAppSelector } from '../../../store';
import { selectWalletAddressIfKnown } from '../../../features/data/selectors/wallet';
import { askForWalletConnection } from '../../../features/data/actions/wallet';
import { CosmoCard } from './styled';

export const DeFiJourney: FC = () => {
  const walletAddress = useAppSelector(selectWalletAddressIfKnown);
  const dispatch = useAppDispatch();
  const { colors } = useTheme();

  const handleWalletConnect = () => {
    dispatch(askForWalletConnection());
  };

  return (
    <CosmoCard p="32px 40px 41px" h="100%">
      <H1 m="0 0 18px">
        {walletAddress ? 'Discover Your DeFi Journey' : 'Receive STARDUST Rewards!'}
      </H1>
      <Main color={colors.alterText} m="0 0 32px">
        {walletAddress ? (
          <>
            With Odysea Vaults. Explore, invest, and grow your <br /> assets in the exciting world
            of DeFi.
          </>
        ) : (
          <>
            Connect your wallet to the Odysea Dashboard and
            <br />
            explore your portfolio to claim your Stardust Rewards!
          </>
        )}
      </Main>
      <Button
        w="240px"
        h="42px"
        bg={walletAddress ? colors.bgColor : colors.accentMain}
        p="0 18px"
        onClick={walletAddress ? undefined : handleWalletConnect}
      >
        <Row w="100%" justify="space-between" align="center">
          <ButtonText color={walletAddress ? colors.alterText : colors.textColor}>
            {walletAddress ? 'More Vaults in Progress' : 'Connect Wallet'}
          </ButtonText>
          {walletAddress ? icons.clock : icons.link}
        </Row>
      </Button>
    </CosmoCard>
  );
};
