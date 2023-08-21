import { FC, Fragment, memo, useMemo } from 'react';
import { useTheme } from 'styled-components';
import { capitalize } from 'lodash-es';

import { Line } from '../../../../../../shared/ui/Spacer';
import { H3, SubTitle } from '../../../../../../shared/ui/Typography';
import { Grid, Row } from '../../../../../../shared/ui/Containers';

import { IPortfolioItem } from '../../../../../../features/data/apis/merlin/types/portfolio';

import { gridColumnPattern } from '../../../../lib/const';
import { definePlus } from '../../../../../../helpers/merlinHelpers';

import { DeBankPosition } from '../DebankPosition';

interface RegularModuleProps {
  positions: IPortfolioItem[];
  moduleName: string;
}

export const RegularModule: FC<RegularModuleProps> = memo(({ positions, moduleName }) => {
  const {
    colors: { alterText },
  } = useTheme();

  const hasRewards: boolean = positions.some(
    ({ detail: { reward_token_list } }) => reward_token_list && reward_token_list?.length
  );

  const moduleNetWorth: number = useMemo(
    () =>
      positions.reduce<number>(
        (total, { stats: { asset_usd_value } }) => (total += asset_usd_value),
        0
      ),
    [positions]
  );

  const renderTitles = useMemo<JSX.Element[]>(() => {
    const titles: Array<string | null> = [
      'Asset',
      'Amount',
      null,
      null,
      hasRewards ? 'Rewards' : null,
      null,
      'Holdings',
      null,
    ];
    return titles.map((title, index, { length }) => {
      const isLast = length - index === 1;
      return (
        <SubTitle
          key={typeof title === 'string' ? title : index}
          color={alterText}
          ta={isLast ? 'right' : 'left'}
        >
          {title}
        </SubTitle>
      );
    });
  }, [alterText, hasRewards]);

  const renderPositions = useMemo(
    (): JSX.Element[] =>
      [...positions]
        .sort((a, b) => {
          const getHoldings = (pos: IPortfolioItem): number =>
            Number(
              pos.detail.supply_token_list?.reduce<number>(
                (total, { amount, price }) => (total += amount * price),
                0
              )
            );
          return getHoldings(b) - getHoldings(a);
        })
        .map((position, index, { length }) => {
          const notLast: boolean = index < length - 1;
          return (
            <Fragment key={position.update_at + index}>
              <DeBankPosition {...{ position, hasRewards }} />
              {notLast ? <Line /> : null}
            </Fragment>
          );
        }),
    [hasRewards, positions]
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
          <H3 m="0 12px 0 0">{capitalize(moduleName)}</H3>
          <H3 color={alterText}>{definePlus(moduleNetWorth, false)}</H3>
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
      {renderPositions}
    </Fragment>
  );
});
