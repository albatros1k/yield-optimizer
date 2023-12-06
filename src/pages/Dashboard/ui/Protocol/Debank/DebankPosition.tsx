import { FC, memo } from 'react';
import { useTheme } from 'styled-components';

import { Main } from '../../../../../shared/ui/Typography';
import { MultipleTokenIcons, TokenIcon } from '../../../../../shared/ui/Images';
import { Column, GridItem, PositionGrid, Row } from '../../../../../shared/ui/Containers';

import { IPortfolioItem } from '../../../../../features/data/apis/merlin/types/portfolio';
import { calcRound, definePlus } from '../../../../../helpers/merlinHelpers';
import { gridColumnPattern } from '../../../lib/const';

interface DeBankPositionProps {
  position: IPortfolioItem;
  hasRewards: boolean;
}

export const DeBankPosition: FC<DeBankPositionProps> = memo(
  ({ position: { detail }, hasRewards }) => {
    const { supply_token_list, reward_token_list } = detail;

    const {
      colors: { alterText, textColor },
    } = useTheme();

    const isLP: boolean = Number(supply_token_list?.length) > 1;
    const lpAddresses: string[] = supply_token_list?.map(({ id }) => id) || [];
    const address: string = String(supply_token_list?.[0]?.id);
    const poolName: string | undefined = supply_token_list?.map(({ symbol }) => symbol).join(', ');
    const valueUSD: number = Number(
      supply_token_list?.reduce((acc, { amount, price }) => (acc += amount * price), 0)
    );

    const renderBalances = (): JSX.Element[] | undefined => {
      if (supply_token_list) {
        return supply_token_list.map(({ id, symbol, amount }, index) => (
          <Main w="100%" key={id + index} dotted={true}>{`${calcRound(amount)} ${symbol}`}</Main>
        ));
      }
    };

    const renderRewards = (): JSX.Element[] | JSX.Element | undefined => {
      if (reward_token_list) {
        return reward_token_list.map<JSX.Element>(({ id, symbol, amount, price }, index) => (
          <Main key={id + index} dotted w="100%">
            {`${definePlus(amount, false)} ${symbol} (${definePlus(amount * price, false)})`}
          </Main>
        ));
      } else if (hasRewards) {
        return <Main dotted>—</Main>;
      }
    };

    return (
      <PositionGrid
        rowGap="0"
        colGap="2%"
        rowTemplate="auto"
        colTemplate={gridColumnPattern}
        p="22px 24px"
      >
        <Row align="center">
          {isLP ? (
            <MultipleTokenIcons size={24} addresses={lpAddresses} />
          ) : (
            <TokenIcon w="24px" h="24px" address={address} />
          )}
          <Main color={poolName ? textColor : alterText} m={isLP ? 0 : '0 0 0 14px'}>
            {poolName ? poolName : '—'}
          </Main>
        </Row>
        <GridItem colStart={2} colEnd={5}>
          <Column overflowHidden>{renderBalances()}</Column>
        </GridItem>
        <GridItem colStart={5} colEnd={7}>
          <Column w="100%" overflowHidden>
            {renderRewards()}
          </Column>
        </GridItem>
        <Main dotted color={valueUSD ? textColor : alterText}>
          {definePlus(valueUSD, false)}
        </Main>
      </PositionGrid>
    );
  }
);
