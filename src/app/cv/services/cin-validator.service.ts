import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { CvService } from './cv.service';

@Injectable({
  providedIn: 'root',
})
export class CinValidatorService {
  constructor(private cvService: CvService) {}

  checkCinUnique(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return of(control.value).pipe(
        distinctUntilChanged(),
        debounceTime(300),
        switchMap((value) =>
          this.cvService.selectByProperty('cin', value).pipe(
            map((cvs) => {
              const isUnique = !(cvs && cvs.length > 0);
              return isUnique ? null : { cinNotUnique: true };
            }),
            catchError((err) => {
              console.error('Error during CIN validation:', err);
              return of(null);
            })
          )
        )
      );
    };
  }

  validateCinAgeCorrelation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const cin = control.get('cin')?.value;
      const age = control.get('age')?.value;
      console.log('triiggeerreeefff');
      if (!cin || !age) {
        return null;
      }

      const firstTwoDigits = parseInt(cin.substring(0, 2), 10);
      if (age >= 60 && (firstTwoDigits < 0 || firstTwoDigits > 19)) {
        return { cinAgeCorrelation: true };
      } else if (age < 60 && firstTwoDigits <= 19) {
        return { cinAgeCorrelation: true };
      }
      return null;
    };
  }
}