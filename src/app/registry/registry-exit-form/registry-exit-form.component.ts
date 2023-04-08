import { Exit } from './../../Model/ExitModel';
import { PersonnelType } from './../../Model/PersonnelType';
import { Entry } from './../../Model/EntryModel';
import { ExitService } from './Service/exit.service';
import { EmailValidator } from './../registry-entry-form/Validators/EmailValidator';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-registry-exit-form',
  templateUrl: './registry-exit-form.component.html',
  styleUrls: ['./registry-exit-form.component.css']
})
export class RegistryExitFormComponent {

  canShowMessage:boolean=false;
  isSuccess:boolean=false;
  private messageTimeOut:NodeJS.Timeout;
  private successTimeOut: NodeJS.Timeout;

  constructor(private router:Router,private route:ActivatedRoute,private fb:FormBuilder,private service:ExitService){

  }

  registryExitForm=this.fb.group({
    name:['',[Validators.required,Validators.minLength(2),Validators.maxLength(30)]],
    email:['',[Validators.required,EmailValidator.validateEmail]],
    identityNo:['',[Validators.required,Validators.pattern(/^[0-9]{6}$/)]],
    role:['',[Validators.required]]
  });

  get name(){
    return this.registryExitForm.controls['name'];
  }

  get email(){
    return this.registryExitForm.controls['email'];
  }

  get identityNo(){
    return this.registryExitForm.controls['identityNo'];
  }

  get role(){
    return this.registryExitForm.controls['role'];
  }

  ngOnInit(){
  }

  async onSubmit(name:HTMLInputElement,email:HTMLInputElement,identityNo:HTMLInputElement,role:HTMLSelectElement){
    let exit:Exit={
      personnelName:name.value,
      personnelEmail:email.value,
      personnelIdentityNo:Number.parseInt(identityNo.value),
      personnelType:role.value=="STUDENT"?PersonnelType.STUDENT:PersonnelType.EMPLOYEE
    }

    try{
      await this.service.put<Exit>("markexit",exit).toPromise().then(
        (exitResponse)=>{
          this.isSuccess=true;
          this.canShowMessage=true
          this.successTimeOut=setTimeout(()=>{
            this.isSuccess=false
            this.canShowMessage=false
          },3500);
        }
      )
    }
    catch(error){
      if(error=="208"){
        this.registryExitForm.setErrors({
          exitAlreadyMarked:true
        });
        this.canShowMessage=true;
        this.messageTimeOut=setTimeout(()=>{
          this.canShowMessage=false;
        },3500);
      }
      else if(error=="424"){
        this.registryExitForm.setErrors({
          entryNotMarkedYet:true
        });
        this.canShowMessage=true;
        this.messageTimeOut=setTimeout(()=>{
          this.canShowMessage=false;
        },3500);
      }
      else if(error=="500"){
        this.registryExitForm.setErrors({
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
