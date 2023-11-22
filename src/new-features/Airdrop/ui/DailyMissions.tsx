import { memo } from 'react';
import { useTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { icons } from '../../../shared/Icons';
import { Modal } from '../../../shared/ui/Modal';
import { Button } from '../../../shared/ui/Buttons';
import { H3, Input } from '../../../shared/ui/Typography';
import { Column, Row, SvgContainer } from '../../../shared/ui/Containers';

interface DailyMissionsProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

export const DailyMissions = memo<DailyMissionsProps>(({ isModalOpen, closeModal }) => {
  const { colors } = useTheme();

  const navigate = useNavigate();

  const goToGalaxy = () =>
    window.open(`https://galxe.com/odysea/campaign/GC838Un2H8`, '_blank', 'noopener,noreferrer');

  const goToLeaderBoard = () => {
    navigate('/leaderboard');
    closeModal();
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal} minW="370px">
      <Column>
        <SvgContainer m="-20px auto 0" size={62}>
          {icons.fullStar}
        </SvgContainer>
        <H3 ta="center" m="26px auto 12px">
          Complete the daily mission <br /> and collect more stardust
        </H3>
        <Input color={colors.alterText} ta="center" m="0 auto 16px">
          Stardust is the fuel for our mission and collecting it will <br /> have many benefits.
        </Input>
        <Row w="100%" justify="space-between">
          <Button w="calc(55% - 6px)" h="36px" p="0 10px 0 16px" onClick={goToGalaxy}>
            <Row w="100%" justify="space-between">
              <Input>Complete Daily Missions</Input>
              <SvgContainer>{icons.externalLink}</SvgContainer>
            </Row>
          </Button>
          <Button bg={colors.alterBg} w="calc(45% - 6px)" h="36px" onClick={goToLeaderBoard}>
            <Input>See Leaderboard</Input>
          </Button>
        </Row>
      </Column>
    </Modal>
  );
});
