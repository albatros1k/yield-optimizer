import { FC } from 'react';
import { WidgetPage } from '../../../widgets/LifiWidget';
import { Row } from '../../../shared/ui/Containers';

const Swap: FC = () => {
  return (
    <Row m="auto">
      <WidgetPage />
    </Row>
  );
};

export default Swap;
