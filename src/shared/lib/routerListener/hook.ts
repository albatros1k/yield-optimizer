import { useCallback, useRef } from 'react';

import { BUTTON_NAMES } from './interface';

export const useLoggerClick = () => {
  const waitRef = useRef(false);
  const onClickBy = useCallback((buttonName: BUTTON_NAMES) => {
    if (waitRef.current) return;
    waitRef.current = true;
    try {
      window.clickLoggerCallback(buttonName);
    } catch (e) {
      console.log(e);
    }
    setTimeout(() => {
      waitRef.current = false;
    }, 1000);
  }, []);

  return { onClickBy };
};
