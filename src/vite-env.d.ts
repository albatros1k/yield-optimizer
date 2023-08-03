/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
/// <reference types="react-scripts" />

import { ITheme } from './shared/styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends ITheme {}
}
