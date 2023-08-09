import { memo, useMemo } from 'react';
import { useTheme } from 'styled-components';

import { PRE_STAKE, QUESTIONS } from '../../../../new-features/Tags/lib/const';
import { selectVaultInfo } from '../../../../new-features/Tags/selectors/selectVoteInfo';
import { formattedTotalApy } from '../../../../helpers/format';
import { Main } from '../../../../shared/ui/Typography';

import { useAppSelector } from '../../../../store';

interface DailyProps {
  vaultId: string;
}

export const Daily = memo<DailyProps>(({ vaultId }) => {
  const { isLoaded, haveValues, values, isBoosted, isPrestake, shouldShowInterest } =
    useAppSelector(state => selectVaultInfo(state, vaultId));

  const formatted = formattedTotalApy(values, QUESTIONS);

  const value = useMemo<string>(
    () =>
      !haveValues
        ? QUESTIONS
        : isPrestake
        ? PRE_STAKE
        : isBoosted
        ? formatted.boostedTotalDaily
        : formatted.totalDaily,
    [haveValues, formatted, isBoosted, isPrestake]
  );

  const {
    colors: { subAccentSecondary },
  } = useTheme();
  return (
    <>
      <Main color={subAccentSecondary}>{!isLoaded ? '...' : shouldShowInterest ? value : '-'}</Main>
    </>
  );
});
