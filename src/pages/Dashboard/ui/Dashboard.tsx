import { Fragment, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../store';
import { Spacer } from '../../../shared/ui/Spacer';
import { H1 } from '../../../shared/ui/Typography';

import { getMerlinReducer } from '../../../features/data/actions/merlin';
import { selectMerlinInfo } from '../../../features/data/selectors/merlin';
import { selectWalletAddress } from '../../../features/data/selectors/wallet';

import { MainInfo } from './MainInfo';
import { Skeleton } from './Skeleton';
import { Assets } from './Assets';
import { PastedWallet } from './Widgets/PastedWallet';

const Dashboard = () => {
  const walletAddress = useAppSelector(selectWalletAddress);
  const { isInitialLoaded, isLoading, error } = useAppSelector(selectMerlinInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isInitialLoaded) dispatch(getMerlinReducer(walletAddress));
  }, [walletAddress, dispatch, isInitialLoaded]);

  if (error) return <H1>{error}</H1>;
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
