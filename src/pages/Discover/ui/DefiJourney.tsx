import { FC } from 'react';
import { useTheme } from 'styled-components';

import { Card, Column, Grid, Row } from '../../../shared/ui/Containers';
import { ButtonText, H1, H3, Main, SubTitle } from '../../../shared/ui/Typography';
import { Button } from '../../../shared/ui/Buttons';
import { JourneyCardInfo } from '../types/journey';
import { icons } from '../../../shared/Icons';

import { useAppDispatch, useAppSelector } from '../../../store';
import { selectWalletAddressIfKnown } from '../../../features/data/selectors/wallet';
import { askForWalletConnection } from '../../../features/data/actions/wallet';

import { StarDust } from './styled';

export const DeFiJourney: FC = () => {
  const walletAddress = useAppSelector(selectWalletAddressIfKnown);
  const dispatch = useAppDispatch();
  const { colors } = useTheme();

  const handleWalletConnect = () => {
    dispatch(askForWalletConnection());
  };

  return (
    <Card w="100%" overflowHidden bg={colors.additionalBg}>
      <Grid colTemplate="repeat(2,1fr)" colGap="10px" rowTemplate="none" rowGap="0">
        <Column p="32px 40px 41px 40px">
          <H1 m="0 0 18px">
            {walletAddress ? 'Discover Your DeFi Journey' : 'Receive STARDUST Rewards!'}
          </H1>
          <Main color={colors.alterText} m="0 0 32px">
            {walletAddress ? (
              <>
                With Odysea Vaults. Explore, invest, and grow your <br /> assets in the exciting
                world of DeFi.
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
        </Column>
        <StarDust />
      </Grid>
    </Card>
  );
};

export const JourneyCard: FC<JourneyCardInfo> = ({ title, value, cords }) => {
  const {
    colors: { bgColor, alterText },
  } = useTheme();
  return (
    <Card p="13px 18px" bg={bgColor} w="280px" pos="absolute" style={cords}>
      <SubTitle color={alterText} m="0 0 6px">
        {title}
      </SubTitle>
      <H3>{value}</H3>
    </Card>
  );
};
