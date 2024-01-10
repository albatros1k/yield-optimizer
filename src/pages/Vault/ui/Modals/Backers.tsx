import { memo } from 'react';
import { capitalize } from 'lodash-es';

import { useTheme } from 'styled-components';

import { Modal } from '../../../../shared/ui/Modal';
import { Main } from '../../../../shared/ui/Typography';
import { icons } from '../../../../shared/Icons';
import { Column, Row, ScrollContainer, SvgContainer } from '../../../../shared/ui/Containers';
import { VaultEntity } from '../../../../features/data/entities/vault';
import { BACKERS } from '../../../../config/modals/backers';

interface BackersProps {
  isModalOpen: boolean;
  closeModal: () => void;
  vaultId: VaultEntity['id'];
}

export const Backers = memo<BackersProps>(({ isModalOpen, closeModal, vaultId }) => {
  const { colors } = useTheme();

  const backers = BACKERS[vaultId] || [];

  return (
    <Modal heading="Backers" isOpen={isModalOpen} onClose={closeModal}>
      <ScrollContainer h="500px">
        {Object.entries(backers).map(([protocol, data]) => (
          <Column key={protocol} w="95%">
            <Main color={colors.alterText} m="0 0 24px">
              {capitalize(protocol)}
            </Main>
            {data.map(({ backer, partnership, proof }) => (
              <Row key={backer} w="100%" justify="space-between" align="center" m="0 0 25px">
                <Row w="100%" align="center" justify="space-between">
                  <Main style={{ whiteSpace: 'nowrap' }} m="0 10px 0 0">
                    {backer}
                  </Main>
                  <Main style={{ whiteSpace: 'nowrap' }} color={colors.alterText}>
                    ({partnership})
                  </Main>
                </Row>
                {proof ? (
                  <Row
                    align="center"
                    pointer
                    onClick={() => window.open(proof, '_blank', 'noopener,noreferrer')}
                  >
                    <Main color={colors.alterText} m="0 6px 0 0">
                      Proof
                    </Main>
                    <SvgContainer stroke={colors.alterText} size={12}>
                      {icons.externalLink}
                    </SvgContainer>
                  </Row>
                ) : null}
              </Row>
            ))}
          </Column>
        ))}
      </ScrollContainer>
    </Modal>
  );
});
