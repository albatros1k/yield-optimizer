import { FC } from 'react';
import { useTheme } from 'styled-components';

import { IOption } from '../constants';
import { Card, Circle, Column, Row } from '../../../shared/ui/Containers';
import { Caption, SubTitle } from '../../../shared/ui/Typography';

interface OptionsProps extends IOption {}

export const Option: FC<OptionsProps> = ({ title, caption, icon }) => {
  const {
    colors: { subAccentMain, alterText },
  } = useTheme();

  return (
    <Card w="80%" p="16px 20px" m="0 0 18px">
      <Row h="100%">
        <Circle w="32px" h="32px" bg={subAccentMain} justify="center" align="center" m="0 14px 0 0">
          {icon}
        </Circle>
        <Column>
          <SubTitle>{title}</SubTitle>
          <Caption color={alterText}>{caption}</Caption>
        </Column>
      </Row>
    </Card>
  );
};
