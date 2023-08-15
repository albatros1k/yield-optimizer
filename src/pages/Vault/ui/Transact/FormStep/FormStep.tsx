import { memo, Fragment, ComponentType, useCallback, useMemo, useEffect } from 'react';

import { TabSwitcher } from '../../../../../shared/ui/Switcher';
import { Spacer } from '../../../../../shared/ui/Spacer';

import { TransactMode } from '../../../../../features/data/reducers/wallet/transact-types';
import {
  selectTransactMode,
  selectTransactVaultId,
} from '../../../../../features/data/selectors/transact';
import { transactActions } from '../../../../../features/data/reducers/wallet/transact';
import { transactFetchOptions } from '../../../../../features/data/actions/transact';

import { useAppDispatch, useAppSelector } from '../../../../../store';

import { DepositFormLoader } from '../DepositForm';
import { WithdrawFormLoader } from '../WithdrawForm';

const modeToComponent: Record<TransactMode, ComponentType> = {
  [TransactMode.Deposit]: DepositFormLoader,
  [TransactMode.Withdraw]: WithdrawFormLoader,
};

export const FormStep = memo(() => {
  const mode = useAppSelector(selectTransactMode);
  const vaultId = useAppSelector(selectTransactVaultId);

  const dispatch = useAppDispatch();

  const Component = modeToComponent[mode];

  const handleModeChange = useCallback(
    (mode: string) => {
      dispatch(transactActions.switchMode(TransactMode[mode]));
    },
    [dispatch]
  );

  const modeOptions = useMemo(
    () => [
      { value: TransactMode[TransactMode.Deposit], label: 'Supply' },
      { value: TransactMode[TransactMode.Withdraw], label: 'Withdraw' },
    ],
    []
  );

  useEffect(() => {
    // only dispatches if vaultId or mode changes
    dispatch(transactFetchOptions({ vaultId, mode }));
  }, [dispatch, mode, vaultId]);

  return (
    <Fragment>
      <TabSwitcher
        selected={TransactMode[mode]}
        options={modeOptions}
        onChange={handleModeChange}
      />
      <Spacer />
      <Component />
    </Fragment>
  );
});
