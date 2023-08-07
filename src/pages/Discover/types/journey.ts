import { CSSProperties } from 'react';

export type Coords = Pick<CSSProperties, 'top' | 'right'>;

export interface JourneyCardInfo {
  title: string;
  value: string;
  cords: Coords;
}
