import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Device} from "./store/domain";

@Component({
  selector: 'app-selected',
  template:`
    <p >Selected Device: {{device?.name || 'no selection'}}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class SelectedComponent {
  @Input() device?: Device;
}
