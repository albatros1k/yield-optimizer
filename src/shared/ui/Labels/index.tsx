import { memo } from 'react';
import { useTheme } from 'styled-components';

import { Block } from '../Containers';
import { Input } from '../Typography';

interface LabelProps {
  value: string;
  bg?: string;
}

export const Label = memo<LabelProps>(({ value, bg }) => {
  const { colors } = useTheme();
  return (
    <Block
      p="2px 5px"
      bg={bg || colors.subAccentSecondary}
      style={{ borderRadius: 6, opacity: 0.9 }}
    >
      <Input>{value}</Input>
    </Block>
  );
});
