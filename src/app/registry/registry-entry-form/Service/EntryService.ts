import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './../../../GlobalService/GlobalService';

@Injectable()
export class EntryService extends GlobalService{

    constructor(http:HttpClient){
        super("http://localhost:8090/libraryregistry/",http);
    }

}