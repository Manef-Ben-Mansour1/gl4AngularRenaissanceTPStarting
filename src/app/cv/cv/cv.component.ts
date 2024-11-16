import { Component, inject, Signal, signal, effect } from '@angular/core';
import { Cv } from '../model/cv';
import { LoggerService } from '../../services/logger.service';
import { ToastrService } from 'ngx-toastr';
import { CvService } from '../services/cv.service';
import { ListComponent } from '../list/list.component';
import { CvCardComponent } from '../cv-card/cv-card.component';
import { EmbaucheComponent } from '../embauche/embauche.component';
import { UpperCasePipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css'],
  standalone: true,
  imports: [
    ListComponent,
    CvCardComponent,
    EmbaucheComponent,
    UpperCasePipe,
    DatePipe,
  ],
})
export class CvComponent {
  private logger = inject(LoggerService);
  private toastr = inject(ToastrService);
  private cvService = inject(CvService);

  cvs: Cv[] = [];

  selectedCv = signal<Cv | null>(null);

  date = new Date();

  constructor() {
    this.cvService.getCvs().subscribe({
      next: (cvs) => {
        this.cvs = cvs;
      },
      error: () => {
        this.cvs = this.cvService.getFakeCvs();
        this.toastr.error(`
          Attention!! Les données sont fictives, problème avec le serveur.
          Veuillez contacter l'admin.`);
      },
    });

    this.logger.logger('je suis le cvComponent');

    this.toastr.info('Bienvenu dans notre CvTech');

    // Subscribe to the selected CV using the service's observable
    this.cvService.selectCv$.subscribe((cv) => this.selectedCv.set(cv));

    // Example effect: Log whenever the selected CV changes
    effect(() => {
      const selected = this.selectedCv();
      if (selected) {
        this.logger.logger(`Selected CV: ${selected.id}`);
      }
    });
  }
}
