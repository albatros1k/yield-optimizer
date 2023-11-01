import { memo } from 'react';
import { capitalize } from 'lodash-es';
import { useTheme } from 'styled-components';

import { Modal } from '../../../../shared/ui/Modal';
import { icons } from '../../../../shared/Icons';
import { Main } from '../../../../shared/ui/Typography';
import { Column, Row, ScrollContainer, SvgContainer } from '../../../../shared/ui/Containers';
import { AUDITS } from '../../../../config/modals/audits';
import { VaultEntity } from '../../../../features/data/entities/vault';

interface AuditsProps {
  isModalOpen: boolean;
  closeModal: () => void;
  vaultId: VaultEntity['id'];
}

export const Audits = memo<AuditsProps>(({ isModalOpen, closeModal, vaultId }) => {
  const { colors } = useTheme();

  const audits = AUDITS[vaultId];

  return (
    <Modal heading="Audits" isOpen={isModalOpen} onClose={closeModal}>
      <ScrollContainer h="500px">
        {Object.entries(audits).map(([protocol, data]) => (
          <Column key={protocol} w="95%">
            <Main color={colors.alterText} m="0 0 24px">
              {capitalize(protocol)}
            </Main>
            {data.map(({ name, report }) => (
              <Row key={name} w="100%" justify="space-between" align="center" m="0 0 25px">
                <Main>{name}</Main>
                {report ? (
                  <Row
                    align="center"
                    pointer
                    onClick={() => window.open(report, '_blank', 'noopener,noreferrer')}
                  >
                    <Main color={colors.alterText} m="0 6px 0 0">
                      Audit
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
