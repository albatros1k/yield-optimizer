import { Fragment, MouseEvent, memo, useCallback, useMemo } from 'react';
import { useTheme } from 'styled-components';

import { IPlatform } from '../../../../../features/data/reducers/merlin';
import { useToggle } from '../../../../../helpers/hooks';

import { icons } from '../../../../../shared/Icons';
import { Line } from '../../../../../shared/ui/Spacer';
import { SquareImage } from '../../../../../shared/ui/Images';
import { H3, SubTitle } from '../../../../../shared/ui/Typography';
import {
  Block,
  ExpandedCardContent,
  ExpandedCardHeader,
  Grid,
  GridItem,
  Row,
} from '../../../../../shared/ui/Containers';

import { IPortfolioItem } from '../../../../../features/data/apis/merlin/types/portfolio';

import { definePlus, onImageError, parseProtocol } from '../../../../../helpers/merlinHelpers';
import { ContentState, gridColumnPattern } from '../../../lib/const';
import { IconContainer } from '../../../../../widgets/Sidebar/ui/styled';

import { RegularModule } from './modules/Regular';
import { Lending } from './modules/Lending';

interface DebankProtocolProps {
  protocolInfo: IPlatform;
}

export const DeBankProtocol = memo<DebankProtocolProps>(
  ({ protocolInfo: { logo_url, protocolName, totalNet, portfolio_item_list } }) => {
    const [open, toggleOpen] = useToggle();
    const {
      colors: { alterHelp, accentMain, alterText, textColor },
    } = useTheme();

    const { arrow } = icons;

    const onOpen = useCallback(
      (e: MouseEvent<HTMLElement>): void => {
        e.stopPropagation();
        toggleOpen();
      },
      [toggleOpen]
    );

    const portfolioList = useMemo<Array<[string, IPortfolioItem[]]>>(() => {
      const map: Record<string, IPortfolioItem[]> = {};
      portfolio_item_list.forEach(({ name }) => {
        if (!map[name]) map[name] = portfolio_item_list.filter(p => p.name === name);
      });
      return Object.entries(map);
    }, [portfolio_item_list]);

    const renderModules = useMemo(
      () =>
        [...portfolioList]
          .sort((a, b) => {
            const calcNet = (list: [string, IPortfolioItem[]]): number =>
              list[1].reduce<number>(
                (total, { stats: { asset_usd_value } }) => (total += asset_usd_value),
                0
              );
            return calcNet(b) - calcNet(a);
          })
          .map(([moduleName, positions], index, { length }) => {
            const notLast: boolean = index < length - 1;

            const modulesMap: Record<string, JSX.Element | null> = {
              Lending: <Lending key={moduleName + index} {...{ pos: positions[0] }} />,
              Vesting: null,
              'Options Seller': null,
              'Options Buyer': null,
              'Insurance Seller': null,
              'Insurance Buyer': null,
              Perpetuals: null,
            };

            return (
              <Fragment key={moduleName + index}>
                {typeof modulesMap[moduleName] !== 'undefined' ? (
                  modulesMap[moduleName]
                ) : (
                  <RegularModule {...{ key: moduleName + index, positions, moduleName }} />
                )}
                {notLast ? <Line m="10px 0" /> : null}
              </Fragment>
            );
          }),
      [portfolioList]
    );

    return (
      <Block m="0 0 24px" w="100%">
        <ExpandedCardHeader open={open} p="12px 24px 12px 24px" onClick={onOpen} w="100%">
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
        <ExpandedCardContent open={open} p="24px 0 0">
          {renderModules}
        </ExpandedCardContent>
      </Block>
    );
  }
);
