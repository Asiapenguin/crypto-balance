import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Injector } from '@angular/core';
import { ResourceService } from "./resource.service";
import { Resource } from "../../models/resource";
import { Crypto } from "../../models/crypto";
import { async, inject, TestBed } from '@angular/core/testing';

describe("CryptoService", () => {
  let httpMock: HttpTestingController;
  let resourceService: ResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Injector]
    });

    httpMock = TestBed.get(HttpTestingController);
  });

  beforeEach(
    inject([Injector], (injector: Injector) => {
      resourceService = new ResourceService(injector, Crypto);
    })
  );

  it("should handle get", () => {
    resourceService.get('bitcoin').then(data => {
      expect(data instanceof Crypto).toBeTruthy();
      expect(data instanceof Resource).toBeTruthy();
      expect(data.id).toBe('bitcoin');
    });
  });
});
