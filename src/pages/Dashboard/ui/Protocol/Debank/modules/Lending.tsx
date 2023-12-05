import { FC, Fragment, useMemo } from 'react';
import { useTheme } from 'styled-components';
import { capitalize } from 'lodash-es';

import {
  IPortfolioItem,
  IToken,
} from '../../../../../../features/data/apis/merlin/types/portfolio';

import { Line, Spacer } from '../../../../../../shared/ui/Spacer';
import { TokenIcon } from '../../../../../../shared/ui/Images';
import { H3, Main } from '../../../../../../shared/ui/Typography';
import { Grid, GridItem, PositionGrid, Row } from '../../../../../../shared/ui/Containers';

import { LendingHeadings, gridColumnPattern } from '../../../../lib/const';
import { calcRound, definePlus } from '../../../../../../helpers/merlinHelpers';

interface LendingProps {
  pos: IPortfolioItem;
}

export const Lending: FC<LendingProps> = ({ pos: { name, stats, detail } }) => {
  const { supply_token_list, reward_token_list, borrow_token_list } = detail || {};
  const { net_usd_value } = stats || {};

  const {
    colors: { alterText },
  } = useTheme();

  const renderTitles = useMemo<JSX.Element[]>(() => {
    const titles: Array<string | null> = [
      'Asset',
      'Amount',
      null,
      null,
      null,
      null,
      'Holdings',
      null,
    ];
    return titles.map((title, index, { length }) => {
      const isLast = length - index === 1;
      return (
        <Main
          key={typeof title === 'string' ? title : index}
          color={alterText}
          ta={isLast ? 'right' : 'left'}
        >
          {title}
        </Main>
      );
    });
  }, [alterText]);

  const renderPositions = (
    heading: LendingHeadings,
    list: IToken[] | null
  ): JSX.Element | undefined => {
    if (list && Array.isArray(list) && list.length) {
      const total: number = list.reduce<number>(
        (total, { price, amount }) => (total += amount * price),
        0
      );
      return (
        <Fragment>
          <Grid
            rowGap="0"
            colGap="2%"
            rowTemplate="34px"
            colTemplate={gridColumnPattern}
            m="0 0 24px"
            p="0 24px"
          >
            <Row align="center">
              <H3 m="0 12px 0 0">{heading}</H3>
              <H3 color={alterText}>{definePlus(total, false)}</H3>
            </Row>
          </Grid>

          <Grid
            rowGap="0"
            colGap="2%"
            rowTemplate="auto"
            colTemplate={gridColumnPattern}
            m="0 0 18px"
            p="0 24px"
          >
            {renderTitles}
          </Grid>
          <Line />
          {[...list]
            .sort((a, b) => {
              return b.amount * b.price - a.amount * a.price;
            })
            .map(({ id, symbol, price, amount }, index, { length }) => {
              const valueUSD = amount * price;
              return (
                <Fragment key={id + index}>
                  <PositionGrid
                    rowGap="0"
                    colGap="2%"
                    rowTemplate="auto"
                    colTemplate={gridColumnPattern}
                    p="22px 24px"
                  >
                    <Row align="center">
                      <TokenIcon address={id} w="24px" h="24px" />
                      <Main m="0 0 0 14px">{symbol}</Main>
                    </Row>
                    <GridItem colStart={2} colEnd={5}>
                      <Main dotted>{calcRound(amount, true)}</Main>
                    </GridItem>
                    <div />
                    <div />
                    <Main dotted>{definePlus(valueUSD, false)}</Main>
                  </PositionGrid>
                  {index < length - 1 ? <Line /> : null}
                </Fragment>
              );
            })}
        </Fragment>
      );
    }
  };

  return (
    <Fragment>
      <Grid
        rowGap="0"
        colGap="2%"
        rowTemplate="34px"
        colTemplate={gridColumnPattern}
        m="0 0 24px"
        p="0 24px"
      >
        <Row align="center">
          <H3 m="0 12px 0 0">{capitalize(name)}</H3>
          <H3 color={alterText}>{definePlus(net_usd_value, false)}</H3>
        </Row>
      </Grid>
      {renderPositions('Supplied', supply_token_list)}
      {Boolean(renderPositions('Borrowed', borrow_token_list)) && <Spacer />}
      {renderPositions('Borrowed', borrow_token_list)}
      {Boolean(renderPositions('Rewards', reward_token_list)) && <Spacer />}
      {renderPositions('Rewards', reward_token_list)}
    </Fragment>
  );
};
