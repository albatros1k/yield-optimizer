/* eslint-disable @typescript-eslint/no-unused-vars */
import { memo, useEffect } from 'react';
import type { ComponentType } from 'react';

import { Card } from '../../../../shared/ui/Containers';

import { VaultEntity } from '../../../../features/data/entities/vault';
import { transactInit } from '../../../../features/data/actions/transact';
import { TransactStep } from '../../../../features/data/reducers/wallet/transact-types';
import {
  selectTransactStep,
  selectTransactVaultId,
} from '../../../../features/data/selectors/transact';

import { useAppDispatch, useAppSelector } from '../../../../store';

import { FormStep } from './FormStep';
import { LoadingStep } from './LoadingStep';
import { TokenSelectStep } from './TokenSelectStep';
import { QuoteSelectStep } from './QuoteSelectStep';

const stepToComponent: Record<TransactStep, ComponentType> = {
  [TransactStep.Loading]: LoadingStep,
  [TransactStep.Form]: FormStep,
  [TransactStep.TokenSelect]: TokenSelectStep,
  [TransactStep.QuoteSelect]: QuoteSelectStep,
};

interface TransactProps {
  vaultId: VaultEntity['id'];
}

export const Transact = memo<TransactProps>(({ vaultId }) => {
  const transactStep = useAppSelector(selectTransactStep);
  const transactVaultId = useAppSelector(selectTransactVaultId);
  const step = transactVaultId === vaultId ? transactStep : TransactStep.Loading;
  const StepComponent = stepToComponent[step];
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(transactInit({ vaultId }));
  }, [dispatch, vaultId]);

  return (
    <Card p="25px" w="100%" h="100%">
      <StepComponent key={step} />
    </Card>
  );
});
