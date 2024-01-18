import { memo } from 'react';
import { XIcon } from 'react-share';

import { hashtags, odyseaTwitterName, relatedKeys } from '../lib/constants';
import { Main } from '../../../../shared/ui/Typography';
import { TwitterBtn } from './styled';

interface TwitterProps {
  title?: string;
  size?: number;
}

export const Twitter = memo<TwitterProps>(({ title, size = 28 }) => {
  return (
    <TwitterBtn
      url={window.location.href}
      title={title}
      hashtags={hashtags}
      via={odyseaTwitterName}
      related={relatedKeys}
    >
      <XIcon size={size} round />
      <Main m="0 0 0 7px">Share on X</Main>
    </TwitterBtn>
  );
});
