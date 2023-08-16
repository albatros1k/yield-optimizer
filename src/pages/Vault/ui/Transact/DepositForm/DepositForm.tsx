import { memo, Fragment } from 'react';

import { useAppSelector } from '../../../../../store';
import {
  selectTransactOptionsError,
  selectTransactOptionsStatus,
  selectTransactVaultId,
} from '../../../../../features/data/selectors/transact';
import { TransactStatus } from '../../../../../features/data/reducers/wallet/transact-types';
import { selectVaultById } from '../../../../../features/data/selectors/vaults';

import { SmallLoader } from '../../../../../shared/ui/Loaders';
import { Grid, Row } from '../../../../../shared/ui/Containers';
import { Spacer } from '../../../../../shared/ui/Spacer';

import { errorToString } from '../../../../../helpers/format';

import { TokenSelectButton } from '../TokenSelectButton';
import { DepositTokenAmountInput } from '../DepositTokenAmountInput';
import { DepositHeading } from './DepositHeading';
import { VaultFees } from '../VaultFees';

import { ActionTable } from './styled';
import { DepositActions } from '../DepositActions';

export const DepositForm = memo(() => {
  return (
    <Fragment>
      <ActionTable>
        <DepositHeading />
        <Grid w="100%" colTemplate="repeat(2,1fr)" colGap="10px" rowGap="0" rowTemplate="none">
          <DepositTokenAmountInput />
          <TokenSelectButton />
        </Grid>
      </ActionTable>
      <Spacer space={16} />
      <VaultFees />
      <Spacer space={36} />
      <DepositActions />
    </Fragment>
  );
});

export const DepositFormLoader = memo(() => {
  const status = useAppSelector(selectTransactOptionsStatus);
  const error = useAppSelector(selectTransactOptionsError);
  const isLoading = status === TransactStatus.Idle || status === TransactStatus.Pending;
  const isError = status === TransactStatus.Rejected;
  const vaultId = useAppSelector(selectTransactVaultId);
  const vault = useAppSelector(state => selectVaultById(state, vaultId));
  return (
    <Fragment>
      {vault.status !== 'active' ? (
        <>Retire Pause Reason</>
      ) : isLoading ? (
        <Row w="100%" align="center" justify="center">
          <SmallLoader size={40} />
        </Row>
      ) : isError ? (
        <>{errorToString(error)}</>
      ) : (
        <DepositForm />
      )}
    </Fragment>
  );
});
