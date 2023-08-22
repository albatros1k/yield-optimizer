import { FC } from 'react';
import { useTheme } from 'styled-components';
import { Card, Circle, Column, SvgContainer } from '../Containers';
import { icons } from '../../Icons';
import { H1, Main } from '../Typography';

interface NoInfoProps {
  heading: string;
  description: string;
  icon?: JSX.Element;
}

export const NoInfo: FC<NoInfoProps> = ({ heading, description, icon }) => {
  const {
    colors: { textColor, alterText, alterBg },
  } = useTheme();

  return (
    <Card w="100%" h="400px" p="70px">
      <Column align="center" justify="center" w="100%" h="100%">
        <Circle w="102px" h="102px" align="center" justify="center" bg={alterBg} m="0 0 32px">
          <SvgContainer stroke={textColor} size={34} strokeWidth={0.5}>
            {icon || icons.search}
          </SvgContainer>
        </Circle>
        <H1 m="0 0 18px">{heading}</H1>
        <Main maxW="460px" ta="center" color={alterText}>
          {description}
        </Main>
      </Column>
    </Card>
  );
};
