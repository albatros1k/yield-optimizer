import { FC, useEffect, useMemo } from 'react';
import { useTheme } from 'styled-components';
import { useHistory } from 'react-router';

import { selectWalletAddress } from '../../../features/data/selectors/wallet';
import { selectMerlinInfo } from '../../../features/data/selectors/merlin';
import { ILPToken } from '../../../features/data/apis/merlin/types/poolInfo';
import { getMerlinReducer } from '../../../features/data/actions/merlin';

import { useAppDispatch, useAppSelector } from '../../../store';

import { IBorrowPosition } from '../types';
import { parseProtocolName } from '../../../helpers/merlinHelpers';

import { Card, Column, Row } from '../../../shared/ui/Containers';
import { Button } from '../../../shared/ui/Buttons';
import { icons } from '../../../shared/Icons';
import { H2, SubTitle } from '../../../shared/ui/Typography';
import { NoInfo } from '../../../shared/ui/NoInfo';

import { DebtRewardSkeleton } from '../../Rewards/ui/Skeleton';
import { DebtProtocol } from './DebtProtocol';

const Debt: FC = () => {
  const walletAddress = useAppSelector(selectWalletAddress);
  const { isInitialLoaded, poolInfo, portfolio } = useAppSelector(selectMerlinInfo);
  const dispatch = useAppDispatch();

  const { backarrow } = icons;

  const debtPositions = useMemo<IBorrowPosition[]>(() => {
    const deBankPositions: IBorrowPosition[] = portfolio.map(
      ({ name, portfolio_item_list, logo_url, chain }) => {
        const borrowed: ILPToken[] = [];
        let totalDebt: number = 0;

        portfolio_item_list.forEach(({ detail: { borrow_token_list } }) => {
          if (borrow_token_list) {
            borrow_token_list.forEach(({ id, symbol, price, amount, decimals }) => {
              const valueUSD: number = amount * price;
              totalDebt += valueUSD;
              borrowed.push({
                address: id,
                symbol,
                value: amount,
                valueUSD,
                usdRate: price,
                decimals: +decimals,
                entryPrice: 0,
              });
            });
          }
        });

        return {
          protocolName: name,
          protocol: name,
          chain,
          logo: logo_url,
          borrowed,
          totalDebt,
          isSupported: false,
        };
      }
    );

    const getMerlinPositions = () => {
      const map: Record<string, IBorrowPosition> = {};

      poolInfo.forEach(({ protocol, borrowed, chain, protocolId }) => {
        const protocolName: string = parseProtocolName(protocol);
        if (map[protocolName]) {
          const totalDebt = borrowed.reduce<number>(
            (total, { valueUSD }) => (total += valueUSD),
            0
          );
          map[protocolName] = {
            ...map[protocolName],
            borrowed: [...map[protocolName].borrowed, ...borrowed],
            totalDebt: map[protocolName].totalDebt + totalDebt,
          };
        } else {
          const totalDebt = borrowed.reduce<number>(
            (total, { valueUSD }) => (total += valueUSD),
            0
          );
          map[protocolName] = {
            protocolName,
            borrowed,
            logo: `https://valk-merlin.s3.amazonaws.com/protocol-icons/${
              protocolId || protocolName.toLowerCase()
            }.png`,
            chain,
            totalDebt,
            protocol,
            isSupported: true,
          };
        }
      });

      return Object.values(map);
    };

    return [...getMerlinPositions(), ...deBankPositions]
      .filter(({ totalDebt }) => Boolean(totalDebt))
      .sort((a, b) => b.totalDebt - a.totalDebt);
  }, [poolInfo, portfolio]);

  //TODO - make separate reducer/action
  useEffect(() => {
    if (!isInitialLoaded && walletAddress) dispatch(getMerlinReducer(walletAddress));
  }, [walletAddress, isInitialLoaded, dispatch]);

  const {
    colors: { alterHelp, alterText },
  } = useTheme();
  const history = useHistory();

  const onRedirect = (): void => history.push('/dashboard');

  const renderProtocols = (): JSX.Element[] =>
    debtPositions.map((debtPosition, index) => (
      <DebtProtocol key={debtPosition.protocolName + index} {...{ debtPosition }} />
    ));

  return (
    <Column maxW="1180px" w="100%" m="0 auto">
      <Card w="100%" h="70px" m="0 0 24px" p="20px 25px">
        <Row w="100%" h="100%" align="center">
          <Button
            onClick={onRedirect}
            borderColor={alterHelp}
            bg="transparent"
            w="157px"
            h="28px"
            m="0 20px 0 0"
            p="0 16px"
          >
            {backarrow}
            <SubTitle m="0 0 0 6px" color={alterText}>
              Back to Dashboard
            </SubTitle>
          </Button>
          <H2>{`Wallet's Debts`}</H2>
        </Row>
      </Card>
      {!isInitialLoaded ? (
        <DebtRewardSkeleton />
      ) : debtPositions.length ? (
        renderProtocols()
      ) : (
        <NoInfo
          {...{
            heading: 'No Debts found',
            description:
              'No debts found in this wallet. If you have positions, double-check if connected to the correct wallet for debts status.',
          }}
        />
      )}
    </Column>
  );
};

export default Debt;
