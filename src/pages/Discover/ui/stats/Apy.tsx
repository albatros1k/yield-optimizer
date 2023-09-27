import { memo, useMemo } from 'react';
import { useTheme } from 'styled-components';

import { useAppSelector } from '../../../../store';
import { selectVaultInfo } from '../../../../new-features/Tags/selectors/selectVoteInfo';
import { PRE_STAKE, QUESTIONS } from '../../../../new-features/Tags/lib/const';
import { formattedTotalApy } from '../../../../helpers/format';
import { H1, Main } from '../../../../shared/ui/Typography';

interface TvlProps {
  vaultId: string;
  typography?: typeof H1;
  margin?: string;
}

export const Apy = memo<TvlProps>(({ vaultId, typography, margin }) => {
  const { isLoaded, haveValues, values, isBoosted, isPrestake } = useAppSelector(state =>
    selectVaultInfo(state, vaultId)
  );
  const {
    colors: { subAccentSecondary },
  } = useTheme();

  const formatted = formattedTotalApy(values, QUESTIONS);

  const value = useMemo<string>(
    () =>
      '9%' ||
      (!haveValues
        ? QUESTIONS
        : isPrestake
        ? PRE_STAKE
        : isBoosted
        ? formatted.boostedTotalApy
        : formatted.totalApy),
    [haveValues, formatted, isBoosted, isPrestake]
  );

  const Typography = typography || Main;

  return (
    <>
      <Typography m={margin} color={subAccentSecondary}>
        {!isLoaded ? '...' : value}
      </Typography>
    </>
  );
});
