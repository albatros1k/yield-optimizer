import { FC, memo, useMemo } from 'react';
import { useTheme } from 'styled-components';

import { Card, Row } from '../../../shared/ui/Containers';
import { DataTitle, SubTitle } from '../../../shared/ui/Typography';

import { formattedTotalApy } from '../../../helpers/format';
import { useAppSelector } from '../../../store';
import { selectVaultInfo } from '../selectors/selectVoteInfo';
import { TagProps } from '../types/tag';
import { PRE_STAKE, QUESTIONS } from '../lib/const';

export const DailyTag: FC<TagProps> = memo(({ vaultId }) => {
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
    colors: { textColor, alterText, subAccentSecondary },
  } = useTheme();

  return (
    <Card opacity={0.9} bg={textColor} w="fit-content" p="8px 10px">
      <Row>
        <SubTitle color={alterText} m="0 6px 0 0">
          Daily:
        </SubTitle>
        <DataTitle color={subAccentSecondary}>
          {!isLoaded ? '...' : shouldShowInterest ? value : '-'}
        </DataTitle>
      </Row>
    </Card>
  );
});
