import { useTheme } from 'styled-components';

import { Block, Grid, Row } from '../../../shared/ui/Containers';
import { GraySkeletonCircle, GraySkeletonContent } from '../../../shared/ui/Skeleton';

export const UserSkeleton = () => {
  const { colors } = useTheme();
  return (
    <Block p="25px" w="100%" style={{ borderBottom: `1px solid ${colors.alterHelp}` }}>
      <Grid colTemplate="repeat(3,1fr)" colGap="10px" rowTemplate="none" rowGap="0">
        <Row align="center">
          <GraySkeletonCircle w="32px" h="32px" m="0 12px 0 0" />
          <GraySkeletonContent h="20px" />
        </Row>
        <GraySkeletonContent h="20px" />
        <Row justify="center" align="center">
          <GraySkeletonContent h="20px" />
        </Row>
      </Grid>
    </Block>
  );
};
