import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  height: 110px;
  width: 100%;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${({ theme: { sizes } }) => `0 40px 0 ${sizes.DESKTOP.sidebar.width}px`};
`;
