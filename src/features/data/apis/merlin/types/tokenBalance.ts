export interface ITokenBalance {
  balance: string | number;
  decimals: number;
  logo: string | null;
  name: string | null;
  symbol: string;
  thumbnail: string | null;
  token_address: string;
  chain?: string;
  price: number;
  priceChange24h: number | null;
  bundleWallet: string | null;
}
