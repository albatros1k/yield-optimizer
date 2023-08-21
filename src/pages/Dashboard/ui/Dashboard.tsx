import { Fragment, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../store';
import { Spacer } from '../../../shared/ui/Spacer';

import { getMerlinReducer } from '../../../features/data/actions/merlin';
import { selectMerlinInfo } from '../../../features/data/selectors/merlin';
import { selectWalletAddress } from '../../../features/data/selectors/wallet';

import { MainInfo } from './MainInfo';
import { Skeleton } from './Skeleton';

const Dashboard = () => {
  const walletAddress = useAppSelector(selectWalletAddress);
  const { isInitialLoaded, isLoading } = useAppSelector(selectMerlinInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMerlinReducer(walletAddress));
  }, [walletAddress, dispatch]);

  return (
    <Fragment>
      <MainInfo />
      <Spacer space={42} />
      {!isInitialLoaded || isLoading ? <Skeleton /> : <Fragment></Fragment>}
    </Fragment>
  );
};

export default Dashboard;
