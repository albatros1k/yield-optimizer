import { memo, Fragment } from 'react';

interface WithdrawFormProps {}

export const WithdrawForm = memo<WithdrawFormProps>(() => {
  return <Fragment>WithdrawForm</Fragment>;
});

export const WithdrawFormLoader = memo(() => {
  return <>Withdraw Form Loader</>;
});
