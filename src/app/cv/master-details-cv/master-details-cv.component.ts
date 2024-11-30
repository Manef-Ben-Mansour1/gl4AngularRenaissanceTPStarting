import { Component, OnInit } from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'
import { CvService } from '../services/cv.service';
import { Cv } from '../model/cv';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError, Observable, of, pipe, switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { APP_ROUTES } from 'src/config/routes.config';
@Component({
  selector: 'app-master-details-cv',
  templateUrl: './master-details-cv.component.html',
  styleUrls: ['./master-details-cv.component.css'],
})
export class MasterDetailsCvComponent implements OnInit {
  cvs$: Observable<Cv[]>;
  constructor(
    private cvService: CvService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.cvs$ = this.cvService.getCvs().pipe(
      catchError((error) => {
        this.toastr.error(
          "Attention!! Les données sont fictives, problème avec le serveur. Veuillez contacter l'admin."
        );
        return of(this.cvService.getFakeCvs());
      })
    );
    cvService.selectCv$
    .pipe(
      takeUntilDestroyed()
    )
    .subscribe((cv) => {
      this.goToCvDetails(cv)
    })
  }
  ngOnInit() {}
  goToCvDetails(cv: Cv) {
    this.router.navigate([cv.id], { relativeTo: this.route });
  }
}
