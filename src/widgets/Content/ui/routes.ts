/* eslint-disable no-useless-escape */
import { pathToRegexp } from 'path-to-regexp';
import type { RouteProps } from 'react-router-dom';

export const routes: Array<Pick<RouteProps, 'path'> & { name: string }> = [
  { path: '/', name: 'Discover' },
  { path: '/:network/vault/:id', name: 'Vault' },
  { path: '/vault/:id', name: 'Vault' },
  { path: '/my_portfolio', name: 'Dashboard' },
  { path: '/rewards', name: 'Rewards' },
  { path: '/debts', name: 'Debts' },
  { path: '/swap*', name: 'Swap' },
  { path: '/market', name: 'Market' },
  { path: '/market/pool/:pair', name: 'Market Pool' },
  { path: '/market/pool/:pair/:poolId', name: 'Market Pool' },
  { path: '/supported_protocols', name: 'Supported Protocols' },
  { path: '/leaderboard', name: 'Leader Board' },
];

export const getRouteName = (pathname: string): string | null => {
  const matchingRoute = routes.find(route => {
    let regex: RegExp;
    if (route.path === '/swap*') {
      regex = /^\/swap(?:\/([^\/#\?]+?))?(?:[\/#\?]|$)$/i;
    } else {
      regex = pathToRegexp(route.path, [], { end: true });
    }
    return regex.test(pathname);
  });

  return matchingRoute ? matchingRoute.name : null;
};
