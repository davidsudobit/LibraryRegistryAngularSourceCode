import { FormControl, ValidationErrors } from "@angular/forms";

export class EmailValidator{

    static validateEmail(emailControl:FormControl):ValidationErrors|null{
        
        let email:string=emailControl.value;

        if(!email) return null;

        if(!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
            return {
                emailValidationError:true
            }
        }
        
        return null;

    }

}