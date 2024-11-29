import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { CvService } from '../services/cv.service';
import { Cv } from '../model/cv';

@Injectable({
  providedIn: 'root'
})
export class CvResolver implements Resolve<Cv[] | null> {
  constructor(private cvService: CvService) {}

  resolve(): Observable<Cv[] | null> {
    return this.cvService.getCvs().pipe(
      catchError(() => {
        return of(null);
      })
    );;
  }
}