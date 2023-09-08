import { memo, useMemo } from 'react';
import { truncate } from 'lodash-es';
import { useNavigate } from 'react-router';
import { useTheme } from 'styled-components';

import { Button } from '../../../shared/ui/Buttons';
import { SquareImage } from '../../../shared/ui/Images';
import { definePlus } from '../../../helpers/merlinHelpers';
import { H1, Main } from '../../../shared/ui/Typography';
import { Card, Column, Grid, Row } from '../../../shared/ui/Containers';

import { selectWalletAddress } from '../../../features/data/selectors/wallet';
import { getAllPlatforms, selectMerlinInfo } from '../../../features/data/selectors/merlin';

import { useAppSelector } from '../../../store';
import { useBlockies, useColor } from '../../../helpers/hooks';

import { TitleSkeleton } from './Skeleton';

export const MainInfo = memo(() => {
  const walletAddress = useAppSelector(selectWalletAddress);
  const allPlatforms = useAppSelector(getAllPlatforms);
  const {
    totals: { totalNetWorth, totalPnl, realizedPnl, totalDebt, totalRewards },
    userBalances,
    isInitialLoaded,
  } = useAppSelector(selectMerlinInfo);

  const navigate = useNavigate();
  const blockiesIcon = useBlockies();

  const {
    colors: { alterBg, alterText },
  } = useTheme();

  const defineColor = useColor();

  const numberOfPositions: number = useMemo(() => {
    return allPlatforms.reduce<number>((total, element) => {
      const { withPnl } = element;
      if (withPnl) {
        const { supplied, borrowed } = element;
        total += [...supplied, ...borrowed].length;
      } else {
        const { portfolio_item_list } = element;
        portfolio_item_list.forEach(({ detail: { borrow_token_list, supply_token_list } }) => {
          [supply_token_list, borrow_token_list].forEach(arr => {
            if (Array.isArray(arr)) {
              total += arr.length;
            }
          });
        });
      }
      return total;
    }, 0);
  }, [allPlatforms]);

  const numberOfAssets = userBalances.length;

  const goToRewardsPage = () => navigate('/rewards');

  return (
    <Card w="100%">
      <Card w="100%" p="18px 24px" bg={alterBg}>
        <Row w="100%" justify="space-between" align="center">
          <Row align="center">
            <SquareImage w="24px" h="24px" src={blockiesIcon} m="0 10px 0 0" />
            <Column>
              <Main>{truncate(walletAddress)}</Main>
            </Column>
          </Row>
        </Row>
      </Card>

      <Grid
        w="100%"
        colGap="15px"
        rowGap="0"
        colTemplate="2fr repeat(2, 1fr) 2fr"
        rowTemplate="none"
        p="16px 24px 20px"
        align="flex-start"
      >
        {isInitialLoaded && !numberOfPositions ? (
          <Main color={alterText}>No Data Available for Connected Wallet</Main>
        ) : (
          <>
            <Column>
              <Main color={alterText} m="0 0 6px">
                Net Worth
              </Main>
              {isInitialLoaded ? (
                <>
                  <H1 m="0 0 4px">{definePlus(totalNetWorth, false)}</H1>
                  <Main color={alterText}>
                    {numberOfAssets} asset{numberOfAssets > 1 ? 's' : ''} + {numberOfPositions}{' '}
                    position{numberOfPositions > 1 ? 's' : ''}
                  </Main>
                </>
              ) : (
                <TitleSkeleton />
              )}
            </Column>
            <Column>
              <Main color={alterText} m="0 0 6px">
                Total P&L
              </Main>
              {isInitialLoaded ? (
                <>
                  <H1 m="0 0 4px" color={defineColor(totalPnl)}>
                    {definePlus(totalPnl)}
                  </H1>
                  <Row>
                    <Main color={alterText} m="0 3px 0 0">
                      Realized:
                    </Main>
                    <Main color={defineColor(realizedPnl)}>{definePlus(realizedPnl)}</Main>
                  </Row>
                </>
              ) : (
                <TitleSkeleton />
              )}
            </Column>
            <Column>
              <Main color={alterText} m="0 0 6px">
                Debt
              </Main>
              {isInitialLoaded ? (
                <H1 m="0 0 4px">{definePlus(totalDebt, false)}</H1>
              ) : (
                <TitleSkeleton />
              )}
            </Column>
            <Column>
              <Main color={alterText} m="0 0 6px">
                Rewards
              </Main>
              {isInitialLoaded ? (
                <>
                  <H1 m="0 0 4px">{definePlus(totalRewards, false)}</H1>
                  {totalRewards > 0 ? (
                    <Button w="108px" p="5px 12px" onClick={goToRewardsPage}>
                      Claim Rewards
                    </Button>
                  ) : null}
                </>
              ) : (
                <TitleSkeleton />
              )}
            </Column>
          </>
        )}
      </Grid>
    </Card>
  );
});
