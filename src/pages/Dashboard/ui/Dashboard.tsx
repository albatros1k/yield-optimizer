import { Fragment, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../store';
import { Spacer } from '../../../shared/ui/Spacer';

import { getMerlinReducer } from '../../../features/data/actions/merlin';
import { selectMerlinInfo } from '../../../features/data/selectors/merlin';
import { selectWalletAddress } from '../../../features/data/selectors/wallet';

import { MainInfo } from './MainInfo';
import { Skeleton } from './Skeleton';
import { Assets } from './Assets';
import { PastedWallet } from './Widgets/PastedWallet';

const Dashboard = () => {
  const walletAddress = useAppSelector(selectWalletAddress);
  const { isInitialLoaded, isLoading } = useAppSelector(selectMerlinInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isInitialLoaded) dispatch(getMerlinReducer(walletAddress));
  }, [walletAddress, dispatch, isInitialLoaded]);

  return (
    <Fragment>
      <PastedWallet />
      <Spacer />
      <MainInfo />
      <Spacer space={42} />
      {!isInitialLoaded || isLoading ? (
        <Skeleton />
      ) : (
        <Fragment>
          <Assets />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Dashboard;
