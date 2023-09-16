import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-sort',
  template:`
    <input type="checkbox" [checked]="isSorted" (click)="sort()"> Sort
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortComponent {
  @Input() isSorted: boolean = false;
  @Output() onSort = new EventEmitter<boolean>();

  sort() {
    this.onSort.emit(!this.isSorted);
  }
}
