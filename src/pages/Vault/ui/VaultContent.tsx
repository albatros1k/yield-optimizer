import { FC, Fragment, PropsWithChildren, SVGProps, memo, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { capitalize } from 'lodash-es';

import { VaultEntity, isGovVault } from '../../../features/data/entities/vault';
import {
  selectVaultById,
  selectVaultsWithSameNames,
} from '../../../features/data/selectors/vaults';

import { useAppSelector } from '../../../store';
import { Grid } from '../../../shared/ui/Containers';
import { H3 } from '../../../shared/ui/Typography';
import { BackBlock } from '../../../shared/ui/BackBlock';
import { Spacer } from '../../../shared/ui/Spacer';
import { TabSwitcher } from '../../../shared/ui/Switcher';

import { About } from './About';
import { HistoricalRate } from './HistoricalRate';
import { ProtocolAndAssets } from './ProtocolAndAssets';
import { Risks } from './Risks';
import { Management } from './Management';
import { Other } from './Other';
import { AboutStrategy } from './AboutStrategy';
import { Revenue } from './Revenue';
import { Beta } from './Beta';

const networkIcons = import.meta.glob<FC<SVGProps<SVGSVGElement>>>(
  '../../../images/networks/*.svg',
  {
    eager: true,
    import: 'ReactComponent',
  }
);

type VaultContentProps = PropsWithChildren<{
  vaultId: VaultEntity['id'];
}>;

export const VaultContent = memo<VaultContentProps>(({ vaultId }) => {
  const vault = useAppSelector(state => selectVaultById(state, vaultId));
  const duplicatedVaults = useAppSelector(state => selectVaultsWithSameNames(state, vault.name));
  const navigate = useNavigate();

  const TabChainSwitcher = useMemo(() => {
    const options = duplicatedVaults.map(vault => {
      const Icon = networkIcons[`../../../images/networks/${vault.chainId}.svg`];
      return {
        value: vault.id,
        label: capitalize(vault.chainId),
        icon: <Icon width={16} height={16} />,
      };
    });

    const onChangeOption = (id: VaultEntity['id']): void => navigate(`/vault/${id}`);

    if (duplicatedVaults.length > 1) {
      return (
        <Grid
          w="100%"
          colTemplate="repeat(2,1fr)"
          rowTemplate="auto"
          colGap="20px"
          rowGap="20px"
          m="0 0 24px"
        >
          <TabSwitcher selected={vault.id} options={options} onChange={onChangeOption} />
        </Grid>
      );
    } else return null;
  }, [duplicatedVaults, vault, navigate]);

  return (
    <Fragment>
      <BackBlock backText="Back to Vaults" onBack={() => navigate('/')} />
      <Spacer />
      <Beta />
      <H3 m="42px 0 24px">{vault.name} Vault</H3>
      {TabChainSwitcher}
      <Grid
        w="100%"
        colTemplate="repeat(2,1fr)"
        rowTemplate="auto"
        colGap="20px"
        rowGap="20px"
        m="0 0 42px"
        minH="auto"
      >
        {!isGovVault(vault) ? <About vaultId={vaultId} /> : <div />}
        {!isGovVault(vault) ? <HistoricalRate vaultId={vaultId} /> : <div />}
        <Management vaultId={vaultId} />
        <Risks vaultId={vaultId} />
        <ProtocolAndAssets vaultId={vaultId} />
        <Revenue vaultId={vaultId} />
      </Grid>
      <H3 m="0 0 24px">Strategy Details</H3>
      <AboutStrategy vaultId={vaultId} />
      <Spacer />
      <Other vaultId={vaultId} />
    </Fragment>
  );
});
