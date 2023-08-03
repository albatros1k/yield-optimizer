import { useMemo } from 'react';

import { Aside } from './styled';
import { tabs } from '../lib/tabs';
import { Link } from './Link';

export const Sidebar = () => {
  const links = useMemo(
    () =>
      tabs.map((tab, index, { length }) => (
        <Link key={tab.name} {...tab} margin={index < length - 1 ? '0 0 16px' : '0'} />
      )),
    []
  );

  return <Aside>{links}</Aside>;
};
