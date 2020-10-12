import {Component} from '@angular/core';
import {BpmRepository} from '../../../model/repository/bpm.repository';
import {WithingsHeart} from '../../../model/data/bpm.model';
import {getDefaultPeriod} from '../../bpm.utils';

@Component({
  selector: 'app-bpm-dashboard',
  templateUrl: './app-bpm-dashboard.component.html',
  styleUrls: ['./app-bpm-dashboard.css']
})
export class BpmDashboardComponent {

  private period: Date[];

  constructor(private model: BpmRepository) {
    this.period = getDefaultPeriod();
  }

  getRecords(): WithingsHeart[] {
    return this.model.getRecords(this.period);
  }

  handlePeriod(event: Date[]): void {
    this.period = event;
  }
}
