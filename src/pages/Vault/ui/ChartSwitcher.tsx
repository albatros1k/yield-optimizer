import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ChartStat } from '../../../features/data/reducers/historical-types';
import { TripleSwitcher } from '../../Discover/ui/ToggleSwitcher';

interface ChartSwitcherProps {
  availableStats: ChartStat[];
  stat: ChartStat;
  onChange: (newStat: ChartStat) => void;
}

export const ChartSwitcher = memo<ChartSwitcherProps>(({ availableStats, stat, onChange }) => {
  const { t } = useTranslation();

  const options: Record<string, string> = useMemo(() => {
    return Object.fromEntries(availableStats.map(stat => [stat, t(`Graph-${stat}`)]));
  }, [availableStats, t]);

  return <TripleSwitcher value={stat} options={options} onChange={onChange} />;
});
