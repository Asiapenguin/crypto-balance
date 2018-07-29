import { Resource } from '../models/resource';

export class Crypto extends Resource {
  static resourcePath = '/ticker';

  id: string;
  name: string;
  symbol: string;
  website_slug: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply:number;
  quotes: any;
  last_updated: Date;
}