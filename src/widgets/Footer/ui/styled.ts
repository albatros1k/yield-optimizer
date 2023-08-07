import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  height: 110px;
  width: 100%;
  background-color: ${({ theme: { colors } }) => colors.alterBg};
  display: flex;
  padding: 0 40px 0 0;
`;
