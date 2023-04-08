import { HttpErrorResponse } from '@angular/common/http';
import { PersonnelType } from './../../Model/PersonnelType';
import { EntryService } from './Service/EntryService';
import { EmailValidator } from './Validators/EmailValidator';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Entry } from 'src/app/Model/EntryModel';

@Component({
  selector: 'app-registry-form',
  templateUrl: './registry-entry-form.component.html',
  styleUrls: ['./registry-entry-form.component.css']
})
export class RegistryEntryFormComponent {

  canShowMessage:boolean=false;
  isSuccess:boolean=false;
  private messageTimeOut:NodeJS.Timeout;
  private successTimeOut: NodeJS.Timeout;

  constructor(private router:Router,private route:ActivatedRoute,private fb:FormBuilder,private service:EntryService){

  }

  registryEntryForm=this.fb.group({
    name:['',[Validators.required,Validators.minLength(2),Validators.maxLength(30)]],
    email:['',[Validators.required,EmailValidator.validateEmail]],
    identityNo:['',[Validators.required,Validators.pattern(/^[0-9]{6}$/)]],
    role:['',[Validators.required]]
  });

  get name(){
    return this.registryEntryForm.controls['name'];
  }

  get email(){
    return this.registryEntryForm.controls['email'];
  }

  get identityNo(){
    return this.registryEntryForm.controls['identityNo'];
  }

  get role(){
    return this.registryEntryForm.controls['role'];
  }

  ngOnInit(){
  }

  async onSubmit(name:HTMLInputElement,email:HTMLInputElement,identityNo:HTMLInputElement,role:HTMLSelectElement){
    let entry:Entry={
      personnelName:name.value,
      personnelEmail:email.value,
      personnelIdentityNo:Number.parseInt(identityNo.value),
      personnelType:role.value=="STUDENT"?PersonnelType.STUDENT:PersonnelType.EMPLOYEE
    }

    try{
      await this.service.post<Entry>("markentry",entry).toPromise().then(
        (entryResponse)=>{
          this.isSuccess=true;
          this.canShowMessage=true
          this.successTimeOut=setTimeout(()=>{
            this.isSuccess=false
            this.canShowMessage=false
          },3500);
        }
      );
    }
    catch(error){
      if(error=="208"){
        this.registryEntryForm.setErrors({
          entryAlreadyMarked:true
        });
        this.canShowMessage=true;
        this.messageTimeOut=setTimeout(()=>{
          this.canShowMessage=false;
        },3500);
      }
      else if(error=="500"){
        this.registryEntryForm.setErrors({
          unknownError:true
        });
        this.canShowMessage=true;
        this.messageTimeOut=setTimeout(()=>{
          this.canShowMessage=false;
        },3500);
      }
    }

  }

  ngOnDestroy(){
    clearTimeout(this.messageTimeOut);
    clearTimeout(this.successTimeOut);
  } 

}
