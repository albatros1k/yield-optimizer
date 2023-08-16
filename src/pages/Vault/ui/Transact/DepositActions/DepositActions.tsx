import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../../../../store';
import {
  selectTransactOptionById,
  selectTransactQuoteStatus,
  selectTransactSelectedQuote,
} from '../../../../../features/data/selectors/transact';
import {
  selectCurrentChainId,
  selectIsWalletConnected,
} from '../../../../../features/data/selectors/wallet';
import {
  TransactOption,
  TransactQuote,
} from '../../../../../features/data/apis/transact/transact-types';
import { TransactStatus } from '../../../../../features/data/reducers/wallet/transact-types';
import { transactSteps } from '../../../../../features/data/actions/transact';

import { ActionConnect, ActionSwitch } from '../../CommonActions';
import { Button } from '../../../../../shared/ui/Buttons';

export const DepositActions = memo(() => {
  const quoteStatus = useAppSelector(selectTransactQuoteStatus);
  const quote = useAppSelector(selectTransactSelectedQuote);
  const option = useAppSelector(state =>
    quote ? selectTransactOptionById(state, quote.optionId) : null
  );
  const isWalletConnected = useAppSelector(selectIsWalletConnected);
  const connectedChainId = useAppSelector(selectCurrentChainId);

  if (!isWalletConnected) {
    return <ActionConnect />;
  }

  if (option && option.chainId !== connectedChainId) {
    return <ActionSwitch chainId={option.chainId} />;
  }

  if (!option || !quote || quoteStatus !== TransactStatus.Fulfilled) {
    return <ActionDepositDisabled />;
  }

  return <ActionDeposit quote={quote} option={option} />;
});

const ActionDepositDisabled = memo(() => {
  return (
    <Button w="100%" h="50px" disabled={true}>
      Supply
    </Button>
  );
});

type ActionDepositProps = {
  option: TransactOption;
  quote: TransactQuote;
};

const ActionDeposit = memo<ActionDepositProps>(({ quote }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleClick = useCallback(() => {
    dispatch(transactSteps(quote, t));
  }, [dispatch, quote, t]);

  return (
    <Button w="100%" h="50px" onClick={handleClick}>
      Supply
    </Button>
  );
});
