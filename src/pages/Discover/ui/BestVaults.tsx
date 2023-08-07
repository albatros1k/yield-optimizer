import { FC, Fragment } from 'react';
import { useTheme } from 'styled-components';

import { ButtonText, DataTitle, H2, H3, SubTitle } from '../../../shared/ui/Typography';
import { Block, Card, Column, Row, SvgContainer } from '../../../shared/ui/Containers';
import { icons } from '../../../shared/Icons';
import { Line } from '../../../shared/ui/Spacer';

const { question, arrow } = icons;

interface BestVaultsProps {}

export const BestVaults: FC<BestVaultsProps> = () => {
  return (
    <Fragment>
      <Row align="center" m="0 0 32px">
        <H2 m="0 12px 0 0">Best Vaults This Week</H2>
        {question}
      </Row>
      <Row w="100%" justify="space-between">
        <Vault />
        <Vault />
        <Vault />
      </Row>
    </Fragment>
  );
};

export const Vault: FC = () => {
  const {
    colors: { textColor, alterText, subAccentSecondary, bgColor },
  } = useTheme();

  return (
    <Card w="calc(33% - 13px)" overflowHidden pointer>
      <Block w="100%" p="20px" bg="linear-gradient(191deg, #222446 0%, #272845 100%)">
        <Row>
          <Card bg={bgColor} w="fit-content" p="8px 10px" m="0 10px 0 0">
            <SubTitle>Polygon</SubTitle>
          </Card>
          <Card bg={bgColor} w="fit-content" p="8px 10px">
            <SubTitle>Balancer</SubTitle>
          </Card>
        </Row>

        <Row m="12px 0">
          <Card opacity={0.9} bg={textColor} w="fit-content" p="8px 10px" m="0 10px 0 0">
            <Row>
              <SubTitle color={alterText} m="0 6px 0 0">
                Est. APY:
              </SubTitle>
              <DataTitle color={subAccentSecondary}>+3.49%</DataTitle>
            </Row>
          </Card>
          <Card opacity={0.9} bg={textColor} w="fit-content" p="8px 10px">
            <Row>
              <SubTitle color={alterText} m="0 6px 0 0">
                Daily:
              </SubTitle>
              <DataTitle color={subAccentSecondary}>+0.02%</DataTitle>
            </Row>
          </Card>
        </Row>
        <Card bg={bgColor} w="fit-content" p="8px 10px">
          <Row>
            <SubTitle color={alterText} m="0 6px 0 0">
              TVL:
            </SubTitle>
            <SubTitle>$13,492,302</SubTitle>
          </Row>
        </Card>
      </Block>

      <Block p="27px 19px 30px">
        <Row>
          <Column>
            <H3 m="0 0 4px">MaticX / bbaWMATIC</H3>
            <SubTitle color={alterText}>48% / 52%</SubTitle>
          </Column>
        </Row>
      </Block>

      <Line color={bgColor} />
      <Row w="100%" p="14px 20px" justify="space-between">
        <ButtonText color={alterText}>Vault Details</ButtonText>
        <SvgContainer stroke={alterText} tf="rotate(-0.25turn)">
          {arrow}
        </SvgContainer>
      </Row>
    </Card>
  );
};
