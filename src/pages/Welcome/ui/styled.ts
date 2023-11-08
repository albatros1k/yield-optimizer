import styled from 'styled-components';

import { Row } from '../../../shared/ui/Containers';
import preview from '../../../images/preview.png';

export const Preview = styled(Row)`
  flex: 1;
  height: 100%;
  background-image: url(${preview});
  background-size: cover;
  background-position: center;
`;
