import { FC } from 'react';
import { useTheme } from 'styled-components';

import { IconContainer, LinkContainer } from './styled';
import { Nav } from '../../../shared/ui/Typography';
import { TabInfo } from '../types';
import { Tabs } from '../lib/tabs';

export const Link: FC<TabInfo & { margin: string }> = ({ icon, name, to, margin }) => {
  const {
    colors: { alterText },
  } = useTheme();

  return (
    <LinkContainer align="center" to={to} m={margin} ishouse={Number(Tabs.MY_PORTFOLIO === name)}>
      <IconContainer w="26px" h="26px" m="0 16px 0 0">
        {icon}
      </IconContainer>
      <Nav color={alterText}>{name}</Nav>
    </LinkContainer>
  );
};
