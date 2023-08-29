import { ChangeEvent, Fragment, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../store';
import { Spacer } from '../../../shared/ui/Spacer';
import { Row } from '../../../shared/ui/Containers';
import { MainInput } from '../../../shared/ui/Inputs';
import { Button } from '../../../shared/ui/Buttons';

import { getMerlinReducer } from '../../../features/data/actions/merlin';
import { selectMerlinInfo } from '../../../features/data/selectors/merlin';
import { selectWalletAddress } from '../../../features/data/selectors/wallet';

import { MainInfo } from './MainInfo';
import { Skeleton } from './Skeleton';
import { Assets } from './Assets';

const Dashboard = () => {
  const walletAddress = useAppSelector(selectWalletAddress);
  const { isInitialLoaded, isLoading } = useAppSelector(selectMerlinInfo);
  const dispatch = useAppDispatch();
  const [pasted, setPasted] = useState<string>('');

  const onChangePastedWallet = (e: ChangeEvent<HTMLInputElement>) => {
    setPasted(e.target.value);
  };

  const goToWallet = () => dispatch(getMerlinReducer(pasted));

  useEffect(() => {
    if (!isInitialLoaded) dispatch(getMerlinReducer(walletAddress));
  }, [walletAddress, dispatch, isInitialLoaded]);

  return (
    <Fragment>
      <Row>
        <MainInput
          w="300px"
          h="26px"
          type="text"
          onChange={onChangePastedWallet}
          value={pasted}
          placeholder="Paste wallet address"
          autoFocus
          style={{ border: '1px solid #fff', borderRadius: 6 }}
        />
        <Button h="26px" w="100px" m="0 0 0 10px" onClick={goToWallet}>
          Start
        </Button>
      </Row>
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
