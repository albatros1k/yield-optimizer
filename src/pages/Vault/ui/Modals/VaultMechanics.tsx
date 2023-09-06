import { memo, useMemo } from 'react';
import { useTheme } from 'styled-components';

import { Modal } from '../../../../shared/ui/Modal';
import { Card, Row } from '../../../../shared/ui/Containers';
import { Main } from '../../../../shared/ui/Typography';
import { Image } from '../../../../shared/ui/Images';

import { ScrollContainer } from '../Transact/DepositTokenList/styled';
import { ProtocolSquare } from './styled';
import { awsLink } from '../../../../shared/lib/aws';

interface VaultMechanicsProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

export const VaultMechanics = memo<VaultMechanicsProps>(({ isModalOpen, closeModal }) => {
  const { colors } = useTheme();

  const steps = useMemo(() => {
    return [
      { name: 'Deposit USDC to AAVE v3', protocolId: 'aave3' },
      {
        name: 'Borrow 80% of BAL and 20% of ETH pool amount, so HR on loan is 1.25',
        protocolId: 'balancer',
      },
      { name: 'Deposit ETH & BAL into B-80BAL-20WETH pool ', protocolId: 'balancer' },
      {
        name: 'Deposit B-80BAL-20WETH LP tokens into auraBAL-80-20 stablepool ',
        protocolId: 'balancer',
      },
      { name: 'Stake auraBAL-B-80BAL-20WETH LPs at Aura', protocolId: 'balancer' },
    ];
  }, []);

  return (
    <Modal heading="Vault Mechanics" isOpen={isModalOpen} onClose={closeModal}>
      <ScrollContainer>
        {steps.map(({ name, protocolId }, index) => (
          <Card key={name} bg={colors.bgColor} w="100%" p="10px 16px">
            <Row w="100%" justify="space-between" align="center">
              <Row align="center">
                <Main m="0 12px 0 0" color={colors.alterText}>
                  {index + 1}.
                </Main>
                <Main>{name}</Main>
              </Row>
              <ProtocolSquare>
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
});
