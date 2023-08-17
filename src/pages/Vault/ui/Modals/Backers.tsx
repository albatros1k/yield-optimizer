import { memo, useMemo } from 'react';
import { capitalize } from 'lodash-es';

import { useTheme } from 'styled-components';

import { Modal } from '../../../../shared/ui/Modal';
import { Main } from '../../../../shared/ui/Typography';
import { icons } from '../../../../shared/Icons';
import { Column, Row, ScrollContainer, SvgContainer } from '../../../../shared/ui/Containers';

interface BackersProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

interface Backer {
  backer: string;
  partnership: string;
  proof: string | null;
}

export const Backers = memo<BackersProps>(({ isModalOpen, closeModal }) => {
  const { colors } = useTheme();

  const backers = useMemo<{ aave: Backer[]; balancer: Backer[] }>(() => {
    return {
      aave: [
        {
          backer: 'COIND',
          partnership: 'Seed Round - Aave',
          proof: 'https://www.crunchbase.com/organization/ethlend/company_financials',
        },
        {
          backer: 'DTC Capital',
          partnership: 'Initial Coin Offering - Aave',
          proof: null,
        },
        {
          backer: 'Framework Ventures',
          partnership: 'Initial Coin Offering - Aave',
          proof: null,
        },
        {
          backer: 'James Sowers',
          partnership: 'Secondary Market - Aave',
          proof: null,
        },
        {
          backer: 'Blockchain Capital',
          partnership: 'Venture Round - Aave',
          proof: null,
        },
        {
          backer: 'Blockchain.com Ventures',
          partnership: 'Venture Round - Aave',
          proof: null,
        },
        {
          backer: 'Standard Crypto',
          partnership: 'Venture Round - Aave',
          proof: null,
        },
        {
          backer: 'ParaFi Capital',
          partnership: 'Initial Coin Offering - Aave',
          proof: null,
        },
        {
          backer: 'Three Arrows Capital',
          partnership: 'Initial Coin Offering - Aave',
          proof: null,
        },
      ],
      balancer: [
        {
          backer: ' Alameda Research',
          partnership: 'Investor',
          proof: 'https://messari.io/asset/balancer/profile/investors',
        },
        {
          backer: ' Blockchain Capital',
          partnership: 'Investor',
          proof: 'https://messari.io/asset/balancer/profile/investors',
        },
        {
          backer: ' Defiance Capital',
          partnership: 'Investor',
          proof: 'https://messari.io/asset/balancer/profile/investors',
        },
        {
          backer: ' Pantera Capital',
          partnership: 'Investor',
          proof: 'https://messari.io/asset/balancer/profile/investors',
        },
        {
          backer: ' Three Arrows Capital',
          partnership: 'Investor',
          proof: 'https://messari.io/asset/balancer/profile/investors',
        },
        {
          backer: ' Accomplice',
          partnership: 'Investor',
          proof: 'https://messari.io/asset/balancer/profile/investors',
        },
        {
          backer: ' Fenbushi Capital',
          partnership: 'Investor',
          proof: 'https://messari.io/asset/balancer/profile/investors',
        },
      ],
    };
  }, []);

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
                <Row align="center">
                  <Main m="0 5px 0 0">{backer}</Main>
                  <Main color={colors.alterText}>({partnership})</Main>
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
