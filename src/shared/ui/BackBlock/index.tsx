import { ReactNode, memo } from 'react';
import { useNavigate } from 'react-router';
import { useTheme } from 'styled-components';

import { Card, Row, SvgContainer } from '../Containers';
import { Button } from '../Buttons';
import { icons } from '../../Icons';

interface BackBlockProps {
  backText: string;
  onBack?: () => void;
  childrenComponent?: ReactNode | ReactNode[];
}

export const BackBlock = memo<BackBlockProps>(({ backText, onBack, childrenComponent }) => {
  const {
    colors: { alterText },
  } = useTheme();

  const navigate = useNavigate();

  const goBack = (): void => navigate(-1);

  return (
    <Card p="20px 24px" w="100%">
      <Row w="100%" align="center" justify="space-between">
        <Button
          borderColor={alterText}
          bg="transparent"
          h="28px"
          p="0 17px"
          color={alterText}
          m="0 20px 0 0"
          onClick={onBack || goBack}
        >
          <SvgContainer size={10} m="0 6px 0 0">
            {icons.backarrow}
          </SvgContainer>
          {backText}
        </Button>
        {childrenComponent ? <>{childrenComponent}</> : null}
      </Row>
    </Card>
  );
});
