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
import { TransactStatus } from '../../../../../features/data/reducers/wallet/transact-types';
import {
  TransactOption,
  TransactQuote,
} from '../../../../../features/data/apis/transact/transact-types';
import { transactSteps } from '../../../../../features/data/actions/transact';

import { Button } from '../../../../../shared/ui/Buttons';

import { ActionConnect, ActionSwitch } from '../../CommonActions';

export const WithdrawActions = memo(() => {
  return <WithdrawActionsStandard />;
});

export const WithdrawActionsStandard = memo(function WithdrawActionsStandard() {
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
    return <ActionWithdrawDisabled />;
  }

  return <ActionWithdraw quote={quote} option={option} />;
});

const ActionWithdrawDisabled = memo(() => {
  return (
    <Button w="100%" h="50px" disabled={true}>
      Withdraw
    </Button>
  );
});

type ActionWithdrawProps = {
  option: TransactOption;
  quote: TransactQuote;
};

const ActionWithdraw = memo<ActionWithdrawProps>(({ quote }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleClick = useCallback(() => {
    dispatch(transactSteps(quote, t));
  }, [dispatch, quote, t]);

  return (
    <>
      <Button w="100%" h="50px" onClick={handleClick}>
        Withdraw
      </Button>
    </>
  );
});
