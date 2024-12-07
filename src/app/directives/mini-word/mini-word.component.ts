import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RainbowTextDirective } from '../rainbow-text.directive';

@Component({
    selector: 'app-mini-word',
    templateUrl: './mini-word.component.html',
    styleUrls: ['./mini-word.component.css'],
    standalone: true,
    imports: [NgStyle, FormsModule,RainbowTextDirective],
})
export class MiniWordComponent {
  color = 'red';
  size = 75;
  font = 'garamond';
}
