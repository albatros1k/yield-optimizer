import { memo } from 'react';
import { useTheme } from 'styled-components';

import { VaultEntity } from '../../../../features/data/entities/vault';
import { selectVaultById } from '../../../../features/data/selectors/vaults';

import { useAppSelector } from '../../../../store';

import { Modal } from '../../../../shared/ui/Modal';
import { Column, Row, SvgContainer } from '../../../../shared/ui/Containers';
import { icons } from '../../../../shared/Icons';
import { H3, Input } from '../../../../shared/ui/Typography';
import { Button } from '../../../../shared/ui/Buttons';

interface PausedVaultProps {
  isModalOpen: boolean;
  closeModal: () => void;
  vaultId: VaultEntity['id'];
}

export const PausedVault = memo<PausedVaultProps>(({ isModalOpen, closeModal, vaultId }) => {
  const vault = useAppSelector(state => selectVaultById(state, vaultId));
  const { colors } = useTheme();

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal} minW="370px">
      <Column>
        <SvgContainer m="-20px auto 0" size={62} stroke={colors.accentMain}>
          {icons.info}
        </SvgContainer>
        <H3 ta="center" m="26px auto 12px">
          The {vault.name} strategy <br /> is currently paused
        </H3>
        <Input color={colors.alterText} ta="center" m="0 auto 16px">
          The {vault.name} strategy is temporarily on hold. An <br /> updated version, v2, is
          expected to be launched shortly.
        </Input>
        <Row w="100%" justify="center">
          <Button w="calc(55% - 6px)" h="36px" p="0 10px 0 16px" onClick={closeModal}>
            <Row w="100%" justify="center">
              <Input>Ok, close</Input>
            </Row>
          </Button>
        </Row>
      </Column>
    </Modal>
  );
});
