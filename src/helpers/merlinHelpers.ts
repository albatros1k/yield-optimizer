/* eslint-disable prefer-const */
import { SyntheticEvent } from 'react';
import { capitalize } from 'lodash-es';

import altIcon from '../images/nav-icons/no-icon.svg';

const ALPHABET: string = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

export function decode(string: string) {
  const ALPHABET_MAP: Record<string, number> = {};

  for (let i = 0; i < ALPHABET.length; ++i) {
    ALPHABET_MAP[ALPHABET.charAt(i)] = i;
  }

  const BASE: number = ALPHABET.length;

  if (string.length === 0) return [];

  let i,
    j,
    bytes = [0];

  for (i = 0; i < string.length; ++i) {
    let c: string = string[i];
    if (!(c in ALPHABET_MAP)) throw new Error('Non-base58 character');

    for (j = 0; j < bytes.length; ++j) bytes[j] *= BASE;
    bytes[0] += ALPHABET_MAP[c];

    let carry = 0;
    for (j = 0; j < bytes.length; ++j) {
      bytes[j] += carry;
      carry = bytes[j] >> 8;
      bytes[j] &= 0xff;
    }

    while (carry) {
      bytes.push(carry & 0xff);
      carry >>= 8;
    }
  }

  for (i = 0; string[i] === '1' && i < string.length - 1; ++i) {
    bytes.push(0);
  }

  return bytes.reverse();
}

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

export const calcRound = (num: number, commas: boolean = false) => {
  if (!num || typeof num !== 'number') return 0;
  let fixed: string = String(num);
  const number: string = num.toFixed(5);

  const [start, rest] = `${number}`.split('.');
  const all = rest.split('').every(n => n === '0');
  const isExponential = new RegExp('e', 'i').test(rest);

  const firstPositive = rest[0] !== '0' || rest[1] !== '0' || `${Math.abs(+start)}`.length > 1;
  const twoPositive =
    rest
      .split('')
      .slice(0, 2)
      .every(n => n === '0') && rest[2] !== '0';

  if (Number.isInteger(num)) return commas ? numberWithCommas(num) : num;
  else if (isExponential) return 0;
  else if (all) fixed = num.toFixed();
  else if (firstPositive) fixed = num.toFixed(2);
  else if (twoPositive) fixed = num.toFixed(3);
  else fixed = number;

  return commas && Number(fixed) > 100 ? numberWithCommas(+fixed) : fixed;
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

export function validateEthereumAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function validateCosmosAddress(address: string): boolean {
  const regex: RegExp = /^(osmo|cosmos|cro|kava|canto|terra|cre|juno|inj|terra|kujira).[A-Za-z0-9]/;

  return regex.test(address.toLowerCase()) && address.length > 42;
}

export function validateEnsName(name: string): boolean {
  // eslint-disable-next-line
  return /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi.test(
    name
  );
}

export function validateSuiAddress(address: string): boolean {
  const regex = /^0x[a-fA-F0-9]{64}/;
  return regex.test(address.toLowerCase());
}

interface ICurrency {
  name: string;
  symbol: string;
  maxLength: number;
  minLength: number;
}

export function validateSolanaAddress(address: string): boolean {
  const currency: ICurrency = {
    name: 'Solana',
    symbol: 'sol',
    maxLength: 44,
    minLength: 43,
  };

  try {
    if (!address || address.length === 0) {
      return false;
    }

    if (currency.minLength && address.length < currency.minLength) {
      return false;
    }

    if (currency.maxLength && address.length > currency.maxLength) {
      return false;
    }
    try {
      const decoded = decode(address);
      if (!decoded || !decoded.length) {
        return false;
      }
    } catch (e) {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
}

export function validateWalletAddress(address: string): boolean {
  const checkers = [
    validateEthereumAddress,
    validateSolanaAddress,
    validateCosmosAddress,
    validateSolanaAddress,
    validateSuiAddress,
  ];
  return checkers.some(func => func(address));
}
