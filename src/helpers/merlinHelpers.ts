import { SyntheticEvent } from 'react';
import { capitalize } from 'lodash-es';

import altIcon from '../images/nav-icons/no-icon.svg';

export const parseProtocolName = <T extends string>(protocol: T): T => {
  const parts = protocol.split('__');
  if (parts.length > 0) {
    return parts[0] as T;
  }
  throw new Error('Invalid protocol format');
};

export const removeSpecialSymbol = <T extends string>(str: T): T =>
  str.replace(/[^a-zA-Z0-9. ]/g, '') as T;

export function numberWithCommas(x: number): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const parseProtocol = <T extends string>(str: T): string => {
  const id: string[] = str.split('_').filter(word => word);
  return id.map(word => capitalize(word)).join(' ');
};

export function definePlus(
  value: number,
  hasPlus: boolean = true,
  afterCommaAmount: number = 0,
  option: 'usd' | 'percent' = 'usd'
): string | number {
  const fixedNumber =
    Number(value?.toFixed(afterCommaAmount)) === 0 && value !== 0
      ? Number(value?.toFixed(2))
      : Number(value?.toFixed(afterCommaAmount));
  const isUSD: boolean = option === 'usd';

  if (fixedNumber === 0 || isNaN(fixedNumber)) return '—';
  if (hasPlus) {
    return fixedNumber > 0
      ? `+${isUSD ? '$' : ''}${numberWithCommas(fixedNumber)}${isUSD ? '' : '%'}`
      : value < 0
      ? `-${isUSD ? '$' : ''}${numberWithCommas(fixedNumber * -1)}${isUSD ? '' : '%'}`
      : 0;
  } else {
    return `${isUSD ? '$' : ''}${numberWithCommas(fixedNumber)}${isUSD ? '' : '%'}`;
  }
}

export const onImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = altIcon;
};
