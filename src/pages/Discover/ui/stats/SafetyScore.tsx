import { memo, useMemo } from 'react';
import { useAppSelector } from '../../../../store';
import { selectVaultById } from '../../../../features/data/selectors/vaults';

import { ReactComponent as Low } from '../../../../images/score/low.svg';
import { ReactComponent as Medium } from '../../../../images/score/medium.svg';
import { ReactComponent as High } from '../../../../images/score/high.svg';

interface SafetyScoreProps {
  vaultId: string;
}

export const SafetyScore = memo<SafetyScoreProps>(({ vaultId }) => {
  const vault = useAppSelector(state => selectVaultById(state, vaultId));

  const Component = useMemo(() => {
    if (vault.safetyScore > 7.5) return High;
    if (vault.safetyScore >= 6.4 && vault.safetyScore <= 7.5) return Medium;
    if (vault.safetyScore > 0 && vault.safetyScore <= 6.4) return Low;
  }, [vault.safetyScore]);

  return <Component />;
});
