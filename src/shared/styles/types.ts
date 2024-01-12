type AlignType =
  | 'space-between'
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'stretch'
  | 'space-around';

type PositionType = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';

type TextDirection = 'left' | 'center' | 'right';

type WrapType = 'wrap' | 'nowrap';

export type SizeType = string | number;

export interface IFlex {
  align?: AlignType;
  justify?: AlignType;
  flexWrap?: WrapType;
}

export interface IBlock {
  w?: SizeType;
  h?: SizeType;
  p?: SizeType;
  m?: SizeType;
  overflowHidden?: boolean;
  auto?: boolean;
  pos?: PositionType;
  minH?: string;
  minW?: string;
  pointer?: boolean;
  maxW?: string;
  bg?: string;
  ta?: TextDirection;
  dotted?: boolean;
  children?: React.ReactNode;
  opacity?: number;
  isHoverAble?: boolean;
  br?: number;
  us?: 'auto' | 'none';
}

export interface IGrid {
  colGap: string;
  rowGap: string;
  colTemplate?: string;
  rowTemplate: string;
  align?: AlignType;
}

export interface IGridItem {
  colStart: number;
  colEnd: number;
}
