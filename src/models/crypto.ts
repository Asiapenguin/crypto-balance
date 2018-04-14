import { Resource } from "../models/resource";

export class Crypto extends Resource {
  static resourcePath = '/ticker';

  id: string;
  name: string;
  symbol: string;
  rank: string;
  price_usd: string;
  price_btc: string;
  twentyFour_volume_usd: string;
  market_cap_usd: string;
  available_supply: string;
  total_supply: string;
  percent_change_hourly: string;
  percent_change_daily: string;
  percent_change_weekly: string;
  last_updated: Date;
}