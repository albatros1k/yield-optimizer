import styled from 'styled-components';

export const Aside = styled.aside`
  width: ${({ theme: { sizes } }) => sizes.DESKTOP.sidebar.width}px;
  background-color: black;
`;
