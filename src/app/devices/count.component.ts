import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-count',
  template:`
    <p>{{count}} Devices</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class CountComponent {
  @Input() count?: number | null;
}
