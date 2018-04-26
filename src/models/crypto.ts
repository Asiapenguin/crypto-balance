import { Resource } from "../models/resource";

export class Crypto extends Resource {
  static resourcePath = '/ticker';

  id: string;
  name: string;
  symbol: string;
  rank: string;
  price_cad: string;
  price_btc: string;
  market_cap_cad: string;
  total_supply: string;
  percent_change_1h: string;
  percent_change_24h: string;
  last_updated: Date;
}