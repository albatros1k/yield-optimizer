import { FC, Fragment } from 'react';
import { Block, Card, Column, Grid, Row } from '../../../shared/ui/Containers';
import { SkeletonContent } from '../../../shared/ui/Skeleton';
import { Line } from '../../../shared/ui/Spacer';

export const PoolInfoSkeleton: FC = () => {
  return (
    <Card w="100%">
      <Row p="25px 30px 30px">
        <Column w="calc(30% - 10px)">
          <SkeletonContent m="0 0 23px" h="17.5px" />
          <SkeletonContent h="30px" />
        </Column>
        <Column w="calc(30% - 10px)">
          <SkeletonContent m="0 0 23px" h="17.5px" />
          <SkeletonContent h="30px" />
        </Column>
        <Column w="calc(40% - 10px)">
          <SkeletonContent m="0 0 23px" h="17.5px" />
          <SkeletonContent h="30px" />
        </Column>
      </Row>
      <Line />
      <Row p="25px 30px 30px">
        <Column w="calc(30% - 10px)">
          <SkeletonContent m="0 0 16px" h="17.5px" />
          <SkeletonContent h="20px" />
        </Column>
        <Column w="calc(30% - 10px)">
          <SkeletonContent m="0 0 16px" h="17.5px" />
          <SkeletonContent h="20px" />
        </Column>
        <Column w="calc(40% - 10px)">
          <SkeletonContent m="0 0 16px" h="17.5px" />
          <SkeletonContent h="20px" />
        </Column>
      </Row>
    </Card>
  );
};

export const PoolAnalyticsSkeleton: FC = () => {
  return (
    <Fragment>
      <Card m="0 0 40px" p="25px 30px 30px" w="100%">
        <Column w="100%">
          <Block w="200px" m="0 0 22px">
            <SkeletonContent h="17.5px" />
          </Block>
          <Grid
            w="100%"
            colGap="20px"
            rowGap="20px"
            colTemplate="repeat(4, 116px)"
            rowTemplate="auto"
          >
            <Block>
              <SkeletonContent h="36px" />
            </Block>
            <Block>
              <SkeletonContent h="36px" />
            </Block>
            <Block>
              <SkeletonContent h="36px" />
            </Block>
          </Grid>
        </Column>
      </Card>
      <Card p="25px 30px 20px" m="0 0 20px" w="100%">
        <Row m="0 0 18px">
          <Column>
            <Block h="20px" m="0 0 10px" w="100px">
              <SkeletonContent h="20px" />
            </Block>
            <Block h="17.5px" w="150px">
              <SkeletonContent h="17.5px" />
            </Block>
          </Column>
          <Block h="32px" w="32px">
            <SkeletonContent h="32px" />
          </Block>
        </Row>
        <Block h="240px">
          <SkeletonContent h="240px" />
        </Block>
      </Card>
      <Grid
        colGap="20px"
        rowGap="20px"
        colTemplate="repeat(2, 1fr)"
        rowTemplate="repeat(3, 1fr)"
        w="100%"
      >
        <Card p="25px 30px 20px" w="100%">
          <Row m="0 0 18px">
            <Column>
              <Block h="20px" m="0 0 10px" w="100px">
                <SkeletonContent h="20px" />
              </Block>
              <Block h="17.5px" w="150px">
                <SkeletonContent h="17.5px" />
              </Block>
            </Column>
            <Block h="32px" w="32px">
              <SkeletonContent h="32px" />
            </Block>
          </Row>
          <Block h="240px">
            <SkeletonContent h="240px" />
          </Block>
        </Card>
        <Card p="25px 30px 20px" w="100%">
          <Row m="0 0 18px">
            <Column>
              <Block h="20px" m="0 0 10px" w="100px">
                <SkeletonContent h="20px" />
              </Block>
              <Block h="17.5px" w="150px">
                <SkeletonContent h="17.5px" />
              </Block>
            </Column>
            <Block h="32px" w="32px">
              <SkeletonContent h="32px" />
            </Block>
          </Row>
          <Block h="240px">
            <SkeletonContent h="240px" />
          </Block>
        </Card>
        <Card p="25px 30px 20px" w="100%">
          <Row m="0 0 18px">
            <Column>
              <Block h="20px" m="0 0 10px" w="100px">
                <SkeletonContent h="20px" />
              </Block>
              <Block h="17.5px" w="150px">
                <SkeletonContent h="17.5px" />
              </Block>
            </Column>
            <Block h="32px" w="32px">
              <SkeletonContent h="32px" />
            </Block>
          </Row>
          <Block h="240px">
            <SkeletonContent h="240px" />
          </Block>
        </Card>
        <Card p="25px 30px 20px" w="100%">
          <Row m="0 0 18px">
            <Column>
              <Block h="20px" m="0 0 10px" w="100px">
                <SkeletonContent h="20px" />
              </Block>
              <Block h="17.5px" w="150px">
                <SkeletonContent h="17.5px" />
              </Block>
            </Column>
            <Block h="32px" w="32px">
              <SkeletonContent h="32px" />
            </Block>
          </Row>
          <Block h="240px">
            <SkeletonContent h="240px" />
          </Block>
        </Card>
      </Grid>
    </Fragment>
  );
};
