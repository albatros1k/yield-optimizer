import { FC } from 'react';
import { useTheme } from 'styled-components';

import { Block, Grid } from '../../../shared/ui/Containers';
import { H2 } from '../../../shared/ui/Typography';

export const NoResult: FC = () => {
  const { colors } = useTheme();
  return (
    <Block bg={colors.alterBg} p="17px 25px" w="100%" style={{ borderBottom: '1px solid #3C3F59' }}>
      <Grid
        colTemplate="minmax(0, 30fr) minmax(0, 70fr)"
        rowGap="0px"
        colGap="20px"
        rowTemplate="none"
        w="100%"
      >
        <H2>No results found.</H2>
      </Grid>
    </Block>
  );
};
