import { FC, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { io, Socket } from 'socket.io-client';
import { load } from '@fingerprintjs/fingerprintjs';

import { BUTTON_NAMES, IRouterListener } from './interface';
import { APP_VERSION, PLATFORM, PROVIDER_LOCAL_STORAGE_KEY, theFirstUrl, Timer } from './const';
import { gaPageTracker } from './ga';

const RouterListenerLogic: FC<IRouterListener & { token: string }> = ({
  children,
  wallet = '',
  token,
  addition = {},
}) => {
  const previewPath = useRef('');
  const socket = useRef<Socket | null>(null);
  const location = useLocation();

  const uri = localStorage.getItem('uri');

  useEffect(() => {
    if (!socket.current && token && !window.location.origin.includes('localhost')) {
      socket.current = io(`${import.meta.env.VITE_APP_API_URL}`, {
        path: '/merlin/statistics',
        query: {
          deviceId: JSON.stringify([token, navigator?.userAgent]),
          platform: PLATFORM,
          origin: encodeURIComponent(window.origin),
          uri,
          height: window.screen.height,
          width: window.screen.width,
          appVersion: APP_VERSION ?? '',
        },
        transports: ['polling'],
      });

      try {
        window.clickLoggerCallback = (buttonName: BUTTON_NAMES) => {
          if (socket.current) {
            socket.current.emit('onClick', {
              buttonName,
              deviceId: JSON.stringify([token, navigator?.userAgent]),
              origin: encodeURIComponent(window.origin),
            });
          }
        };
      } catch (e) {
        console.log(e);
      }
    }

    if (wallet && socket.current) {
      const provider = window.localStorage.getItem(PROVIDER_LOCAL_STORAGE_KEY);
      socket.current.emit('onWalletStart', {
        wallet,
        provider,
      });
    }

    const pathname = location.pathname;
    if (pathname && socket.current) {
      try {
        if (!window.location.href.includes('localhost')) {
          gaPageTracker(pathname);
        }
      } catch (e) {
        console.log(e);
      }

      const previewPathCurrent = previewPath.current;
      setTimeout(
        () => {
          try {
            socket.current &&
              socket.current.emit('onPageStart', {
                pageFullPath: pathname,
                previewPage: previewPathCurrent || theFirstUrl || '',
              });
          } catch (e) {
            console.log(e);
          }
        },
        socket.current.connected ? 0 : 1000
      );
      previewPath.current = pathname;
    }

    if (socket.current) {
      socket.current.emit('onVisitStart');
    }

    let debounceClose: Timer;
    window.onfocus = () => {
      if (debounceClose) {
        clearTimeout(debounceClose);
        debounceClose = null;
      } else if (socket.current) {
        socket.current.emit('onTabOpen');
      }
    };

    window.onblur = () => {
      if (socket.current) {
        clearTimeout(debounceClose);
        debounceClose = setTimeout(() => {
          socket.current?.emit('onTabClose');
          debounceClose = null;
        }, 59000);
      }
    };

    let debounce: Timer;
    const time = 1500;

    const onTopLvlClick = (e: MouseEvent) => {
      clearTimeout(debounce);

      debounce = setTimeout(() => {
        const event = { type: 'click', x: e.x, y: e.y };
        socket.current?.emit('onTabOpenEvent', { event });
      }, time);
    };

    window.addEventListener('click', onTopLvlClick);

    return () => {
      window.removeEventListener('click', onTopLvlClick);
    };
  }, [location, wallet, uri, token]);

  useEffect(() => {
    if (socket.current && typeof addition === 'object') {
      socket.current.emit('onVisitStart', { addition });
    }
  }, [addition]);

  return <>{children}</>;
};

export const RouterListener: FC<IRouterListener> = props => {
  const [token, setToken] = useState('');

  useEffect(() => {
    (async function () {
      const { visitorId } = await load().then(res => res.get());
      setToken(visitorId);
    })();
  }, []);

  if (token) {
    return <RouterListenerLogic {...props} token={token} />;
  }

  return null;
};
