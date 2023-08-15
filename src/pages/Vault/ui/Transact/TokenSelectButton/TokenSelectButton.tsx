import { memo, useCallback } from 'react';
import { useTheme } from 'styled-components';

import { icons } from '../../../../../shared/Icons';
import { H1 } from '../../../../../shared/ui/Typography';
import { Card, Row } from '../../../../../shared/ui/Containers';

import { useAppDispatch, useAppSelector } from '../../../../../store';
import {
  selectTransactNumTokens,
  selectTransactSelectedTokens,
} from '../../../../../features/data/selectors/transact';
import { transactActions } from '../../../../../features/data/reducers/wallet/transact';
import { TransactStep } from '../../../../../features/data/reducers/wallet/transact-types';
import { TokensImage } from '../../../../../components/TokenImage/TokenImage';

export const TokenSelectButton = memo(() => {
  const selectedTokens = useAppSelector(selectTransactSelectedTokens);
  const numTokenOptions = useAppSelector(selectTransactNumTokens);
  const dispatch = useAppDispatch();
  const { colors } = useTheme();

  const multipleOptions = numTokenOptions > 1;

  const handleClick = useCallback(() => {
    dispatch(transactActions.switchStep(TransactStep.TokenSelect));
  }, [dispatch]);

  return (
    <Row align="center">
      <TokensImage size={30} tokens={selectedTokens} />
      <H1 m="0 12px 0 6px" dotted>
        {selectedTokens[0].symbol}
      </H1>
      {multipleOptions ? (
        <Card onClick={handleClick} w="26px" h="26px" bg={colors.alterHelp} pointer>
          <Row w="100%" h="100%" justify="center" align="center">
            {icons.arrow}
          </Row>
        </Card>
      ) : null}
    </Row>
  );
});
