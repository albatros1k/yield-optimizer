import { memo, useMemo } from 'react';
import { capitalize } from 'lodash-es';
import { useTheme } from 'styled-components';

import { Modal } from '../../../../shared/ui/Modal';
import { icons } from '../../../../shared/Icons';
import { Main } from '../../../../shared/ui/Typography';
import { Column, Row, ScrollContainer, SvgContainer } from '../../../../shared/ui/Containers';

interface AuditsProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

export const Audits = memo<AuditsProps>(({ isModalOpen, closeModal }) => {
  const { colors } = useTheme();

  const audits = useMemo(() => {
    return {
      aave: [
        {
          name: 'Sigma prime',
          report:
            'https://github.com/aave/aave-v3-core/blob/master/audits/27-01-2022_SigmaPrime_AaveV3.pdf',
        },
        {
          name: 'ADBK',
          report:
            'https://github.com/aave/aave-v3-core/blob/master/audits/27-01-2022_ABDK_AaveV3.pdf',
        },
        {
          name: 'PeckShield',
          report: 'https://peckshield.com/',
        },
        {
          name: 'Trail of Bits',
          report: 'https://www.trailofbits.com/',
        },
      ],
      balancer: [
        {
          name: 'CertiK',
          report: 'https://www.certora.com/',
        },
        {
          name: 'Trail of Bits',
          report: 'https://www.trailofbits.com/',
        },
        {
          name: 'OpenZeppelin',
          report: 'https://www.openzeppelin.com/',
        },
        {
          name: 'Trail of Bits',
          report: 'https://skynet.certik.com/projects/balancer',
        },
      ],
      aurora: [
        {
          name: 'PeckShield',
          report: 'https://peckshield.com/',
        },
        {
          name: 'Halborn',
          report: 'https://www.halborn.com/',
        },
        {
          name: 'Code4rena',
          report: 'https://code4rena.com/',
        },
      ],
    };
  }, []);

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
