import { Directive, Input, Injectable } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, FormControl, FormGroup } from '@angular/forms';

const ProductNames = ['Pies', 'Kot', 'Mrówka', 'Kleszcz', 'Sarna', 'Komar', 'Bazant', 'Dzik'];

@Directive(
  { selector: '[appValidProductName]', providers: [{ provide: NG_VALIDATORS, useExisting: AppValidProductNameDirective, multi: true }] }
)

export class AppValidProductNameDirective implements Validator {

  validate(control: AbstractControl): { [key: string]: any } | null {
    if (control.value && (ProductNames.indexOf(control.value) < 0)) {
      return { appValidProductName: true }; // return object if the validation is not passed.
    }
    return null; // return null if validation is passed.
  }
}

@Directive(
  { selector: '[appMinValue]', providers: [{ provide: NG_VALIDATORS, useExisting: AppMinValueDirective, multi: true }] }
)

export class AppMinValueDirective implements Validator {
  @Input('appMinValue') minimalValue: string;
  validate(control: AbstractControl): { [key: string]: any } | null {
    if (control.value && control.value < this.minimalValue) {
      return { appMinValue: true }; // return object if the validation is not passed.
    }
    return null; // return null if validation is passed.
  }
}

@Directive(
  { selector: '[appMaxValue]', providers: [{ provide: NG_VALIDATORS, useExisting: AppMaxValueDirective, multi: true }] }
)

export class AppMaxValueDirective implements Validator {
  @Input('appMaxValue') maximumValue: string;
  validate(control: AbstractControl): { [key: string]: any } | null {
    if (control.value && (control.value > this.maximumValue)) {
      return { appMaxValue: true }; // return object if the validation is not passed.
    }
    return null; // return null if validation is passed.
  }
}

@Injectable()
export class LocationValidationService {
  // Name validation
  static locationValidator(control: FormControl) {
    if (control.value) {
      const matches = control.value !== '0'
      return matches ? false : { '!!!select location!!!': true };
    } else {
      return null;
    }
  }
}

@Injectable()
export class TenantValidationService {
  // Name validation
  static tenantValidator(control: FormControl) {
    if (control.value) {
      const matches = control.value !== '0'
      return matches ? false : { '!!!select proper tenant!!!': true };
    } else {
      return null;
    }
  }
}

@Injectable()
export class DatesValidationService {
  // Name validation
  static compareDates(dateFrom: string, dateTo: string) {
    return (formGroup: FormGroup) => {
      const dateFromControl = formGroup.controls[dateFrom];
      const dateToControl = formGroup.controls[dateTo];

      if (!dateFromControl || !dateToControl) {
        return null;
      }

      if (dateToControl.errors && !dateToControl.errors.datesRange) {
        return null;
      }

      if (dateFromControl.value >= dateToControl.value) {
        dateToControl.setErrors({ datesRange: true });
      } else {
        dateToControl.setErrors(null);
      }
    };
  }
}
