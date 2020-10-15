import {Component} from '@angular/core';
import {BpmRepository} from '../../../model/repository/bpm.repository';
import {WithingsHeart} from '../../../model/data/bpm.model';
import {getDefaultPeriod, getDifferenceInHours} from '../../bpm.utils';

@Component({
  selector: 'app-bpm-dashboard',
  templateUrl: './app-bpm-dashboard.component.html',
  styleUrls: ['./app-bpm-dashboard.component.css']
})
export class BpmDashboardComponent {

  private period: Date[];

  constructor(private model: BpmRepository) {
    this.period = getDefaultPeriod();
  }

  getRecords(): WithingsHeart[] {
    return this.insertGapRecords(this.model.getRecords(this.period));
  }

  handlePeriod(event: Date[]): void {
    this.period = event;
  }

  private insertGapRecords(records: WithingsHeart[]): WithingsHeart[] {
    const result: WithingsHeart[] = [];

    for (let i = 0; i < records.length - 1; i++) {
      const cur = records[i];
      const next = records[i + 1];
      this.createGapRecord(cur, next).forEach((r) => result.push(r));
    }

    return result;
  }

  private createGapRecord(cur: WithingsHeart, next: WithingsHeart): WithingsHeart[] {
    const d1 = new Date(cur.timestamp * 1000);
    const d2 = new Date(next.timestamp * 1000);
    const hours = getDifferenceInHours(d1, d2);
    if (hours > 24) {
      return [cur, new WithingsHeart(0, 0, 0, '', -1, -1, Math.floor(hours / 24))];
    }
    return [cur];
  }
}
