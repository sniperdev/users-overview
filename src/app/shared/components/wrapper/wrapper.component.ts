import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent {
  @Input() width: number = 1200;

  get maxWidth(): string {
    return `${this.width}px`;
  }
}
