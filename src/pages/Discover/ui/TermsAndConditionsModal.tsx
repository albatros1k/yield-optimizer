/* eslint-disable react/no-unescaped-entities */
import { memo } from 'react';
import { useTheme } from 'styled-components';

import { Modal } from '../../../shared/ui/Modal';
import { Row, ScrollContainer } from '../../../shared/ui/Containers';
import { Input } from '../../../shared/ui/Typography';
import { Button } from '../../../shared/ui/Buttons';

const points = [
  `I am not the person or entities who reside in, are citizens of, are incorporated in, or have a registered office in the United States of America or any Prohibited Localities.`,
  `I will not in the future access this site or use Odysea dApp while located within the United States or any Prohibited Localities.`,
  `I am not using, and will not in the future use, a VPN to mask my physical location from a restricted territory.`,
  `I am lawfully permitted to access this site and use Range Odysea dApp under the laws of the jurisdiction on which I reside and am located.`,
  `Prohibited Localities: Odysea does not interact with digital wallets located in, established in, or a resident of Myanmar (Burma), Cote D'Ivoire (Ivory Coast), Cuba, Crimea and Sevastopol, Democratic Republic of Congo, Iran, Iraq, Libya, Mali, Nicaragua, Democratic People’s Republic of Korea (North Korea), Somalia, Sudan, Syria, Yemen, Zimbabwe or any other state, country or region that is included in the Sanction Lists.`,
  `I understand the risks associated with entering into using Odysea.`,
];

interface TermsAndConditionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export const TermsAndConditionsModal = memo<TermsAndConditionsModalProps>(
  ({ isOpen, onClose, onAccept }) => {
    const { colors } = useTheme();
    return (
      <Modal isOpen={isOpen} onClose={onClose} heading="Access and Use Agreement">
        <ScrollContainer h="200px" barColor={colors.alterText} p="0 25px 0 0 ">
          <Input m="0 0 20px">
            Before proceeding, please carefully read and acknowledge the following terms and
            conditions:
          </Input>
          {points.map(desc => (
            <Input key={desc} m="0 0 5px">
              • {desc}
            </Input>
          ))}
        </ScrollContainer>
        <Input m="20px 0 24px" style={{ fontWeight: 700 }}>
          By clicking "Accept" and using the Odysea dApp, you signify your agreement to abide by the
          terms and conditions stated above.
        </Input>
        <Row w="100%" justify="space-between">
          <Button
            borderColor={colors.alterHelp}
            color={colors.alterText}
            bg="transparent"
            w="calc(30% - 10px)"
            h="50px"
            onClick={onClose}
          >
            Close & Exit Vaults
          </Button>
          <Button w="calc(70% - 10px)" h="50px" onClick={onAccept}>
            Accept
          </Button>
        </Row>
      </Modal>
    );
  }
);
