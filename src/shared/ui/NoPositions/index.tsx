import { FC } from 'react';
import { useTheme } from 'styled-components';

import { Card, Circle, Column, Row, SvgContainer } from '../Containers';
import { H3, SubTitle } from '../Typography';

interface NoPositionsProps {
  icon: JSX.Element;
  heading: string;
  description: string;
}

export const NoPositions: FC<NoPositionsProps> = ({ icon, heading, description }) => {
  const {
    colors: { alterBg, alterText, textColor },
  } = useTheme();
  return (
    <Card p="22px 24px" w="100%">
      <Row h="100%">
        <Circle w="72px" h="72px" align="center" justify="center" bg={alterBg} m="0 24px 0 0">
          <SvgContainer stroke={textColor} size={24}>
            {icon}
          </SvgContainer>
        </Circle>
        <Column justify="space-between" h="100%">
          <H3>{heading}</H3>
          <SubTitle color={alterText} maxW="450px">
            {description}
          </SubTitle>
        </Column>
      </Row>
    </Card>
  );
};
