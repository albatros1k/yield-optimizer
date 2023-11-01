import { Fragment, memo, useCallback, useMemo, useState } from 'react';
import { useTheme } from 'styled-components';

import { H3, Main } from '../../../shared/ui/Typography';
import { Card, Grid } from '../../../shared/ui/Containers';
import { Button } from '../../../shared/ui/Buttons';
import { icons } from '../../../shared/Icons';

import { VaultEntity } from '../../../features/data/entities/vault';

import { VaultMechanics } from './Modals/VaultMechanics';
import { ApyBreakdown } from './Modals/ApyBreakdown';
import { Backers } from './Modals/Backers';
import { Audits } from './Modals/Audits';
import { SafetyScore } from './Modals/SafetyScore';

interface Modals {
  mechanics: boolean;
  apy: boolean;
  backers: boolean;
  audits: boolean;
  safety: boolean;
  exit: boolean;
}

interface OtherProps {
  vaultId: VaultEntity['id'];
}

export const Other = memo<OtherProps>(({ vaultId }) => {
  const [modals, setModals] = useState<Modals>({
    mechanics: false,
    apy: false,
    backers: false,
    audits: false,
    safety: false,
    exit: false,
  });
  const { colors } = useTheme();

  const toggleModal = useCallback(
    (modal: keyof Modals) => {
      setModals({ ...modals, [modal]: !modals[modal] });
    },
    [modals]
  );

  const buttons = useMemo(() => {
    return [
      {
        name: 'Vault Mechanics',
        onClick: () => toggleModal('mechanics'),
      },
      { name: 'Exit Mechanics', onClick: () => toggleModal('exit') },
      {
        name: 'APY Breakdown',
        onClick: () => toggleModal('apy'),
      },
      {
        name: 'Backers Info',
        onClick: () => toggleModal('backers'),
      },
      {
        name: 'Audits',
        onClick: () => toggleModal('audits'),
      },
      {
        name: 'Safety Score',
        onClick: () => toggleModal('safety'),
      },
    ];
  }, [toggleModal]);

  return (
    <Fragment>
      <Card p="25px" w="100%">
        <H3 color={colors.alterText} m="0 0 24px">
          Other Information
        </H3>
        <Grid colTemplate="repeat(6,1fr)" colGap="20px" rowTemplate="auto" rowGap="20px">
          {buttons.map(({ name, onClick }) => {
            return (
              <Button
                key={name}
                w="100%"
                h="32px"
                m="0 20px 0 0"
                bg={colors.alterHelp}
                onClick={onClick}
              >
                <Main m="0 5px 0 0">{name}</Main>
                {icons.question}
              </Button>
            );
          })}
        </Grid>
      </Card>
      <VaultMechanics
        key="entry"
        type="entry"
        heading="Vault Mechanics"
        isModalOpen={modals.mechanics}
        closeModal={() => toggleModal('mechanics')}
        vaultId={vaultId}
      />
      <VaultMechanics
        key="exit"
        type="exit"
        heading="Exit Mechanics"
        isModalOpen={modals.exit}
        closeModal={() => toggleModal('exit')}
        vaultId={vaultId}
      />
      <Backers
        isModalOpen={modals.backers}
        closeModal={() => toggleModal('backers')}
        vaultId={vaultId}
      />
      <Audits
        isModalOpen={modals.audits}
        closeModal={() => toggleModal('audits')}
        vaultId={vaultId}
      />
      <ApyBreakdown
        vaultId={vaultId}
        isModalOpen={modals.apy}
        closeModal={() => toggleModal('apy')}
      />
      <SafetyScore
        isModalOpen={modals.safety}
        closeModal={() => toggleModal('safety')}
        vaultId={vaultId}
      />
    </Fragment>
  );
});
