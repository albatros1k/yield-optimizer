import { memo } from 'react';
import { useTheme } from 'styled-components';

import { Modal } from '../../../../shared/ui/Modal';
import { Row } from '../../../../shared/ui/Containers';
import { Main } from '../../../../shared/ui/Typography';

import { VaultEntity } from '../../../../features/data/entities/vault';
import { QUESTIONS } from '../../../../new-features/Tags/lib/const';
import { selectVaultInfo } from '../../../../new-features/Tags/selectors/selectVoteInfo';
import { formattedTotalApy } from '../../../../helpers/format';
import { RiskContainer } from '../styled';

import { useAppSelector } from '../../../../store';

interface ApyBreakdownProps {
  isModalOpen: boolean;
  closeModal: () => void;
  vaultId: VaultEntity['id'];
}

const LABELS = {
  totalDaily: 'Total Daily',
  tradingDaily: 'Trading Daily',
  tradingApr: 'Trading APR',
  vaultDaily: 'Vault Daily',
  vaultApr: 'Vault APR',
  totalApy: 'Total APY',
};

export const ApyBreakdown = memo<ApyBreakdownProps>(({ isModalOpen, closeModal, vaultId }) => {
  const { isLoaded, values } = useAppSelector(state => selectVaultInfo(state, vaultId));
  const { colors } = useTheme();

  const formatted = formattedTotalApy(values, QUESTIONS);

  return (
    <Modal heading="APY Breakdown" isOpen={isModalOpen} onClose={closeModal}>
      <RiskContainer w="100%" mb="10px">
        {Object.entries(formatted)
          .reverse()
          .map(([key, value], index, { length }) => (
            <Row key={key} justify="space-between" w="100%" align="center" m="10px">
              <Main color={length - index === 1 ? colors.textColor : colors.alterText}>
                {LABELS[key] || key}
              </Main>
              <Main color={length - index === 1 ? colors.subAccentSecondary : colors.textColor}>
                {isLoaded ? value : '...'}
              </Main>
            </Row>
          ))}
      </RiskContainer>
    </Modal>
  );
});
