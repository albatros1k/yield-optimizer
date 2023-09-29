/* eslint-disable @typescript-eslint/no-unused-vars */
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ethers } from 'ethers';

import { useAppDispatch, useAppSelector } from '../../../../../store';
import {
  selectTransactInputAmount,
  selectTransactOptionById,
  selectTransactQuoteStatus,
  selectTransactSelectedQuote,
} from '../../../../../features/data/selectors/transact';
import {
  selectCurrentChainId,
  selectIsWalletConnected,
  selectWalletAddressIfKnown,
} from '../../../../../features/data/selectors/wallet';
import {
  TransactOption,
  TransactQuote,
} from '../../../../../features/data/apis/transact/transact-types';
import { TransactStatus } from '../../../../../features/data/reducers/wallet/transact-types';
import { transactSteps } from '../../../../../features/data/actions/transact';

import { ActionConnect, ActionSwitch } from '../../CommonActions';
import { Button } from '../../../../../shared/ui/Buttons';

const abi = [
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'owner', type: 'address' },
      { indexed: true, internalType: 'address', name: 'spender', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint8', name: 'version', type: 'uint8' }],
    name: 'Initialized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'address', name: 'implementation', type: 'address' }],
    name: 'NewStratCandidate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'previousOwner', type: 'address' },
      { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'address', name: 'implementation', type: 'address' }],
    name: 'UpgradeStrat',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'approvalDelay',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'available',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'balance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'balancePrecise',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'subtractedValue', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_amount', type: 'uint256' }],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  { inputs: [], name: 'depositAll', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  { inputs: [], name: 'earn', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    inputs: [],
    name: 'getPricePerFullShare',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_token', type: 'address' }],
    name: 'inCaseTokensGetStuck',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'addedValue', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'contract IStrategyV7', name: '_strategy', type: 'address' },
      { internalType: 'string', name: '_name', type: 'string' },
      { internalType: 'string', name: '_symbol', type: 'string' },
      { internalType: 'uint256', name: '_approvalDelay', type: 'uint256' },
      { internalType: 'address', name: '_migrator', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
      { internalType: 'address', name: '_owner', type: 'address' },
    ],
    name: 'migrationDeposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_shares', type: 'uint256' },
      { internalType: 'address', name: '_owner', type: 'address' },
    ],
    name: 'migrationWithdraw',
    outputs: [{ internalType: 'uint256', name: 'r', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'migrator',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_implementation', type: 'address' }],
    name: 'proposeStrat',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'stratCandidate',
    outputs: [
      { internalType: 'address', name: 'implementation', type: 'address' },
      { internalType: 'uint256', name: 'proposedTime', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'strategy',
    outputs: [{ internalType: 'contract IStrategyV7', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_migrator', type: 'address' }],
    name: 'upgradeMigrator',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'upgradeStrat',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'want',
    outputs: [{ internalType: 'contract IERC20Upgradeable', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_shares', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  { inputs: [], name: 'withdrawAll', outputs: [], stateMutability: 'nonpayable', type: 'function' },
];

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

  // if (!option || !quote || quoteStatus !== TransactStatus.Fulfilled) {
  //   return <ActionDepositDisabled />;
  // }

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
  const walletAddress = useAppSelector(selectWalletAddressIfKnown);

  const [allowed, setAllowed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const value = useAppSelector(selectTransactInputAmount);

  const handleClick = useCallback(() => {
    dispatch(transactSteps(quote, t));
  }, [dispatch, quote, t]);

  const onApprove = async () => {
    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const vaultAddress = '0x2529B0173f0A304B8c5fbbaB03dad288d5070d70';
      const vaultContract = new ethers.Contract(vaultAddress, abi, await provider.getSigner());
      const allowanceReceipt = await vaultContract.approve(walletAddress, '1000000000000');
      allowanceReceipt.wait();
      setAllowed(true);
    } catch (error) {
      setAllowed(false);
      console.log('onAllow error', error);
    } finally {
      setLoading(false);
    }
  };

  const onDeposit = async () => {
    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const vaultAddress = '0x2529B0173f0A304B8c5fbbaB03dad288d5070d70';
      const vaultContract = new ethers.Contract(vaultAddress, abi, await provider.getSigner());
      const txReceipt = await vaultContract.deposit(value.toString());
      txReceipt.wait();
    } catch (error) {
      console.log('onDeposit handler', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button w="100%" h="50px" onClick={allowed ? onDeposit : onApprove} disabled={loading}>
      {allowed ? 'Supply' : 'Approve'}
    </Button>
  );
});
