/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, memo, useMemo } from 'react';
import { useTheme } from 'styled-components';

import { Card, Row } from '../../../shared/ui/Containers';
import { DataTitle, SubTitle } from '../../../shared/ui/Typography';

import { useAppSelector } from '../../../store';
import { formattedTotalApy } from '../../../helpers/format';
import { PRE_STAKE, QUESTIONS } from '../lib/const';
import { TagProps } from '../types/tag';
import { selectVaultInfo } from '../selectors/selectVoteInfo';
import { APY } from '../../../config/apy';

export const ApyTag: FC<TagProps> = memo(({ vaultId, margin }) => {
  const { isGovVault, isLoaded, haveValues, values, isBoosted, isPrestake } = useAppSelector(
    state => selectVaultInfo(state, vaultId)
  );
  const {
    colors: { textColor, alterText, subAccentSecondary },
  } = useTheme();

  const formatted = formattedTotalApy(values, QUESTIONS);
  const label = useMemo<string>(() => (isGovVault ? 'APR' : 'APY'), [isGovVault]);
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
    <Card opacity={0.9} bg={textColor} w="fit-content" p="8px 10px" m={margin}>
      <Row align="center">
        <SubTitle color={alterText} m="0 6px 0 0">
          Est. {label}:
        </SubTitle>
        <DataTitle color={subAccentSecondary}>
          {/* {!isLoaded ? '...' : value} */}
          {APY[vaultId] ? `${APY[vaultId]}%` : '...'}
        </DataTitle>
      </Row>
    </Card>
  );
});
