import { createAsyncThunk } from '@reduxjs/toolkit';

import { MerlinApi } from '../apis/merlin/merlin-api';
import { IPortfolio, IPortfolioItem } from '../apis/merlin/types/portfolio';
import { IAddressMap } from '../reducers/merlin';
import {
  IActivePosition,
  ILPToken,
  IPoolInfo,
  ISupplyBorrowReward,
} from '../apis/merlin/types/poolInfo';
import { ITokenBalance } from '../apis/merlin/types/tokenBalance';
import { CurrentRate } from '../apis/merlin/types/rate';
import { IUserTokenProtocolOverview } from '../apis/merlin/types/overview';
import { parseProtocolName, removeSpecialSymbol } from '../../../helpers/merlinHelpers';

export const getDataReducer = createAsyncThunk<any, string, { rejectValue: string }>(
  'data/getAllData',
  async (userWallet: string, thunkAPI) => {
    try {
      const allData = await Promise.all([
        MerlinApi.getOverviews(userWallet),
        MerlinApi.getPoolInfos(userWallet),
        MerlinApi.getPortfolio(userWallet),
        MerlinApi.getTokenBalances(userWallet),
      ]).then(
        async ([
          { userTokenOverviews },
          {
            activePositionYieldAndPnl,
            poolInfo,
            averageEntryPrice,
            lpAverageEntryPrice,
            protocolAverageEntryPrice,
          },
          portfolio,
          userTokenBalances,
        ]) => {
          //Extract already supported protocols from deBank protocols
          const filteredPortfolio: IPortfolio[] = portfolio.filter(
            ({ id }: IPortfolio) => !poolInfo.some(({ protocolId }) => protocolId === id)
          );

          // Getting all addresses to make a list for prices
          const getMaps = async (): Promise<
            [Record<string, IAddressMap>, Record<string, string>]
          > => {
            const protocolIdMap: Record<string, string> = {};
            const addressMap: Record<string, IAddressMap> = {};
            const unknownAddresses: Set<string> = new Set();

            userTokenOverviews.forEach(({ userTokenProtocolOverviews, underlyingTokens }) => {
              if (underlyingTokens.length) {
                underlyingTokens.forEach(address => unknownAddresses.add(address));
              }

              if (userTokenProtocolOverviews.length) {
                userTokenProtocolOverviews.forEach(({ deFiEvents, protocolId, protocol }) => {
                  // Gathering protocolIds for icons
                  const protocolName = parseProtocolName(protocol);
                  if (!protocolIdMap[protocolName] && protocolId) {
                    protocolIdMap[protocolName] = protocolId;
                  }

                  if (deFiEvents && deFiEvents.length) {
                    deFiEvents.forEach(({ balances }) => {
                      balances.forEach(
                        ({ tokenName, tokenSymbol, tokenDecimals, tokenAddress }) => {
                          addressMap[tokenAddress] = {
                            symbol: tokenSymbol!,
                            tokenName: removeSpecialSymbol(tokenName!),
                            tokenDecimals,
                          };
                        }
                      );
                    });
                  }
                });
              }
            });

            activePositionYieldAndPnl.forEach(({ yields, protocol, protocolId }) => {
              // Gathering protocolIds for icons
              const protocolName = parseProtocolName(protocol);
              if (!protocolIdMap[protocolName] && protocolId) {
                protocolIdMap[protocolName] = protocolId;
              }
              if (yields) {
                Object.keys(yields).forEach(address => unknownAddresses.add(address));
              }
            });

            poolInfo.forEach(({ supplied, borrowed, reward, protocol, protocolId }: IPoolInfo) => {
              // Gathering protocolIds for icons
              const protocolName = parseProtocolName(protocol);
              if (!protocolIdMap[protocolName] && protocolId) {
                protocolIdMap[protocolName] = protocolId;
              }
              [...supplied, ...borrowed, ...reward].forEach(
                ({ protocolTokenAddress, valuesByLPToken, symbol }: ISupplyBorrowReward) => {
                  const lowerAddress = protocolTokenAddress?.toLowerCase();
                  if (lowerAddress) {
                    if (!addressMap[lowerAddress]) {
                      addressMap[lowerAddress] = {
                        symbol,
                        tokenDecimals: 18,
                        tokenName: symbol,
                      };
                    }
                  }

                  if (valuesByLPToken?.length) {
                    valuesByLPToken.forEach(({ address, symbol }: ILPToken) => {
                      if (!addressMap[address]) {
                        addressMap[address] = {
                          symbol,
                          tokenDecimals: 18,
                          tokenName: symbol,
                        };
                      }
                    });
                  }
                }
              );
            });

            filteredPortfolio.forEach(({ portfolio_item_list }: IPortfolio) => {
              portfolio_item_list.forEach(({ detail: { supply_token_list } }: IPortfolioItem) => {
                if (supply_token_list?.length) {
                  supply_token_list.forEach(({ id, symbol, decimals, name }) => {
                    if (!addressMap[id]) {
                      addressMap[id] = {
                        symbol,
                        tokenDecimals: Number(decimals),
                        tokenName: name,
                      };
                    }
                  });
                }
              });
            });

            const additionalInfo: Record<string, IAddressMap> = await MerlinApi.getTokensData(
              Array.from(unknownAddresses)
            )
              .then(res =>
                Object.fromEntries(
                  res.map(({ symbol, decimals, name, address }) => [
                    address,
                    { symbol, tokenDecimals: decimals, tokenName: name },
                  ])
                )
              )
              .catch(() => ({}));

            const mergedMap: Record<string, IAddressMap> = { ...addressMap, ...additionalInfo };

            const maps: [Record<string, IAddressMap>, Record<string, string>] = [
              mergedMap,
              protocolIdMap,
            ];

            return maps;
          };

          // Balances for user , including balances in the protocols , !IMPORTANT we put each chain for it dut ot ENUM
          const balancesToken: ITokenBalance[] = Object.entries(userTokenBalances).flatMap(
            ([chain, balances]) => balances.map(balance => ({ ...balance, chain }))
          );

          const [addressMap, protocolIdMap] = await getMaps();

          // List of addresses to get all necessary prices
          const allTokenAddresses: string[] = [
            ...balancesToken.map(({ token_address }) => token_address, Object.keys(addressMap)),
          ];

          const pricesList: Record<string, CurrentRate> =
            await MerlinApi.getCurrentRatesAndChanges24h(allTokenAddresses);

          //Wallet balances without any protocol values
          const getUserBalances = (): (ITokenBalance & CurrentRate)[] => {
            const addressesToBeExcluded = new Set();

            poolInfo.forEach(({ supplied }) => {
              if (supplied.length)
                supplied.forEach(({ protocolTokenAddress }) =>
                  addressesToBeExcluded.add(protocolTokenAddress)
                );
            });

            const filtered = balancesToken
              //Adding current prices and 24 changes to user balances
              .map(balance => {
                const { token_address } = balance;
                return Object.assign(balance, pricesList[token_address]);
              })
              .map(balance => ({ ...balance, current: balance.current || balance.price }))
              .filter(
                ({ token_address, symbol, decimals, current, balance }) =>
                  !addressesToBeExcluded.has(token_address) &&
                  symbol &&
                  decimals &&
                  current &&
                  balance
              );

            return filtered;
          };

          // TOTAL Calculations (PNL , Debts, NetWorth)

          const userNetWorth: number = getUserBalances().reduce(
            (total, { balance, current, decimals }) =>
              (total += (Number(balance) / Math.pow(10, decimals)) * Number(current)),
            0
          );

          const getTotalNetWorth = (): number => {
            const merlinNetWorth: number = poolInfo.reduce(
              (total, { suppliedUSDTotal, borrowedUSDTotal }) =>
                (total += suppliedUSDTotal - borrowedUSDTotal),
              0
            );
            const deBankNetWorth: number = filteredPortfolio.reduce(
              (total, { portfolio_item_list }) => {
                portfolio_item_list.forEach(
                  ({ stats: { net_usd_value } }) => (total += net_usd_value)
                );
                return total;
              },
              0
            );

            return merlinNetWorth + deBankNetWorth + userNetWorth;
          };

          const getTotalDebt = (): number => {
            const merlinDebt: number = poolInfo.reduce(
              (total, { borrowedUSDTotal }) => (total += borrowedUSDTotal),
              0
            );
            const deBankDebt: number = filteredPortfolio.reduce(
              (total, { portfolio_item_list }) => {
                portfolio_item_list.forEach(
                  ({ stats: { debt_usd_value } }) => (total += debt_usd_value)
                );
                return total;
              },
              0
            );
            return merlinDebt + deBankDebt;
          };

          const getTotalRewards = (): number => {
            const merlinRewards: number = poolInfo.reduce((acc, { reward }) => {
              reward.forEach(({ valueUSD }) => (acc += Number(valueUSD)));
              return acc;
            }, 0);

            const deBankRewards: number = filteredPortfolio.reduce(
              (total, { portfolio_item_list }) => {
                portfolio_item_list.forEach(({ detail: { reward_token_list } }) => {
                  if (reward_token_list) {
                    reward_token_list.forEach(({ price, amount }) => {
                      total += price * amount;
                    });
                  }
                });
                return total;
              },
              0
            );

            return merlinRewards + deBankRewards;
          };

          const calcUnrealizedPnl = (key: keyof IActivePosition): number =>
            activePositionYieldAndPnl.reduce((total, item) => (total += Number(item[key])), 0);

          const calcRealizedPnl = (key: keyof IUserTokenProtocolOverview): number =>
            userTokenOverviews.reduce((acc, { userTokenProtocolOverviews }) => {
              userTokenProtocolOverviews.forEach(el => (acc += Number(el[key])));
              return acc;
            }, 0);

          return {
            userBalances: getUserBalances(),
            userTokenOverviews,
            poolInfo,
            portfolio: filteredPortfolio,
            activePositionYieldAndPnl,
            pricesList,
            addressMap,
            protocolIdMap,
            averageEntryPrice,
            lpAverageEntryPrice,
            protocolAverageEntryPrice,
            totals: {
              totalNetWorth: getTotalNetWorth(),
              unrealizedPnl: calcUnrealizedPnl('pnlUsd'),
              realizedPnl: calcRealizedPnl('pnlUSD'),
              totalDebt: getTotalDebt(),
              totalPnl: calcRealizedPnl('pnlUSD') + calcUnrealizedPnl('pnlUsd'),
              totalRewards: getTotalRewards(),
              walletNetWorth: userNetWorth,
              netNav: getTotalNetWorth() + calcUnrealizedPnl('pnlUsd'),
            },
          };
        }
      );

      return allData;
    } catch (error) {
      console.log(error, 'DATA REDUCER ERROR');
      return thunkAPI.rejectWithValue('Failed trying to get data about this wallet');
    }
  }
);
