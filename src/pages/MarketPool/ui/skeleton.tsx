import { FC, Fragment } from 'react';

import { Line } from '../../../shared/ui/Spacer';
import { SkeletonCircle, SkeletonContent } from '../../../shared/ui/Skeleton';
import { Block, Card, Column, Grid, Row } from '../../../shared/ui/Containers';
import { Table } from '../../Market/ui/styled';

export const MetricsAndProtocolsSkeleton: FC = () => {
  const renderRows = (): JSX.Element[] => {
    return [0, 1, 2, 3].map(el => {
      return (
        <tr key={el}>
          <td>
            <SkeletonContent h="17.5px" w="100%" />
          </td>
          <td>
            <SkeletonContent h="17.5px" w="100%" />
          </td>
          <td>
            <SkeletonContent h="17.5px" w="100%" />
          </td>
          <td>
            <SkeletonContent h="17.5px" w="100%" />
          </td>
          <td>
            <SkeletonContent h="17.5px" w="100%" />
          </td>
          <td>
            <SkeletonContent h="17.5px" w="100%" />
          </td>
          <td>
            <SkeletonContent h="17.5px" w="100%" />
          </td>
          <td>
            <SkeletonContent h="17.5px" w="100%" />
          </td>
          <td>
            <SkeletonCircle w="20px" h="20px" />
          </td>
        </tr>
      );
    });
  };

  return (
    <Fragment>
      <Card h="125px" m="0 0 40px" p="25px 30px 30px" w="100%">
        <Row>
          <Column w="33%">
            <SkeletonContent m="0 0 23px" h="17.5px" />
            <SkeletonContent h="30px" />
          </Column>
          <Row w="20px" />
          <Row w="66%">
            <Column w="calc(25% - 10px)">
              <SkeletonContent m="0 0 23px" h="17.5px" />
              <SkeletonContent h="30px" />
            </Column>
            <Column w="calc(25% - 10px)">
              <SkeletonContent m="0 0 23px" h="17.5px" />
              <SkeletonContent h="30px" />
            </Column>
            <Column w="calc(25% - 10px)">
              <SkeletonContent m="0 0 23px" h="17.5px" />
              <SkeletonContent h="30px" />
            </Column>
            <Column w="calc(25% - 10px)">
              <SkeletonContent m="0 0 23px" h="17.5px" />
              <SkeletonContent h="30px" />
            </Column>
          </Row>
        </Row>
      </Card>
      <Card w="100%">
        <Table>
          <thead>
            <tr>
              <th>
                <SkeletonContent h="17.5px" w="100%" />
              </th>
              <th>
                <SkeletonContent h="17.5px" w="100%" />
              </th>
              <th>
                <SkeletonContent h="17.5px" w="100%" />
              </th>
              <th>
                <SkeletonContent h="17.5px" w="100%" />
              </th>
              <th>
                <SkeletonContent h="17.5px" w="100%" />
              </th>
              <th>
                <SkeletonContent h="17.5px" w="100%" />
              </th>
              <th>
                <SkeletonContent h="17.5px" w="100%" />
              </th>
              <th colSpan={2}>
                <SkeletonContent h="17.5px" w="50%" />
              </th>
            </tr>
          </thead>
          <tbody>{renderRows()}</tbody>
        </Table>
      </Card>
    </Fragment>
  );
};

export const ComparePoolsSkeleton: FC = () => {
  return (
    <Fragment>
      <Block w="200px" m="40px 0 24px">
        <SkeletonContent h="30px" />
      </Block>
      <Card m="0 0 40px" p="25px 30px 35px" w="100%">
        <Column w="100%" m="0 0 32px">
          <Block w="200px" m="0 0 22px">
            <SkeletonContent h="17.5px" />
          </Block>
          <Grid
            w="100%"
            colGap="20px"
            rowGap="20px"
            colTemplate="repeat(4, 1fr)"
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
            <Block>
              <SkeletonContent h="36px" />
            </Block>
          </Grid>
        </Column>
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
        rowTemplate="repeat(2, 1fr)"
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

export const TopWalletsSkeleton: FC = () => {
  const renderRows = (): JSX.Element[] =>
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((el, index, { length }) => (
      <Fragment key={'row' + el + index}>
        <Row h="60px" align="center" p="0 30px">
          <Row w="120px" h="20px" align="center">
            <SkeletonCircle w="20px" h="20px" />
            <Block m="0 0 0 16px" h="20px" w="84px">
              <SkeletonContent h="100%" />
            </Block>
          </Row>
          <Block h="20px" w="80px">
            <SkeletonContent h="100%" />
          </Block>
        </Row>
        {index < length - 1 ? <Line /> : null}
      </Fragment>
    ));
  return <Fragment>{renderRows()}</Fragment>;
};
