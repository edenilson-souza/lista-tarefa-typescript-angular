import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomvalidationService {

  decimalValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return { invalidDecimal: false };
      }
      const regex = new RegExp('^\d*[0-9](\.\d*[0-9])?$');
      const valid = regex.test(control.value);
      return valid ? { invalidDecimal: false } : { invalidDecimal: true };
    };
  };

  constructor() { }
}
