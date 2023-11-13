/* eslint-disable @typescript-eslint/no-unused-vars */
import { memo, useMemo } from 'react';
import { useTheme } from 'styled-components';

import { PRE_STAKE, QUESTIONS } from '../../../../new-features/Tags/lib/const';
import { selectVaultInfo } from '../../../../new-features/Tags/selectors/selectVoteInfo';
import { formattedTotalApy } from '../../../../helpers/format';
import { H1, Main } from '../../../../shared/ui/Typography';

import { useAppSelector } from '../../../../store';
import { DAILY } from '../../../../config/apy';

interface DailyProps {
  vaultId: string;
  typography?: typeof H1;
  margin?: string;
}

export const Daily = memo<DailyProps>(({ vaultId, typography, margin }) => {
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

  const Typography = typography || Main;

  return (
    <>
      <Typography m={margin} color={subAccentSecondary}>
        {/* {!isLoaded ? '...' : shouldShowInterest ? value : '-'} */}
        {DAILY[vaultId] ? `${DAILY[vaultId]}%` : '...'}
      </Typography>
    </>
  );
});
