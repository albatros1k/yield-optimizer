import { memo, Fragment } from 'react';

import { useAppSelector } from '../../../../../store';

import { selectTransactMode } from '../../../../../features/data/selectors/transact';
import { TransactMode } from '../../../../../features/data/reducers/wallet/transact-types';

import { DepositTokenList } from '../DepositTokenList';
import { WithdrawTokenList } from '../WithdrawTokenList';

interface TokenSelectStepProps {}

export const TokenSelectStep = memo<TokenSelectStepProps>(() => {
  const mode = useAppSelector(selectTransactMode);

  return (
    <Fragment>
      {mode === TransactMode.Deposit ? <DepositTokenList /> : <WithdrawTokenList />}
    </Fragment>
  );
});
