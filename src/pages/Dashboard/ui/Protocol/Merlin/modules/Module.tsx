import { Fragment, memo } from 'react';
import { useTheme } from 'styled-components';
import { capitalize } from 'lodash-es';

import {
  IActivePosition,
  IPoolInfo,
} from '../../../../../../features/data/apis/merlin/types/poolInfo';
import { selectMerlinInfo } from '../../../../../../features/data/selectors/merlin';
import { gridColumnPattern } from '../../../../lib/const';
import { useAppSelector } from '../../../../../../store';

import { definePlus } from '../../../../../../helpers/merlinHelpers';

import { Grid, Row } from '../../../../../../shared/ui/Containers';
import { H3 } from '../../../../../../shared/ui/Typography';

import { RegularModule } from './Regular';
import { Lending } from './Lending';

interface ModuleProps {
  mod: IPoolInfo;
}

export enum ModuleEnum {
  LENDING = 'LENDING',
  POOL = 'POOL',
}

export const Module = memo<ModuleProps>(({ mod }) => {
  const { activePositionYieldAndPnl } = useAppSelector(selectMerlinInfo);
  const {
    colors: { alterText },
  } = useTheme();

  const { protocol, supplied, borrowed } = mod;

  const isUNI: boolean = protocol.includes('UNISWAP');

  //Because of backend, we have to declare it by ourself
  const [, moduleName = isUNI ? ModuleEnum.POOL : ModuleEnum.LENDING] = protocol.split('__');

  const moduleNetWorth: number =
    supplied.reduce((acc, { valueUSD }) => (acc += valueUSD), 0) -
    borrowed.reduce((acc, { valueUSD }) => (acc += valueUSD), 0);
  const moduleActivePositions: IActivePosition[] = activePositionYieldAndPnl.filter(
    pos => pos.protocol === protocol
  );

  const modulesMap: Record<string, JSX.Element> = {
    LENDING: <Lending key={moduleName} {...{ mod, moduleActivePositions, moduleName }} />,
  };

  if (!supplied.length && !borrowed.length) return null;
  else {
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
        {modulesMap[moduleName as keyof typeof modulesMap] || (
          <RegularModule {...{ mod, moduleActivePositions }} />
        )}
      </Fragment>
    );
  }
});
