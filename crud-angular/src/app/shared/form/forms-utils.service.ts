import { FormGroup, UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormsUtilsService {

  constructor() { }

  validateAllFormFields(formGroup: UntypedFormGroup | UntypedFormArray){
    Object.keys(formGroup.controls).forEach(field =>{
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl){
        control.markAsTouched({onlySelf: true});
      }else if(control instanceof UntypedFormGroup || control instanceof UntypedFormArray){
        control.markAsTouched({onlySelf: true});
        this.validateAllFormFields(control);
      }
    });
  }

  getErrorMessage(formGroup: UntypedFormGroup,fieldName: string){
    const field = formGroup.get(fieldName) as UntypedFormControl;
    return this.getErrorMessageFromField(field);
  }

  getFormArrayFieldErrorMessage(field: UntypedFormControl){

    if(field?.hasError('required')){
      return 'Campo obrigatório';
    }

    if(field?.hasError('minlenght')){
      const requiredLenght: number = field.errors ? field.errors['minlength']['requiredLength']: 5;
      return 'Tamanho minimo precisa ser de ${requiredLenght} caracteres';
  }
   if(field?.hasError('maxlenght')){
      const requiredLenght: number = field.errors ? field.errors['maxlenght']['requiredLength']: 200;
      return 'Tamanho minimo precisa ser de ${requiredLenght} caracteres';
  }

  return 'Campo Inválido'
  }
  getFromArrayFieldErrorMessage(FormGroup: UntypedFormControl, formArrayName: string, fieldName: string, index: number) {
    const formArray = FormGroup.get(formArrayName) as UntypedFormArray;
    const field = formArray.controls[index].get(fieldName) as UntypedFormControl;
    return this.getErrorMessageFromField(field);
  }

  isFormArrayRequired(formGroup: UntypedFormGroup, formArrayName: string){
  const formArray = formGroup.get(formArrayName) as UntypedFormArray;
  return !formArray.valid && formArray.hasError('required') && formArray.touched;
}

  getErrorMessageFromField(field: UntypedFormControl) {
    throw new Error('Method not implemented.');
  }


}
