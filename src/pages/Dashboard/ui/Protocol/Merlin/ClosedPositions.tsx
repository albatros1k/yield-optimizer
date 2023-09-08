import { Fragment, memo, useMemo } from 'react';

import { useAppSelector } from '../../../../../store';
import { useToggle } from '../../../../../helpers/hooks';

import { ExpandedCardContent } from '../../../../../shared/ui/Containers';
import { Main } from '../../../../../shared/ui/Typography';
import { Spacer } from '../../../../../shared/ui/Spacer';
import { ExpandButton } from '../../../../../shared/ui/Buttons';

import { selectMerlinInfo } from '../../../../../features/data/selectors/merlin';
import { ITokenOverview } from '../../../../../features/data/apis/merlin/types/overview';
import { IPoolInfo } from '../../../../../features/data/apis/merlin/types/poolInfo';

import { ModuleEnum } from './modules/Module';
import { ClosedModule } from './modules/Closed';

interface ClosedPositionsProps {
  protocolName: string;
  hasOpenPositions: boolean;
}

export const ClosedPositions = memo<ClosedPositionsProps>(({ protocolName, hasOpenPositions }) => {
  const { overviews, poolInfo } = useAppSelector(selectMerlinInfo);
  const [isShowed, showClosed] = useToggle(!hasOpenPositions);

  const modules = useMemo(
    () =>
      overviews.reduce<Record<string, ITokenOverview[]>>((map, overview) => {
        const { userTokenProtocolOverviews } = overview;
        userTokenProtocolOverviews.forEach(tokenData => {
          const { protocol } = tokenData;
          if (protocol.includes(protocolName)) {
            const isUNI: boolean = protocol.includes('UNISWAP');
            //Because of backend, we have to declare it by ourself
            const [, moduleName = isUNI ? ModuleEnum.POOL : ModuleEnum.LENDING] =
              protocol.split('__');
            map[moduleName] ? map[moduleName].push(overview) : (map[moduleName] = [overview]);
          }
        });
        return map;
      }, {}),
    [overviews, protocolName]
  );

  // This logic to filter closed positions in there is no yield, pnl and -txFee === pnl
  const filtered = Object.fromEntries(
    Object.entries(modules).map(([moduleName, modules]) => {
      const newModules = modules.filter(({ userTokenProtocolOverviews, tokenAddress }) => {
        const calcTotal = (
          key: keyof Pick<
            (typeof userTokenProtocolOverviews)[number],
            'pnlUSD' | 'yieldUSD' | 'txFeeUSD'
          >
        ): number =>
          userTokenProtocolOverviews.reduce<number>((total, over) => {
            const isUNI: boolean = over.protocol.includes('UNISWAP');

            const protocol =
              over.protocol.split('__').length > 1
                ? over.protocol
                : `${over.protocol}__${isUNI ? ModuleEnum.POOL : ModuleEnum.LENDING}`;

            if (protocol.includes(moduleName)) {
              const { supplied, borrowed } = poolInfo.find(
                info => info.protocol === over.protocol
              ) as IPoolInfo;
              const activePositions = [...supplied, ...borrowed].filter(
                ({ address }) => address === tokenAddress
              );
              const active = activePositions.reduce<number>(
                (total, active) => (total += Number(active[key as keyof typeof active])),
                0
              );
              total += over[key] - (active || 0);
            }
            return total;
          }, 0);

        const condition =
          !!calcTotal('pnlUSD') &&
          !!calcTotal('yieldUSD') &&
          (-calcTotal('txFeeUSD')).toFixed(2) !== calcTotal('pnlUSD').toFixed(2);
        return condition;
      });

      return [moduleName, newModules];
    })
  );

  const renderModules = (): JSX.Element[] =>
    Object.entries(filtered).map(([moduleName, positions], index) => (
      <ClosedModule key={moduleName + index} {...{ moduleName, protocolName, positions }} />
    ));

  const allClosedPositions: ITokenOverview[] = Object.values(modules).flat();

  if (!allClosedPositions.length) return null;
  return (
    <Fragment>
      <ExpandedCardContent open={isShowed} m={hasOpenPositions ? '20px 0' : '0px'} p="24px 0 0">
        <Main m="0 0 32px 24px">
          {allClosedPositions.length} Closed Position{allClosedPositions.length > 1 ? 's' : ''}
        </Main>
        {renderModules()}
      </ExpandedCardContent>
      <Spacer />
      {hasOpenPositions ? (
        <ExpandButton
          isOpen={isShowed}
          onClick={showClosed}
          w="230px"
          text={
            isShowed
              ? 'Hide  Closed Positions'
              : `Show ${allClosedPositions.length} Closed Position${
                  allClosedPositions.length > 1 ? 's' : ''
                }`
          }
        />
      ) : null}
    </Fragment>
  );
});
