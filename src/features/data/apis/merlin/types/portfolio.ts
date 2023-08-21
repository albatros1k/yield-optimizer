export interface IToken {
  amount: number;
  chain: string;
  decimals: string;
  display_symbol: string | null;
  id: string;
  is_core: boolean;
  is_verified: boolean;
  logo_url: string | null;
  name: string;
  optimized_symbol: string;
  price: number;
  symbol: string;
  time_at: number;
}

export interface IProxy {
  project: null | number;
  proxy_contract_id: null | null;
}

export interface IStats {
  asset_usd_value: number;
  debt_usd_value: number;
  net_usd_value: number;
}

export interface IDetail {
  supply_token_list: IToken[] | null;
  borrow_token_list: IToken[] | null;
  reward_token_list: IToken[] | null;
}

export interface IPortfolioItem {
  detail: IDetail;
  detail_types: string[];
  name: string;
  proxy_detail: IProxy;
  stats: IStats;
  update_at: number;
  walletBundle: null | string;
}

export interface IPortfolio {
  chain: string;
  has_supported_portfolio: boolean;
  id: string;
  logo_url: string | null;
  name: string;
  portfolio_item_list: IPortfolioItem[];
  site_url: string | null;
}
