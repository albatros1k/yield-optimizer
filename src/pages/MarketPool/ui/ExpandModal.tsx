import { MouseEvent, ReactNode, memo } from 'react';

import { icons } from '../../../shared/Icons';
import { Block, Column, Row } from '../../../shared/ui/Containers';
import { H4, SubTitle } from '../../../shared/ui/Typography';
import { CloseBlock, ExpandedChartContainer, ModalLayout } from './styled';

interface ExpandedChartModalProps {
  onClose: () => void;
  title: string;
  subTitle: string;
  children: ReactNode;
  containerPadding?: string;
}

export const ExpandedChartModal = memo<ExpandedChartModalProps>(
  ({ onClose, title, subTitle, children, containerPadding = '0' }) => {
    const onStopPropagation = (e: MouseEvent<HTMLElement>) => e.stopPropagation();
    return (
      <ModalLayout show={true} onClick={onClose}>
        <ExpandedChartContainer pos="fixed" onClick={onStopPropagation} p="25px 10px 0 0">
          <Row m="0 0 5px" p="0 100px 0 30px" justify="space-between">
            <Column>
              <H4 m="0 0 10px">{title}</H4>
              <SubTitle>{subTitle}</SubTitle>
            </Column>
          </Row>
          <CloseBlock pos="absolute" onClick={onClose}>
            {icons.x}
          </CloseBlock>
          <Block h="calc(100% - 55px)" pos="relative" p={containerPadding}>
            {children}
          </Block>
        </ExpandedChartContainer>
      </ModalLayout>
    );
  }
);
