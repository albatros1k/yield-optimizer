import { FC, Fragment } from 'react';
import { useTheme } from 'styled-components';

import { Block, Card, Grid, Row } from '../../../shared/ui/Containers';
import { SkeletonCircle, SkeletonContent } from '../../../shared/ui/Skeleton';
import { Line } from '../../../shared/ui/Spacer';
import { SubTitle } from '../../../shared/ui/Typography';

export const DebtRewardSkeleton: FC = () => {
  const {
    colors: { alterText, alterHelp, alterBg },
  } = useTheme();

  const renderSkeleton = (): JSX.Element[] => {
    const renderRows = (): JSX.Element[] =>
      [0, 1, 2, 3, 4].map((el, index, { length }) => (
        <Fragment key={el}>
          <Row h="65px" w="100%" p="18px 20px">
            <Grid
              w="100%"
              colTemplate="2fr repeat(2, 1fr) 140px"
              colGap="10px"
              rowTemplate="none"
              rowGap="0"
            >
              <Row w="fit-content" align="center">
                <SkeletonCircle w="24px" h="24px" m="0 14px 0 0" />
                <Block h="19px" w="100px">
                  <SkeletonContent h="100%" />
                </Block>
              </Row>
              <Block h="19px" w="100px">
                <SkeletonContent h="100%" />
              </Block>
              <Block h="19px" w="100px">
                <SkeletonContent h="100%" />
              </Block>
              <Block h="28px" w="140px">
                <SkeletonContent h="100%" />
              </Block>
            </Grid>
          </Row>
          {index < length - 1 ? <Line /> : null}
        </Fragment>
      ));

    return [0, 1, 2].map(el => (
      <Card key={el} w="100%" p="30px 25px" m="0 0 24px">
        <Row m="0 0 20px" w="100%" align="center">
          <SkeletonCircle w="20px" h="20px" m="0 12px 0 0" />
          <Block m="0 15px 0 0" h="22px" w="100px">
            <SkeletonContent h="100%" />
          </Block>
          <Block h="22px" w="50px">
            <SkeletonContent h="100%" />
          </Block>
        </Row>
        <Card border={alterHelp} bg="transparent" w="100%" overflowHidden>
          <Row w="100%" h="40px" bg={alterBg} p="10px 20px">
            <Grid
              w="100%"
              colTemplate="2fr repeat(2, 1fr) 140px"
              colGap="10px"
              rowTemplate="none"
              rowGap="0"
            >
              <SubTitle color={alterText}>Asset</SubTitle>
              <SubTitle color={alterText}>Amount</SubTitle>
              <SubTitle color={alterText}>Value</SubTitle>
              <span />
            </Grid>
          </Row>
          <Line />
          {renderRows()}
        </Card>
      </Card>
    ));
  };

  return <Fragment>{renderSkeleton()}</Fragment>;
};
