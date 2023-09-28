import { memo } from 'react';
import { useTheme } from 'styled-components';

import { Modal } from '../../../../shared/ui/Modal';
import { LinearChart } from '../../../../shared/ui/LinearChart';
import { Column, Row, ScrollContainer } from '../../../../shared/ui/Containers';
import { Main } from '../../../../shared/ui/Typography';
import { Spacer } from '../../../../shared/ui/Spacer';
import { InfoTooltip } from '../../../../shared/ui/Tooltip';

import { MAX_SAFETY_SCORE, safetyScores, totalSafetyScore } from '../../lib/safety';

interface SafetyScoreProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

export const SafetyScore = memo<SafetyScoreProps>(({ isModalOpen, closeModal }) => {
  const { colors } = useTheme();

  return (
    <Modal
      heading={`Safety Score (${totalSafetyScore} / ${MAX_SAFETY_SCORE})`}
      isOpen={isModalOpen}
      onClose={closeModal}
    >
      <LinearChart value={totalSafetyScore} maxValue={MAX_SAFETY_SCORE} />
      <Spacer />

      <ScrollContainer h="300px">
        {Object.entries(safetyScores).map(([title, subtitles]) => (
          <Column key={title} w="95%">
            <Main color={colors.alterText} m="0 0 24px">
              {title}
            </Main>
            {subtitles.map(({ name, score, desc }) => (
              <Row key={name} w="100%" justify="space-between" align="center" m="0 0 25px">
                <Row align="center">
                  <Main m="0 5px 0 0" color={score > 0 ? colors.textColor : colors.accentMain}>
                    {name}
                  </Main>
                  <InfoTooltip id={name + score} text={desc} iconSize={12} />
                </Row>

                <Row
                  w="54px"
                  h="20px"
                  bg={`${score > 0 ? colors.subAccentSecondary : colors.accentMain}40`}
                  align="center"
                  justify="center"
                  br={2}
                >
                  <Main color={score > 0 ? colors.subAccentSecondary : colors.accentMain}>
                    {score > 0 ? '+' : ''}
                    {score}
                  </Main>
                </Row>
              </Row>
            ))}
          </Column>
        ))}
      </ScrollContainer>
    </Modal>
  );
});
