/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes, useTheme } from 'styled-components';

import { H3 } from '../Typography';
import { Circle, Row } from '../Containers';

import { icons } from '../../Icons';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  padding: 20px 23px;
  border-radius: 12px;
  background: ${({ theme: { colors } }) => colors.bgGradient};
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  opacity: 0;
  transform: translateY(-20px);
  animation: ${fadeIn} 0.3s ease-in-out forwards;
  z-index: 1;
  min-width: 570px;
`;

interface ModalProps {
  isOpen: boolean;
  heading: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: FC<ModalProps> = ({ isOpen, onClose, children, heading }) => {
  const { colors } = useTheme();
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <ModalOverlay>
      <ModalContent>
        <Row m="0 0 20px" w="100%" justify="space-between" align="center">
          <H3>{heading}</H3>
          <Circle
            w="32px"
            h="32px"
            bg={colors.alterBg}
            justify="center"
            align="center"
            onClick={onClose}
            pointer
          >
            {icons.x}
          </Circle>
        </Row>
        {children}
      </ModalContent>
    </ModalOverlay>,
    document.getElementById('modal-root')!
  );
};
