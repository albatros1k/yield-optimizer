/* eslint-disable react/no-unescaped-entities */
import { ChangeEvent, memo, useState } from 'react';
import { useTheme } from 'styled-components';

import { InfoTooltip } from '../../../../shared/ui/Tooltip';
import { WalletInput } from '../../../../shared/ui/Inputs';
import { Button } from '../../../../shared/ui/Buttons';
import { icons } from '../../../../shared/Icons';
import { Caption, SubTitle } from '../../../../shared/ui/Typography';
import { Card, Column, Row, SvgContainer } from '../../../../shared/ui/Containers';

import { getMerlinReducer } from '../../../../features/data/actions/merlin';
import { selectMerlinInfo } from '../../../../features/data/selectors/merlin';
import { selectWalletAddress } from '../../../../features/data/selectors/wallet';

import { useAppDispatch, useAppSelector } from '../../../../store';
import { validateWalletAddress } from '../../../../helpers/merlinHelpers';

export const PastedWallet = memo(() => {
  const [pasted, setPasted] = useState<string>('');
  const [valid, setValid] = useState<boolean>(false);
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(selectMerlinInfo);
  const walletAddress = useAppSelector(selectWalletAddress);

  const onChangePastedWallet = (e: ChangeEvent<HTMLInputElement>) => {
    setPasted(e.target.value);
    const isValid = validateWalletAddress(e.target.value);
    if (isValid) {
      setValid(isValid);
    }
  };

  const clearPastedWallet = () => {
    setPasted('');
    dispatch(getMerlinReducer(walletAddress));
  };

  const goToWallet = () => dispatch(getMerlinReducer(pasted));

  return (
    <Card p="20px 24px" w="100%">
      <Row m="0 0 10px">
        <SubTitle color={colors.alterText}>Search for Wallet's Positions</SubTitle>
        <InfoTooltip
          id="wallet-paste"
          Component={
            <Column>
              <SubTitle m="0 0 3px">Search for Wallet's Positions</SubTitle>
              <Caption color={colors.alterText}>
                This is a temporary feature we offer during the platform <br /> test; only connected
                wallets can see its position.
              </Caption>
            </Column>
          }
        />
      </Row>
      <Row w="100%" justify="space-between" align="center">
        <Row>
          <WalletInput
            w="456px"
            placeholder="Wallet address, starts from 0x..."
            onChange={onChangePastedWallet}
            value={pasted}
            isValid={valid}
          />
          <Button
            w="180px"
            h="36px"
            m="0 0 0 20px"
            onClick={goToWallet}
            disabled={!valid || isLoading}
          >
            <Row align="center">
              <SvgContainer size={12}>{icons.search}</SvgContainer>
              <SubTitle m="0 0 0 5px">Search</SubTitle>
            </Row>
          </Button>
        </Row>
        <Button
          w="156px"
          h="36px"
          bg="transparent"
          borderColor={colors.alterHelp}
          onClick={clearPastedWallet}
          disabled={isLoading}
        >
          <Row align="center">
            <SvgContainer size={12} stroke={colors.alterText}>
              {icons.x}
            </SvgContainer>
            <SubTitle m="0 0 0 5px" color={colors.alterText}>
              Clear Pasted Wallet
            </SubTitle>
          </Row>
        </Button>
      </Row>
    </Card>
  );
});
