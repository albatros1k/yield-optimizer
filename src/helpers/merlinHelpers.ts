export const parseProtocolName = <T extends string>(protocol: T): T => {
  const parts = protocol.split('__');
  if (parts.length > 0) {
    return parts[0] as T;
  }
  throw new Error('Invalid protocol format');
};

export const removeSpecialSymbol = <T extends string>(str: T): T =>
  str.replace(/[^a-zA-Z0-9. ]/g, '') as T;
