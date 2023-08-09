import { memo, useMemo } from 'react';
import { useTheme } from 'styled-components';

import { useAppSelector } from '../../../../store';
import { selectVaultInfo } from '../../../../new-features/Tags/selectors/selectVoteInfo';
import { PRE_STAKE, QUESTIONS } from '../../../../new-features/Tags/lib/const';
import { formattedTotalApy } from '../../../../helpers/format';
import { Main } from '../../../../shared/ui/Typography';

interface TvlProps {
  vaultId: string;
}

export const Apy = memo<TvlProps>(({ vaultId }) => {
  const { isLoaded, haveValues, values, isBoosted, isPrestake } = useAppSelector(state =>
    selectVaultInfo(state, vaultId)
  );
  const {
    colors: { subAccentSecondary },
  } = useTheme();

  const formatted = formattedTotalApy(values, QUESTIONS);

  const value = useMemo<string>(
    () =>
      !haveValues
        ? QUESTIONS
        : isPrestake
        ? PRE_STAKE
        : isBoosted
        ? formatted.boostedTotalApy
        : formatted.totalApy,
    [haveValues, formatted, isBoosted, isPrestake]
  );
  return (
    <>
      <Main color={subAccentSecondary}>{!isLoaded ? '...' : value}</Main>
    </>
  );
});
