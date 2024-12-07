import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: 'input[type="text"][rainbowText]',
  standalone: true
})
export class RainbowTextDirective {
  private colors: string[] = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

  @HostBinding('style.color') textColor=this.colors[0];
  @HostBinding('style.borderColor') borderColor=this.colors[0];

  constructor() {
    this.changeColor();
  }

  @HostListener('keyup') onKeyUp() {
    this.changeColor();
  }

  private changeColor() {
    const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
    this.textColor = randomColor;
    this.borderColor = randomColor;
  }
}
