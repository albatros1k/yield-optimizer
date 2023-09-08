import { Fragment, memo, useMemo } from 'react';
import { useTheme } from 'styled-components';

import {
  IActivePosition,
  IPoolInfo,
  ISupplyBorrowReward,
  PositionType,
} from '../../../../../../features/data/apis/merlin/types/poolInfo';
import { LendingHeadings, gridColumnPattern, moduleTitles } from '../../../../lib/const';

import { H3, Main } from '../../../../../../shared/ui/Typography';
import { Grid, Row } from '../../../../../../shared/ui/Containers';
import { Line, Spacer } from '../../../../../../shared/ui/Spacer';

import { definePlus } from '../../../../../../helpers/merlinHelpers';

import { MerlinPosition } from '../MerlinPosition';

interface LendingProps {
  mod: IPoolInfo;
  moduleActivePositions: IActivePosition[];
  moduleName: string;
}

export const Lending = memo<LendingProps>(
  ({ mod: { supplied, borrowed, protocol }, moduleActivePositions }) => {
    const {
      colors: { alterText },
    } = useTheme();

    const renderTitles = useMemo(
      () =>
        moduleTitles.map((title, index, { length }) => {
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
        }),
      [alterText]
    );

    const renderPositions = (
      heading: LendingHeadings,
      values: ISupplyBorrowReward[],
      positionType: PositionType
    ) => {
      const total = values.reduce<number>((total, { valueUSD }) => (total += valueUSD), 0);
      if (values.length) {
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
              p="0 24px"
              m="0 0 18px"
            >
              {renderTitles}
            </Grid>
            <Line />
            {[...values]
              .sort((a, b) => b.valueUSD - a.valueUSD)
              .map<JSX.Element>((position: ISupplyBorrowReward, i, { length }) => {
                const currentActivePositions: IActivePosition[] | undefined =
                  moduleActivePositions.filter(
                    ({ underlyingAddress, type, proxy, positionId }) =>
                      underlyingAddress === position.address &&
                      type === positionType &&
                      proxy === position.proxy &&
                      positionId === position.poolId
                  );

                return (
                  <Fragment key={position.address + i}>
                    <MerlinPosition
                      key={position.address + i}
                      {...{ position, currentActivePositions, protocol }}
                    />
                    {i < length - 1 ? <Line /> : null}
                  </Fragment>
                );
              })}
          </Fragment>
        );
      }
    };

    return (
      <Fragment>
        {renderPositions('Supplied', supplied, 'SUPPLY')}
        <Spacer />
        {renderPositions('Borrowed', borrowed, 'BORROW')}
      </Fragment>
    );
  }
);
