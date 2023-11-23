interface Window {
  clickLoggerCallback: (string) => void;
  voted: (vote: string | number, email?: string, addition?: any) => void;
  ethereum: any;
}

declare module 'browser-signature';
