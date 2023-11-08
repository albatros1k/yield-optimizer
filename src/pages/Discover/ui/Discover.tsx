import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Spacer } from '../../../shared/ui/Spacer';

import { DeFiJourney } from './DefiJourney';
import { BestVaults } from './BestVaults';
import { TermsAndConditionsModal } from './TermsAndConditionsModal';
import { useAppDispatch, useAppSelector } from '../../../store';
import { selectVaultTerms } from '../../../features/data/selectors/agreement';
import { agreementSliceActions } from '../../../features/data/reducers/agreement';
// import { AllVaults } from './AllVaults';

const Discover = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const termsAccepted = useAppSelector(selectVaultTerms);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
          <DeFiJourney />
          <Spacer space={52} />
          <BestVaults />
          <Spacer space={52} />
          {/* <AllVaults /> */}
        </>
      )}
    </Fragment>
  );
};

export default Discover;
