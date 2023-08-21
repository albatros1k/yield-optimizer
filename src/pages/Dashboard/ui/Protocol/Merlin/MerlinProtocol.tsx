import { FC, Fragment, MouseEvent, memo, useCallback, useMemo } from 'react';
import { useTheme } from 'styled-components';

import { Module } from './modules/Module';
import { useAppSelector } from '../../../../../store';

import { IPlatform } from '../../../../../features/data/reducers/merlin';
import { selectMerlinInfo } from '../../../../../features/data/selectors/merlin';
import { IPoolInfo } from '../../../../../features/data/apis/merlin/types/poolInfo';

import { icons } from '../../../../../shared/Icons';
import {
  Block,
  ExpandedCardContent,
  ExpandedCardHeader,
  Grid,
  GridItem,
  Row,
} from '../../../../../shared/ui/Containers';
import { SquareImage } from '../../../../../shared/ui/Images';
import { H3, SubTitle } from '../../../../../shared/ui/Typography';
import { Line } from '../../../../../shared/ui/Spacer';

import { definePlus, onImageError, parseProtocol } from '../../../../../helpers/merlinHelpers';
import { useToggle } from '../../../../../helpers/hooks';

import { IconContainer } from '../../../../../widgets/Sidebar/ui/styled';
import { ContentState, gridColumnPattern } from '../../../lib/const';

import { Rewards } from '../../Widgets/Rewards';
import { Pnl } from '../../Widgets/Pnl';
import { ClosedPositions } from './ClosedPositions';

interface MerlinProtocolProps {
  protocolInfo: IPlatform;
}

export const MerlinProtocol: FC<MerlinProtocolProps> = memo(({ protocolInfo }) => {
  const { chain, logo_url, reward, totalNet, protocolName, protocolPNL } = protocolInfo;

  const [open, toggleOpen] = useToggle();
  const { poolInfo } = useAppSelector(selectMerlinInfo);
  const {
    colors: { accentMain, alterHelp, textColor, alterText },
  } = useTheme();

  const modules = useMemo<IPoolInfo[]>(
    () =>
      poolInfo.filter(
        ({ protocol, supplied, borrowed, chain: poolInfoChain }) =>
          protocol.includes(protocolName) &&
          (supplied.length || borrowed.length) &&
          poolInfoChain === chain
      ),
    [poolInfo, protocolName, chain]
  );

  const hasOpenPositions: boolean = modules.some(
    ({ supplied, borrowed }) => supplied.length || borrowed.length
  );

  const onOpen = useCallback(
    (e: MouseEvent<HTMLElement>): void => {
      e.stopPropagation();
      toggleOpen();
    },
    [toggleOpen]
  );

  const { arrow } = icons;

  const unclaimedFees = reward.reduce<number>(
    (total, { valueUSD }) => (total += Number(valueUSD)),
    0
  );

  const renderModules = useMemo<JSX.Element[]>(
    () =>
      modules.map((mod, index, { length }) => (
        <Fragment key={mod.protocol}>
          <Module {...{ mod }} />
          {length - index === 1 ? null : <Line m="10px 0" />}
        </Fragment>
      )),
    [modules]
  );

  return (
    <Block m="0 0 24px">
      <ExpandedCardHeader open={open} p="12px 24px 12px 24px" onClick={onOpen}>
        <Grid rowGap="0" colGap="2%" rowTemplate="34px" colTemplate={gridColumnPattern}>
          <Row align="center">
            <SquareImage
              src={logo_url as string}
              alt="logo"
              w="24px"
              h="24px"
              m="0 14px 0 0"
              onError={onImageError}
            />
            <H3>{parseProtocol(protocolName)}</H3>
          </Row>
          <GridItem colStart={2} colEnd={4}>
            {unclaimedFees > 0 ? <Rewards rewards={unclaimedFees} /> : null}
          </GridItem>
          <GridItem colStart={4} colEnd={6}>
            {protocolPNL ? <Pnl {...{ pnl: protocolPNL }} /> : null}
          </GridItem>
          <GridItem colStart={7} colEnd={8}>
            <H3>{definePlus(totalNet, false)}</H3>
          </GridItem>
          <Row align="center" justify="flex-end">
            <SubTitle m="0 12px 0 0">{open ? ContentState.HIDE : ContentState.EXPAND}</SubTitle>
            <IconContainer
              w="24px"
              h="24px"
              bg={open ? alterHelp : accentMain}
              m="0 14px 0 0"
              tf={`rotate(${open ? 0.5 : 0}turn)`}
              stroke={open ? alterText : textColor}
            >
              {arrow}
            </IconContainer>
          </Row>
        </Grid>
      </ExpandedCardHeader>
      <ExpandedCardContent open={open} p="24px 0 ">
        {renderModules}
        <ClosedPositions {...{ protocolName, hasOpenPositions }} />
      </ExpandedCardContent>
    </Block>
  );
});
