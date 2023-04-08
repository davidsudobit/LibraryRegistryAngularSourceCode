import { HttpClient } from '@angular/common/http';
import { GlobalService } from './../../../GlobalService/GlobalService';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistryTableService extends GlobalService{

  constructor(http:HttpClient) { 
    super("http://localhost:8090/libraryregistry/",http);
  }
}
