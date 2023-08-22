import { FC, Fragment } from 'react';
import { useTheme } from 'styled-components';

import { Card, Grid, Row } from '../../../shared/ui/Containers';
import { Image, TokenIcon } from '../../../shared/ui/Images';
import { H3, Main, SubTitle } from '../../../shared/ui/Typography';
import { definePlus, parseProtocol } from '../../../helpers/merlinHelpers';
import { Button } from '../../../shared/ui/Buttons';
import { Line } from '../../../shared/ui/Spacer';

import altIcon from '../../../images/nav-icons/no-icon.svg';

import { IBorrowPosition } from '../types';

export const DebtProtocol: FC<{ debtPosition: IBorrowPosition }> = ({
  debtPosition: { protocolName, totalDebt, chain, logo, borrowed, isSupported },
}) => {
  const {
    colors: { alterText, alterHelp, alterBg },
  } = useTheme();

  const renderTokens = (): JSX.Element[] =>
    borrowed.map(({ symbol, value, valueUSD, address }, index: number, { length }) => (
      <Fragment key={address + symbol + value + index}>
        <Row h="65px" w="100%" p="18px 20px">
          <Grid
            w="100%"
            colTemplate="2fr repeat(2, 1fr) 140px"
            colGap="10px"
            rowTemplate="none"
            rowGap="0"
          >
            <Row w="fit-content" align="center">
              <TokenIcon w="24px" h="24px" address={address} />
              <Main m="0 0 0 14px">{symbol}</Main>
            </Row>
            <Main>{definePlus(value, false)}</Main>
            <Main>{definePlus(valueUSD, false)}</Main>
            {isSupported ? (
              <Button w="140px" h="28px">
                Repay
              </Button>
            ) : null}
          </Grid>
        </Row>
        {index < length - 1 ? <Line /> : null}
      </Fragment>
    ));

  return (
    <Card w="100%" p="30px 25px" m="0 0 24px">
      <Row m="0 0 20px" w="100%" align="center">
        <Image
          br={2}
          w="20px"
          h="20px"
          m="0 12px 0 0"
          src={logo || altIcon}
          bg="transparent"
          alt={protocolName + '-' + chain}
        />
        <H3 m="0 15px 0 0">{parseProtocol(protocolName)} Debts</H3>
        <H3 color={alterText}>{definePlus(totalDebt, false)}</H3>
      </Row>
      <Card border={alterHelp} bg="transparent" w="100%" overflowHidden>
        <Row w="100%" h="40px" bg={alterBg} p="10px 20px">
          <Grid
            w="100%"
            colTemplate="2fr repeat(2, 1fr) 140px"
            colGap="10px"
            rowTemplate="none"
            rowGap="0"
          >
            <SubTitle color={alterText}>Asset</SubTitle>
            <SubTitle color={alterText}>Amount</SubTitle>
            <SubTitle color={alterText}>Value</SubTitle>
            <span />
          </Grid>
        </Row>
        <Line />
        {renderTokens()}
      </Card>
    </Card>
  );
};
