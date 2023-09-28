import { FC, Fragment, MouseEvent, useCallback, useMemo } from 'react';
import { useTheme } from 'styled-components';

import { icons } from '../../../../shared/Icons';
import { Line } from '../../../../shared/ui/Spacer';
import { H3, SubTitle } from '../../../../shared/ui/Typography';
import {
  Block,
  ExpandedCardContent,
  ExpandedCardHeader,
  Grid,
  GridItem,
  Row,
} from '../../../../shared/ui/Containers';

import { useAppSelector } from '../../../../store';
import { selectMerlinInfo } from '../../../../features/data/selectors/merlin';
import { ContentState, gridColumnPattern, walletTitles } from '../../lib/const';
import { IconContainer } from '../../../../widgets/Sidebar/ui/styled';

import { definePlus } from '../../../../helpers/merlinHelpers';
import { useToggle } from '../../../../helpers/hooks';
import { WalletPosition } from './WalletPosition';

export const Wallet: FC = () => {
  const [open, toggleOpen] = useToggle();
  const {
    userBalances,
    totals: { walletNetWorth },
  } = useAppSelector(selectMerlinInfo);
  const {
    colors: { accentMain, alterText, alterHelp, textColor },
  } = useTheme();

  const { arrow, wallet } = icons;

  const onOpen = useCallback(
    (e: MouseEvent<HTMLElement>): void => {
      e.stopPropagation();
      toggleOpen();
    },
    [toggleOpen]
  );

  const renderTitles = useMemo<JSX.Element>(
    () => (
      <Grid
        rowGap="0"
        colGap="2%"
        rowTemplate="18px"
        colTemplate={gridColumnPattern}
        p="0 24px"
        m="0 0 18px"
      >
        {walletTitles.map((title, index) => (
          <SubTitle key={typeof title === 'string' ? title : index} color={alterText}>
            {title}
          </SubTitle>
        ))}
      </Grid>
    ),
    [alterText]
  );

  const renderBalances = useMemo(
    () =>
      [...userBalances]
        .sort(
          (a, b) =>
            (Number(b.balance) / Math.pow(10, b.decimals)) * Number(b.current) -
            (Number(a.balance) / Math.pow(10, a.decimals)) * Number(a.current)
        )
        .map((position, i, { length }) => (
          <Fragment key={position.token_address + position.chain}>
            <WalletPosition {...{ position }} />
            {i < length - 1 ? <Line /> : null}
          </Fragment>
        )),
    [userBalances]
  );

  if (!userBalances.length) return null;
  return (
    <Block m="0 0 24px" w="100%">
      <ExpandedCardHeader open={open} p="12px 24px 12px 24px" onClick={onOpen}>
        <Grid rowGap="0" colGap="2%" rowTemplate="34px" colTemplate={gridColumnPattern}>
          <Row align="center">
            <IconContainer w="24px" h="24px" bg={accentMain} m="0 14px 0 0">
              {wallet}
            </IconContainer>
            <H3>Wallet</H3>
          </Row>
          <GridItem colStart={7} colEnd={8}>
            <H3>{definePlus(walletNetWorth, false)}</H3>
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
      <ExpandedCardContent open={open && userBalances.length > 0} p="24px 0">
        {renderTitles}
        <Line />
        {renderBalances}
      </ExpandedCardContent>
    </Block>
  );
};
