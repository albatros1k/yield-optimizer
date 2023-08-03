type FontType =
  | 'title'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'nav'
  | 'main'
  | 'dataTitle'
  | 'button'
  | 'subtitle'
  | 'input'
  | 'caption'
  | 'tag';

type Devices = 'DESKTOP' | 'TABLET' | 'MOBILE';

type Fonts = 'Manrope' | 'Space Grotesk' | 'PT Sans';

export enum ThemeEnum {
  MAIN = 'main',
}

interface DeviceSize {
  sidebar: {
    width: number;
  };
  sidebar_cut: {
    width: number;
  };
  header: {
    height: number;
  };
  footer: {
    height: number;
  };
}

interface FontProperties {
  size: number;
  fontWeight: number;
  fontFamily: Fonts;
}

interface IShared {
  fonts: Record<FontType, FontProperties>;
  sizes: Record<Devices, DeviceSize>;
  zIndexes: Record<Parts, number>;
}

interface ColorsProperties {
  bgGradient: string;
  bgColor: string;
  alterHelp: string;
  alterText: string;
  alterBg: string;
  textColor: string;
  accentMain: string;
  accentSecondary: string;
  subAccentMain: string;
  subAccentSecondary: string;
  red: string;
  additionalBg: string;
}

export interface ITheme extends IShared {
  type: `${ThemeEnum}`;
  colors: ColorsProperties;
}

const fonts: Record<FontType, FontProperties> = {
  title: { size: 32, fontWeight: 700, fontFamily: 'Manrope' },
  h1: { size: 24, fontWeight: 700, fontFamily: 'Space Grotesk' },
  h2: { size: 20, fontWeight: 700, fontFamily: 'Space Grotesk' },
  h3: { size: 18, fontWeight: 700, fontFamily: 'Space Grotesk' },
  h4: { size: 14, fontWeight: 700, fontFamily: 'Space Grotesk' },
  nav: { size: 16, fontWeight: 400, fontFamily: 'PT Sans' },
  main: { size: 14, fontWeight: 500, fontFamily: 'Space Grotesk' },
  dataTitle: { size: 12, fontWeight: 700, fontFamily: 'PT Sans' },
  button: { size: 12, fontWeight: 700, fontFamily: 'Space Grotesk' },
  subtitle: { size: 12, fontWeight: 400, fontFamily: 'PT Sans' },
  input: { size: 12, fontWeight: 400, fontFamily: 'PT Sans' },
  caption: { size: 10, fontWeight: 400, fontFamily: 'PT Sans' },
  tag: { size: 8, fontWeight: 700, fontFamily: 'PT Sans' },
};

type Parts = 'content' | 'menu' | 'layout' | 'selectors';

const zIndexes: Record<Parts, number> = {
  content: 1,
  menu: 1001,
  layout: 1000,
  selectors: 50,
};

const sizes: Record<Devices, DeviceSize> = {
  DESKTOP: {
    sidebar: { width: 220 },
    sidebar_cut: { width: 60 },
    header: { height: 120 },
    footer: { height: 85 },
  },
  TABLET: {
    sidebar: { width: 220 },
    sidebar_cut: { width: 60 },
    header: { height: 80 },
    footer: { height: 85 },
  },
  MOBILE: {
    sidebar: { width: 220 },
    sidebar_cut: { width: 60 },
    header: { height: 50 },
    footer: { height: 85 },
  },
};

export const shared: IShared = {
  fonts,
  sizes,
  zIndexes,
};

export const mainTheme: ITheme = {
  type: ThemeEnum.MAIN,
  colors: {
    bgGradient: 'linear-gradient(351deg, #1C1D2F 0%, #272840 100%)',
    bgColor: '#1C1D2F',
    alterHelp: '#3C3F59',
    alterText: '#80829E',
    alterBg: '#00000033',
    textColor: '#FFFFFF',
    accentMain: 'linear-gradient(47deg, #F76716 0%, #F75316 100%)',
    accentSecondary: 'linear-gradient(215deg, #34D399 0%, #10B981 100%)',
    subAccentMain: '#625DF6',
    subAccentSecondary: '#34E8A6',
    red: '#E83454',
    additionalBg: '#161726',
  },
  ...shared,
};

export const LOCAL_STORAGE_THEME_KEY = 'theme';
