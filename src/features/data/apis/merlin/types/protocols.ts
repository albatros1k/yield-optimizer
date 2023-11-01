export interface ISupportedProtocol {
  protocolName: string;
  logo: string;
}

type ProtocolMap = Record<string, ISupportedProtocol[]>;

export interface ISupportedProtocolsResponse {
  pnl: ProtocolMap;
  defi: ProtocolMap;
}
