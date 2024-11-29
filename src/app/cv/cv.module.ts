import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCvComponent } from './add-cv/add-cv.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { CvComponent } from './cv/cv.component';
import { CvCardComponent } from './cv-card/cv-card.component';
import { DetailsCvComponent } from './details-cv/details-cv.component';
import { EmbaucheComponent } from './embauche/embauche.component';
import { ItemComponent } from './item/item.component';
import { ListComponent } from './list/list.component';
import { DefaultImagePipe } from './pipes/default-image.pipe';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CvDetailResolver } from './details-cv/details-cv-resolver.service';

const routes: Routes = [
  { path: '', component: CvComponent },
  { path: 'add', component: AddCvComponent, canActivate: [AuthGuard] },
  { path: ':id', component: DetailsCvComponent, resolve: {cv: CvDetailResolver} },
];


@NgModule({
  declarations: [
    DefaultImagePipe,
    AddCvComponent,
    AutocompleteComponent,
    CvComponent,
    CvCardComponent,
    DetailsCvComponent,
    EmbaucheComponent,
    ItemComponent,
    ListComponent,   
],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class CvModule { }
