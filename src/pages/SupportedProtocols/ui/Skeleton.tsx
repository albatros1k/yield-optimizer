import { memo } from 'react';

import { Block, Card, Grid, Row } from '../../../shared/ui/Containers';
import { SkeletonContent } from '../../../shared/ui/Skeleton';

export const SupportedProtocolsSkeleton = memo(() => {
  return (
    <Block p="40px 0" w="100%">
      <Card p="20px" m="0 0 40px">
        <Row align="center" justify="flex-start">
          <SkeletonContent h="20px" w="100%" />
        </Row>
      </Card>
      {[...Array(5)].map((_, i) => (
        <Card m="0 0 27px" key={i}>
          <Grid w="100%" colGap="0" rowGap="0" colTemplate="repeat(5, 1fr)" rowTemplate="auto">
            {[...Array(20)].map((_, i) => (
              <Row key={i} h="60px" align="center" justify="flex-start" p="0 21px">
                <SkeletonContent h="20px" w="100%" />
              </Row>
            ))}
          </Grid>
        </Card>
      ))}
    </Block>
  );
});
