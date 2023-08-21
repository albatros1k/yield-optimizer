import { FC } from 'react';

import { Loading } from '../../../shared/ui/Loaders';
import { GraySkeletonContent } from '../../../shared/ui/Skeleton';
import { Block, Card, Column, Row } from '../../../shared/ui/Containers';

export const Skeleton: FC = () => {
  return (
    <Card h="400px" w="100%">
      <Row w="100%" h="100%" align="center" justify="center">
        <Loading />
      </Row>
    </Card>
  );
};

export const TitleSkeleton: FC = () => {
  return (
    <Column>
      <Block h="24px" w="135px" m="0 0 11px">
        <GraySkeletonContent h="100%" />
      </Block>
      <Block h="12px" w="68px">
        <GraySkeletonContent h="100%" />
      </Block>
    </Column>
  );
};
