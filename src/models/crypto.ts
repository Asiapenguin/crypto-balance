import { Resource } from '../models/resource';
import { DateTime } from 'ionic-angular';

export class Crypto extends Resource {
  static resourcePath = '/cryptocurrency';

  id: number;
  name: string;
  symbol: string;
  slug: string;
  circulating_supply: number;
  total_supply: number;
  max_supply:number;
  date_added: DateTime;
  num_market_pairs: number;
  cmc_rank: number;
  last_updated: DateTime;
  quote: any;
}