import { memo } from 'react';
import { useTheme } from 'styled-components';

import { Button } from '../../../shared/ui/Buttons';

export const MoreMissions = memo(() => {
  const { colors } = useTheme();
  return (
    <Button
      w="360px"
      h="60px"
      bg={colors.alterBg}
      borderColor={colors.alterText}
      color={colors.alterText}
    >
      More missions coming soon...
    </Button>
  );
});
