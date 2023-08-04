import { FC } from 'react';
import styled from 'styled-components';

import { load, loadSpin, spin } from '../../styles/animations';
import { Row } from '../Containers';

const Container = styled.div`
  display: flex;
  position: relative;
  width: auto;
  height: 20px;
  margin: auto;
  transition: all 0.4s ease;
  > span {
    animation: ${load} 1.2s ease infinite both;
    display: block;
    align-items: flex-end;
    background-color: ${({ theme: { colors } }) => colors.subAccentMain};
    width: 5px;
    height: 5px;
    position: absolute;
    border-radius: 4px;
    bottom: 0;

    &:nth-child(1) {
      transform: translateX(-20px);
    }

    &:nth-child(2) {
      animation-delay: 0.4s;
    }

    &:nth-child(3) {
      animation-delay: 0.8s;
      transform: translateX(20px);
    }
  }
`;

export const Loader = () => {
  return (
    <Row w="100%" h="100%" align="center" justify="center">
      <Container>
        <span />
        <span />
        <span />
      </Container>
    </Row>
  );
};

export const SmallLoader = styled.div<{ size: number; m?: string }>`
  border-radius: 50%;
  width: ${({ size }) => size + 'px'};
  height: ${({ size }) => size + 'px'};
  border: 0.2rem solid ${({ theme: { colors } }) => colors.alterText};
  border-top-color: ${({ theme: { colors } }) => colors.subAccentMain};
  animation: ${spin} 1s infinite linear;
  margin: ${({ m = 0 }) => m};
`;

export const LoadingSpinner = styled.div`
  color: official;
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  & div {
    transform-origin: 40px 40px;
    animation: ${loadSpin} 1.2s linear infinite;
  }
  & div:after {
    content: ' ';
    display: block;
    position: absolute;
    top: 3px;
    left: 37px;
    width: 3px;
    height: 18px;
    border-radius: 20%;
    background: ${({ theme: { colors } }) => colors.subAccentSecondary};
  }
  & div:nth-child(1) {
    transform: rotate(0deg);
    animation-delay: -1.1s;
  }
  & div:nth-child(2) {
    transform: rotate(30deg);
    animation-delay: -1s;
  }
  & div:nth-child(3) {
    transform: rotate(60deg);
    animation-delay: -0.9s;
  }
  & div:nth-child(4) {
    transform: rotate(90deg);
    animation-delay: -0.8s;
  }
  & div:nth-child(5) {
    transform: rotate(120deg);
    animation-delay: -0.7s;
  }
  & div:nth-child(6) {
    transform: rotate(150deg);
    animation-delay: -0.6s;
  }
  & div:nth-child(7) {
    transform: rotate(180deg);
    animation-delay: -0.5s;
  }
  & div:nth-child(8) {
    transform: rotate(210deg);
    animation-delay: -0.4s;
  }
  & div:nth-child(9) {
    transform: rotate(240deg);
    animation-delay: -0.3s;
  }
  & div:nth-child(10) {
    transform: rotate(270deg);
    animation-delay: -0.2s;
  }
  & div:nth-child(11) {
    transform: rotate(300deg);
    animation-delay: -0.1s;
  }
  & div:nth-child(12) {
    transform: rotate(330deg);
    animation-delay: 0s;
  }
`;

export const Loading: FC = () => {
  return (
    <LoadingSpinner>
      {[...Array(12).fill(Math.random())].map((_, i) => (
        <div key={i} />
      ))}
    </LoadingSpinner>
  );
};
