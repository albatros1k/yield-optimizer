import { FC } from 'react';

import { SkeletonCircle, SkeletonContent } from '../../../shared/ui/Skeleton';
import { Block, Card } from '../../../shared/ui/Containers';
import { Table } from '../../Market/ui/styled';

export const Skeleton: FC = () => {
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
    <Card>
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
