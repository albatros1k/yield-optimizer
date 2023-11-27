import browserSignature from 'browser-signature';

export const signature = browserSignature();

export const theFirstUrl = window?.location.href;

export const PLATFORM = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent
)
  ? 'mobileBrowser'
  : 'desktopBrowser';

export type Timer = ReturnType<typeof setTimeout> | null;

export const APP_VERSION = '2';
export const PROVIDER_LOCAL_STORAGE_KEY = 'provider';
