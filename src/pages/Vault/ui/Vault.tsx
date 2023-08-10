import { useParams } from 'react-router';

import { VaultEntity } from '../../../features/data/entities/vault';
import { selectVaultExistsById } from '../../../features/data/selectors/vaults';
import { selectIsConfigAvailable } from '../../../features/data/selectors/data-loader';
import { TechLoader } from '../../../components/TechLoader';

import { useAppSelector } from '../../../store';

import { VaultNotFound } from './VaultNotFound';
import { VaultContent } from './VaultContent';

export type VaultUrlParams = {
  id: VaultEntity['id'];
};

const VaultDetails = () => {
  const { id } = useParams<VaultUrlParams>();
  const isLoaded = useAppSelector(selectIsConfigAvailable);
  const vaultExists = useAppSelector(state => selectVaultExistsById(state, id));

  if (!isLoaded) {
    return <TechLoader text="Loading..." />;
  }

  if (!vaultExists) {
    return <VaultNotFound id={id} />;
  }

  return <VaultContent vaultId={id} />;
};

export default VaultDetails;
