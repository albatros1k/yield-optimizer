import { useMemo } from 'react';
import { useTheme } from 'styled-components';

import type { WidgetConfig } from '@lifi/widget';
import { LiFiWidget, HiddenUI } from '@lifi/widget';

export const INTEGRATOR_ID = 'Valk';

export const WidgetPage = () => {
  const { colors } = useTheme();

  const widgetConfig: Partial<WidgetConfig> = useMemo(
    () => ({
      integrator: INTEGRATOR_ID,
      variant: 'default',
      appearance: 'dark',
      slippage: 0.05,
      // Set fee parameter to 3%
      fee: 0.03,
      hiddenUI: [HiddenUI.PoweredBy, HiddenUI.Appearance],
      containerStyle: {
        border: `1px solid ${colors.alterHelp}`,
        borderRadius: '16px',
      },
      theme: {
        palette: {
          primary: { main: colors.subAccentMain },
          secondary: { main: colors.subAccentSecondary },
          background: {
            default: colors.bgColor,
            paper: colors.additionalBg,
          },
        },
        shape: {
          borderRadius: 16,
          borderRadiusSecondary: 16,
        },
        typography: {
          fontFamily: 'Manrope',
        },
      },
    }),
    [colors]
  );

  return <LiFiWidget integrator={INTEGRATOR_ID} config={widgetConfig} />;
};
