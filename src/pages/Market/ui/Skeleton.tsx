import { FC, Fragment } from 'react';

import { Block, Card, Column, Row } from '../../../shared/ui/Containers';
import { SkeletonCircle, SkeletonContent } from '../../../shared/ui/Skeleton';
import { Line, VerticalLine } from '../../../shared/ui/Spacer';
import { Table } from './styled';

export const TrendingSkeleton: FC = () => {
  const renderBest2Pools = (): JSX.Element[] => {
    return [1, 2].map(el => {
      return (
        <Card key={el} h="266px" w="calc(50% - 10px)">
          <Row h="100%" w="100%">
            <Column w="209px" h="100%" p="18px 20px 0" justify="flex-start">
              <SkeletonCircle w="32px" h="32px" m="0 0 12px" />
              <SkeletonContent h="20px" m="0 0 8px" />
              <Row justify="flex-start" align="center" w="100%">
                <SkeletonCircle w="12px" h="12px" m="0 5px 0 0" />
                <SkeletonContent h="15px" />
              </Row>
              <Row m="auto 0 0" h="52px" w="100%" align="center">
                <SkeletonContent h="15px" />
              </Row>
            </Column>
            <VerticalLine />
            <Column w="calc(100% - 210px)" h="100%" p="0 20px" justify="flex-start">
              <Row h="52px" align="center" w="100%">
                <SkeletonContent h="15px" />
              </Row>
              <Line />
              <Row h="52px" align="center" w="100%">
                <SkeletonContent h="15px" />
              </Row>
              <Line />
              <Row h="52px" align="center" w="100%">
                <SkeletonContent h="15px" />
              </Row>
              <Line />
              <Row h="52px" align="center" w="100%">
                <SkeletonContent h="15px" />
              </Row>
              <Line />
              <Row h="52px" align="center" w="100%">
                <SkeletonContent h="15px" />
              </Row>
            </Column>
          </Row>
        </Card>
      );
    });
  };

  const renderBestPools = (): JSX.Element[] => {
    return [1, 2, 3, 4, 5].map(el => {
      return (
        <Card key={el} h="269px" w="calc(20% - 16px)" p="18px 20px 0">
          <SkeletonCircle w="24px" h="24px" />
          <SkeletonContent h="20px" m="14px 0 6px" />
          <Row m="0 0 18px" justify="flex-start" align="center" w="100%">
            <SkeletonCircle w="12px" h="12px" m="0 5px 0 0" />
            <SkeletonContent h="15px" />
          </Row>
          <Line />
          <Row h="37px" align="center" w="100%">
            <SkeletonContent h="15px" />
          </Row>
          <Line />
          <Row h="37px" align="center" w="100%">
            <SkeletonContent h="15px" />
          </Row>
          <Line />
          <Row h="37px" w="100%" align="center">
            <SkeletonContent h="15px" />
          </Row>
          <Line />
          <Row h="37px" w="100%" align="center">
            <SkeletonContent h="15px" />
          </Row>
        </Card>
      );
    });
  };

  return (
    <Fragment>
      <Row flexWrap="wrap" w="100%" m="0 0 20px">
        <Card h="50px" w="calc(20% - 16px)" p="15px 20px">
          <SkeletonContent h="100%" />
        </Card>
        <Card h="50px" w="calc(20% - 16px)" p="15px 20px">
          <SkeletonContent h="100%" />
        </Card>
        <Card h="50px" w="calc(20% - 16px)" p="15px 20px">
          <SkeletonContent h="100%" />
        </Card>
        <Card h="50px" w="calc(20% - 16px)" p="15px 20px">
          <SkeletonContent h="100%" />
        </Card>
        <Card h="50px" w="calc(20% - 16px)" p="15px 20px">
          <SkeletonContent h="100%" />
        </Card>
      </Row>
      <Row flexWrap="wrap" w="100%" h="266px" m="0 0 20px">
        {renderBest2Pools()}
      </Row>
      <Row flexWrap="wrap" w="100%" h="269px">
        {renderBestPools()}
        <Block w="calc(20% - 16px)" />
        <Block w="calc(20% - 16px)" />
        <Block w="calc(20% - 16px)" />
        <Block w="calc(20% - 16px)" />
      </Row>
    </Fragment>
  );
};

export const PoolsSkeleton: FC = () => {
  const renderRows = (): JSX.Element[] => {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(el => {
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
      <Block w="210px" m="30px auto">
        <SkeletonContent h="42px" />
      </Block>
    </Card>
  );
};
