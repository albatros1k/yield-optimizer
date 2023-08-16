import { memo, Fragment } from 'react';

import { useAppSelector } from '../../../../../store';

import { Spacer } from '../../../../../shared/ui/Spacer';
import { Grid, Row } from '../../../../../shared/ui/Containers';
import { SmallLoader } from '../../../../../shared/ui/Loaders';

import {
  selectTransactOptionsError,
  selectTransactOptionsStatus,
} from '../../../../../features/data/selectors/transact';
import { TransactStatus } from '../../../../../features/data/reducers/wallet/transact-types';

import { errorToString } from '../../../../../helpers/format';
import { ActionTable } from '../DepositForm/styled';
import { WithdrawHeading } from './WithdrawHeading';
import { WithdrawTokenAmountInput } from '../WithdrawTokenAmountInput';
import { TokenSelectButton } from '../TokenSelectButton';
import { VaultFees } from '../VaultFees';
import { WithdrawActions } from '../WithdrawActions';

export const WithdrawForm = memo(() => {
  return (
    <Fragment>
      <ActionTable>
        <WithdrawHeading />
        <Grid w="100%" colTemplate="repeat(2,1fr)" colGap="10px" rowGap="0" rowTemplate="none">
          <WithdrawTokenAmountInput />
          <TokenSelectButton />
        </Grid>
      </ActionTable>
      <Spacer space={16} />
      <VaultFees />
      <Spacer space={36} />
      <WithdrawActions />
    </Fragment>
  );
});

export const WithdrawFormLoader = memo(() => {
  const status = useAppSelector(selectTransactOptionsStatus);
  const error = useAppSelector(selectTransactOptionsError);
  const isLoading = status === TransactStatus.Idle || status === TransactStatus.Pending;
  const isError = status === TransactStatus.Rejected;

  return (
    <div>
      {isLoading ? (
        <Row w="100%" align="center" justify="center">
          <SmallLoader size={40} />
        </Row>
      ) : isError ? (
        <>{errorToString(error)}</>
      ) : (
        <WithdrawForm />
      )}
    </div>
  );
});
