interface Window {
  clickLoggerCallback: (string) => void;
  voted: (vote: string | number, email?: string, addition?: any) => void;
  ethereum: any;
  woopra: any;
}

declare module 'browser-signature';
