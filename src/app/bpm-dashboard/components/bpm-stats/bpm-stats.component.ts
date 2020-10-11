import {Component, Input} from '@angular/core';
import {WithingsHeart} from '../../../model/data/bpm.model';

@Component({
  selector: 'app-bpm-stats',
  templateUrl: './app-bpm-stats.component.html'
  }
)
export class BpmStatsComponent {

  @Input()
  records: WithingsHeart[];
}
