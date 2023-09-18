import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
html {
	scroll-behavior: smooth;
}
body {
  background: ${({ theme: { colors } }) => colors.bgGradient};
}
* {
	font-family: PT Sans;
	font-weight: normal;
  color: ${({ theme: { colors } }) => colors.textColor};
  margin: 0;
  padding: 0;
  outline:0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}
input,
button,
textarea,
select {
  margin: 0;
  font: inherit;
}
a {
  text-decoration:none;
}
`;
