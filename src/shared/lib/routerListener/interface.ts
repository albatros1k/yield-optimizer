import { ReactNode } from 'react';

export interface IRouterListener {
  children: ReactNode;
  wallet: string;
  addition?: { [key: string]: string | number | boolean | null | undefined };
}

export enum BUTTON_NAMES {
  CONNECT_YOUR_WALLET = 'CONNECT_YOUR_WALLET',
}
