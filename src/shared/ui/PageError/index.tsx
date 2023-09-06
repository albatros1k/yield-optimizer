import { FC } from 'react';

import { Column } from '../Containers';
import { H4, SubTitle } from '../Typography';
import { Button } from '../Buttons';
import { Image } from '../Images';

import logoSad from '../../../images/404.png';

interface PageErrorProps {
  errorMessage?: string;
  onResetError: () => void;
}

export const PageError: FC<PageErrorProps> = ({ errorMessage, onResetError }) => {
  return (
    <Column m="0 auto 40px" p="70px 0" w="440px" align="center">
      <Image src={logoSad} alt="logo" w="100%" m="0 0 40px" />
      <H4 m="0 0 16px" ta="center">
        Oops... Something went wrong
      </H4>
      <SubTitle ta="center" w="310px" m="0 0 34px">
        {errorMessage ||
          `Some error happened on blockchain side or something wrong with provided wallet, please try
        later or use other wallet`}
      </SubTitle>
      <Button bg="transparent" h="48px" onClick={onResetError} w="100%">
        Try Again
      </Button>
    </Column>
  );
};
