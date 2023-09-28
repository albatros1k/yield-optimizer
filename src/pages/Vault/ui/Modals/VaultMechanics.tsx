import { memo } from 'react';
import { useTheme } from 'styled-components';

import { Modal } from '../../../../shared/ui/Modal';
import { Card, Row } from '../../../../shared/ui/Containers';
import { Main } from '../../../../shared/ui/Typography';
import { Image } from '../../../../shared/ui/Images';
import { awsLink } from '../../../../shared/lib/aws';

import { ScrollContainer } from '../Transact/DepositTokenList/styled';
import { ProtocolSquare } from './styled';

import { Step } from '../../lib/mechanics';

interface VaultMechanicsProps {
  isModalOpen: boolean;
  closeModal: () => void;
  heading: string;
  steps: Step[];
}

export const VaultMechanics = memo<VaultMechanicsProps>(
  ({ isModalOpen, closeModal, heading, steps }) => {
    const { colors } = useTheme();

    return (
      <Modal heading={heading} isOpen={isModalOpen} onClose={closeModal}>
        <ScrollContainer>
          {steps.map(({ name, protocolId, isDark }, index) => (
            <Card key={name} bg={colors.bgColor} w="100%" p="10px 16px">
              <Row w="100%" justify="space-between" align="center">
                <Row align="center">
                  <Main m="0 12px 0 0" color={colors.alterText}>
                    {index + 1}.
                  </Main>
                  <Main>{name}</Main>
                </Row>
                <ProtocolSquare isDark={isDark}>
                  <Image
                    w="14px"
                    h="14px"
                    src={`${awsLink}/protocol-icons/${protocolId}.png`}
                    alt={protocolId}
                  />
                </ProtocolSquare>
              </Row>
            </Card>
          ))}
        </ScrollContainer>
      </Modal>
    );
  }
);
