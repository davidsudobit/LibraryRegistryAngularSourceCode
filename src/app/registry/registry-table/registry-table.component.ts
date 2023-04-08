import { RegistryTableService } from './Service/registry-table.service';
import { EntryAndExit } from './../../Model/EntryAndExitModel';
import { Component } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-registry-table',
  templateUrl: './registry-table.component.html',
  styleUrls: ['./registry-table.component.css']
})
export class RegistryTableComponent {

  canShowMessage:boolean=false;
  messageTimeOut:NodeJS.Timeout;
  entryData:EntryAndExit[]|undefined=[];

  constructor(private service:RegistryTableService){

  }

  async ngOnInit(){

    try{
      await this.service.getAll<EntryAndExit>("getallentryandexitrecords").pipe(
        map(
          (entryData)=>{
            let entryDataForReturn:EntryAndExit[]=entryData;
            return entryDataForReturn;
          }
        )
      ).toPromise().then(
        (entryDataResponse)=>{
          this.entryData=entryDataResponse;
        }
      )
    }
    catch(error){
      if(error=="500"){
        this.canShowMessage=true;
        this.messageTimeOut=setTimeout(()=>{
          this.canShowMessage=false;
        },3500);
      }
    }
  }

  ngOnDestroy(){
    clearTimeout(this.messageTimeOut);
  }

}
