import { FC, Fragment, memo, useMemo } from 'react';
import { useTheme } from 'styled-components';

import { SubTitle } from '../../../../../../shared/ui/Typography';
import { Grid } from '../../../../../../shared/ui/Containers';
import { Line } from '../../../../../../shared/ui/Spacer';

import { MerlinPosition } from '../MerlinPosition';
import {
  IActivePosition,
  IPoolInfo,
  ISupplyBorrowReward,
} from '../../../../../../features/data/apis/merlin/types/poolInfo';
import { gridColumnPattern, moduleTitles } from '../../../../lib/const';

interface RegularModuleProps {
  mod: IPoolInfo;
  moduleActivePositions: IActivePosition[];
}

export const RegularModule: FC<RegularModuleProps> = memo(
  ({ mod: { supplied, protocol }, moduleActivePositions }) => {
    const {
      colors: { alterText },
    } = useTheme();

    const renderTitles = useMemo(
      () =>
        moduleTitles.map((title, index, { length }) => {
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
        }),
      [alterText]
    );

    const renderPositions = () => {
      if (supplied.length)
        return (
          <Fragment>
            <Grid
              rowGap="0"
              colGap="2%"
              rowTemplate="auto"
              colTemplate={gridColumnPattern}
              p="0 24px"
            >
              {renderTitles}
            </Grid>
            <Line m="18px 0 0" />
            {[...supplied]
              .sort((a, b) => b.valueUSD - a.valueUSD)
              .map<JSX.Element>((position: ISupplyBorrowReward, i, { length }) => {
                const currentActivePositions: IActivePosition[] | undefined =
                  moduleActivePositions.filter(
                    ({ underlyingAddress, proxy, positionId }) =>
                      underlyingAddress === position.address &&
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
    };

    return <Fragment>{renderPositions()}</Fragment>;
  }
);
