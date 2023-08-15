import { memo } from 'react';

import { SmallLoader } from '../../../../../shared/ui/Loaders';
import { Row } from '../../../../../shared/ui/Containers';

export const LoadingStep = memo(() => {
  return (
    <Row w="100%" h="100%" justify="center" align="center">
      <SmallLoader size={40} />
    </Row>
  );
});
