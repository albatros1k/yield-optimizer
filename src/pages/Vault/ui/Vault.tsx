import { useParams, useNavigate } from 'react-router';
import { useCallback, useState } from 'react';

import { VaultEntity } from '../../../features/data/entities/vault';
import { selectVaultById, selectVaultExistsById } from '../../../features/data/selectors/vaults';
import { selectIsConfigAvailable } from '../../../features/data/selectors/data-loader';
import { Loader } from '../../../shared/ui/Loaders';

import { useAppSelector } from '../../../store';

import { VaultNotFound } from './VaultNotFound';
import { VaultContent } from './VaultContent';
import { PausedVault } from './Modals/PausedVault';

export type VaultUrlParams = {
  id: VaultEntity['id'];
};

const VaultDetails = () => {
  const { id } = useParams<VaultUrlParams>();
  const isLoaded = useAppSelector(selectIsConfigAvailable);
  const vaultExists = useAppSelector(state => selectVaultExistsById(state, id));
  const vault = useAppSelector(state => selectVaultById(state, id));
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(vault.isPaused);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    navigate('/');
  }, [navigate]);

  if (!isLoaded) {
    return <Loader />;
  }

  if (!vaultExists) {
    return <VaultNotFound id={id} />;
  }

  if (vault.isPaused) {
    return (
      <PausedVault isModalOpen={isModalOpen} closeModal={handleCloseModal} vaultId={vault.id} />
    );
  }

  return <VaultContent vaultId={id} />;
};

export default VaultDetails;
