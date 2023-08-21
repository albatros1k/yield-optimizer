import { Fragment, memo, useMemo } from 'react';
import { useTheme } from 'styled-components';
import { capitalize } from 'lodash-es';

import {
  ITokenOverview,
  IUserTokenProtocolOverview,
} from '../../../../../../features/data/apis/merlin/types/overview';

import { Grid, GridItem } from '../../../../../../shared/ui/Containers';
import { H3, SubTitle } from '../../../../../../shared/ui/Typography';
import { Line } from '../../../../../../shared/ui/Spacer';

import { closedModuleTitles, gridColumnPattern } from '../../../../lib/const';

import { ClosedPosition } from '../ClosedPosition';
import { ModuleEnum } from './Module';

interface ClosedModuleProps {
  moduleName: string;
  protocolName: string;
  positions: ITokenOverview[];
}

export const ClosedModule = memo<ClosedModuleProps>(({ moduleName, protocolName, positions }) => {
  const {
    colors: { alterText },
  } = useTheme();

  const renderTitles = useMemo(
    () =>
      closedModuleTitles.map((title, index) => {
        const start = index > 1 ? index + 2 : index + 1;
        const end = index === 1 ? start + 2 : start + 1;
        return (
          <GridItem key={typeof title === 'string' ? title : index} colStart={start} colEnd={end}>
            <SubTitle dotted color={alterText}>
              {title}
            </SubTitle>
          </GridItem>
        );
      }),
    [alterText]
  );

  const renderPositions = useMemo((): JSX.Element[] => {
    const _positions = JSON.parse(JSON.stringify(positions)) as ITokenOverview[];
    _positions.forEach(pos => {
      pos.userTokenProtocolOverviews = pos.userTokenProtocolOverviews.filter(el => {
        const isUNI: boolean = el.protocol.includes('UNISWAP');
        const protocol =
          el.protocol.split('__').length > 1
            ? el.protocol
            : `${el.protocol}__${isUNI ? ModuleEnum.POOL : ModuleEnum.LENDING}`;
        return protocol.includes(`${protocolName}__${moduleName}`);
      });
    });

    return [..._positions]
      .sort((a, b) => {
        const calcTotal = (
          el: ITokenOverview,
          key: keyof Pick<IUserTokenProtocolOverview, 'pnlUSD' | 'yieldUSD' | 'txFeeUSD'>
        ): number =>
          el.userTokenProtocolOverviews
            .filter(({ protocol }) => protocol.includes(protocolName))
            .reduce<number>((total, over) => (total += over[key]), 0);
        return calcTotal(b, 'txFeeUSD') - calcTotal(a, 'txFeeUSD');
      })
      .map((pos, index, { length }) => (
        <Fragment key={pos.id + index}>
          <ClosedPosition {...{ pos, protocolName, moduleName }} />
          {index < length - 1 ? <Line /> : null}
        </Fragment>
      ));
  }, [moduleName, positions, protocolName]);

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
        <H3 m="0 12px 0 0">{capitalize(moduleName)}</H3>
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
      {renderPositions}
    </Fragment>
  );
});
