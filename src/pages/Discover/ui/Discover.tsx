import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Spacer } from '../../../shared/ui/Spacer';
import { Grid } from '../../../shared/ui/Containers';

import { DeFiJourney } from './DefiJourney';
import { BestVaults } from './BestVaults';
import { AcademyMissions } from './NftBoost';
import { TermsAndConditionsModal } from './TermsAndConditionsModal';

import { useAppDispatch, useAppSelector } from '../../../store';

import { selectVaultTerms } from '../../../features/data/selectors/agreement';
import { agreementSliceActions } from '../../../features/data/reducers/agreement';
import { selectWalletAddressIfKnown } from '../../../features/data/selectors/wallet';

const Discover = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const termsAccepted = useAppSelector(selectVaultTerms);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const walletAddress = useAppSelector(selectWalletAddressIfKnown);

  const handleAcceptTerms = () => {
    localStorage.setItem('termsAccepted', 'true');
    dispatch(agreementSliceActions.setVaultTermsAccepted(true));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate('/my_portfolio');
  };

  useEffect(() => {
    if (termsAccepted) {
      setIsModalOpen(false);
    }
  }, [termsAccepted]);

  return (
    <Fragment>
      <TermsAndConditionsModal
        isOpen={isModalOpen}
        onAccept={handleAcceptTerms}
        onClose={handleCloseModal}
      />
      {termsAccepted && (
        <>
          <Grid
            w="100%"
            colTemplate={walletAddress ? '1fr 0.7fr' : '1fr'}
            colGap="22px"
            rowTemplate="none"
            rowGap="0"
          >
            <DeFiJourney />
            {walletAddress ? <AcademyMissions /> : null}
          </Grid>
          <Spacer space={52} />
          <BestVaults />
          <Spacer space={52} />
        </>
      )}
    </Fragment>
  );
};

export default Discover;
