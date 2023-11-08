/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { FC, useEffect } from 'react';
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

const ModalContent = styled.div<{ minW?: string; p?: string }>`
  padding: ${({ p = '20px 23px' }) => p};
  border-radius: 12px;
  background: ${({ theme: { colors } }) => colors.bgGradient};
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  opacity: 0;
  transform: translateY(-20px);
  animation: ${fadeIn} 0.3s ease-in-out forwards;
  z-index: 1;
  min-width: ${({ minW = '570px' }) => minW};
  max-width: 600px;
`;

interface ModalProps {
  isOpen: boolean;
  heading?: string;
  onClose: () => void;
  children: React.ReactNode;
  minW?: string;
  p?: string;
}

export const Modal: FC<ModalProps> = ({ isOpen, onClose, children, heading, minW, p }) => {
  const { colors } = useTheme();

  useEffect(() => {
    const handleEscapeKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscapeKeyPress);
    } else {
      window.removeEventListener('keydown', handleEscapeKeyPress);
    }

    return () => {
      window.removeEventListener('keydown', handleEscapeKeyPress);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  else {
    return ReactDOM.createPortal(
      <ModalOverlay onClick={onClose}>
        <ModalContent onClick={e => e.stopPropagation()} minW={minW} p={p}>
          <Row
            m="0 0 20px"
            w="100%"
            justify={heading ? 'space-between' : 'flex-end'}
            align="center"
          >
            {heading ? <H3>{heading}</H3> : null}
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
  }
};
