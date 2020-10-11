import {Component, Input} from '@angular/core';
import {WithingsHeart} from '../../../model/data/bpm.model';

@Component({
  selector: 'app-bpm-table',
  templateUrl: './app-bpm-table.component.html'
})
export class BpmTableComponent {

  @Input()
  records: WithingsHeart[];
}
