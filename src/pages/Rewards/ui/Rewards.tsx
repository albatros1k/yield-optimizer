import { FC, useEffect, useMemo } from 'react';
import { useTheme } from 'styled-components';
import { useNavigate } from 'react-router';

import { selectWalletAddress } from '../../../features/data/selectors/wallet';
import { selectMerlinInfo } from '../../../features/data/selectors/merlin';
import { ILPToken } from '../../../features/data/apis/merlin/types/poolInfo';
import { getMerlinReducer } from '../../../features/data/actions/merlin';

import { Button } from '../../../shared/ui/Buttons';
import { icons } from '../../../shared/Icons';
import { H2, SubTitle } from '../../../shared/ui/Typography';
import { Card, Column, Row } from '../../../shared/ui/Containers';
import { NoInfo } from '../../../shared/ui/NoInfo';

import { useAppDispatch, useAppSelector } from '../../../store';

import { IRewardPosition } from '../types';
import { testedProtocolList } from '../const';

import { RewardsProtocol } from './RewardsProtocol';
import { DebtRewardSkeleton } from './Skeleton';
import { awsLink } from '../../../shared/lib/aws';

const Rewards: FC = () => {
  const walletAddress = useAppSelector(selectWalletAddress);
  const { isInitialLoaded, poolInfo, portfolio } = useAppSelector(selectMerlinInfo);
  const dispatch = useAppDispatch();

  const {
    colors: { alterHelp, alterText },
  } = useTheme();
  const navigate = useNavigate();

  const { backarrow } = icons;

  const unclaimedRewards = useMemo<IRewardPosition[]>(() => {
    const deBankPositions: IRewardPosition[] = portfolio.map(
      ({ name, portfolio_item_list, logo_url, chain }) => {
        const reward: ILPToken[] = [];
        let totalRewards: number = 0;

        portfolio_item_list.forEach(({ detail: { reward_token_list } }) => {
          if (reward_token_list) {
            reward_token_list.forEach(({ id, symbol, price, amount, decimals }) => {
              const valueUSD: number = amount * price;
              totalRewards += valueUSD;
              reward.push({
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
          reward,
          totalRewards,
          isSupported: false,
          isAbleToClaim: false,
        };
      }
    );

    const getMerlinPositions = () => {
      const map: Record<string, IRewardPosition> = {};

      poolInfo.forEach(({ protocol, reward, chain, logo, protocolId }) => {
        const protocolName: string = protocol.split('__')?.[0];
        if (map[protocolName]) {
          const totalRewards = reward.reduce<number>(
            (total, { valueUSD }) => (total += valueUSD),
            0
          );
          map[protocolName] = {
            ...map[protocolName],
            reward: [...map[protocolName].reward, ...reward],
            totalRewards: map[protocolName].totalRewards + totalRewards,
          };
        } else {
          const ETH = 'eth';
          const totalRewards = reward.reduce<number>(
            (total, { valueUSD }) => (total += valueUSD),
            0
          );
          const isAbleToClaim = testedProtocolList.includes(protocol) && chain === ETH;
          map[protocolName] = {
            protocolName,
            reward,
            logo:
              logo || `${awsLink}/protocol-icons/${protocolId || protocolName.toLowerCase()}.png`,
            chain,
            totalRewards,
            protocol,
            isSupported: true,
            isAbleToClaim,
          };
        }
      });

      return Object.values(map);
    };

    return [...getMerlinPositions(), ...deBankPositions]
      .filter(({ totalRewards }) => Boolean(totalRewards))
      .sort((a, b) => b.totalRewards - a.totalRewards);
  }, [poolInfo, portfolio]);

  //TODO - make separate reducer/action
  useEffect(() => {
    if (!isInitialLoaded && walletAddress) dispatch(getMerlinReducer(walletAddress));
  }, [walletAddress, dispatch, isInitialLoaded]);

  const onRedirect = (): void => navigate('/dashboard');

  const renderProtocols = (): JSX.Element[] =>
    unclaimedRewards.map((rewardsPosition, index) => (
      <RewardsProtocol key={rewardsPosition.protocolName + index} {...{ rewardsPosition }} />
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
          <H2>{`Wallet's Rewards`}</H2>
        </Row>
      </Card>
      {!isInitialLoaded ? (
        <DebtRewardSkeleton />
      ) : unclaimedRewards.length ? (
        renderProtocols()
      ) : (
        <NoInfo
          {...{
            icon: icons.star,
            heading: 'No rewards found',
            description:
              'No rewards found for this wallet. If you have positions, double-check if connected to the correct wallet for reward status.',
          }}
        />
      )}
    </Column>
  );
};

export default Rewards;
