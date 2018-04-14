import { Injectable, Injector } from '@angular/core';
import { Crypto } from '../../models/crypto';
import { ResourceService } from '../resource/resource.service';

@Injectable()
export class CryptoService extends ResourceService {
  constructor(injector: Injector) {
    super(injector, Crypto);
  }
}
