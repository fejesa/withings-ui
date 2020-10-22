import {Component} from '@angular/core';
import {BpmRepository} from '../../../model/repository/bpm.repository';
import {WithingsHeart, WithingsHeartResponse} from '../../../model/data/bpm.model';
import {getDefaultPeriod, getDifferenceInHours} from '../../bpm.utils';

@Component({
  selector: 'app-bpm-dashboard',
  templateUrl: './bpm-dashboard.component.html',
  styleUrls: ['./bpm-dashboard.component.css']
})
export class BpmDashboardComponent {

  private MAX_ROW_PER_PAGE = 100;

  private period: Date[];
  private maxItems = 1000;
  private offset = 0;

  pageNumber = 1;

  constructor(private repository: BpmRepository) {
    this.period = getDefaultPeriod();
  }

  getMaxRowNumber(): number {
    return this.MAX_ROW_PER_PAGE;
  }

  maxItemNumber(): number {
    return this.maxItems;
  }

  getRecords(): WithingsHeart[] {
    const result: WithingsHeartResponse = this.repository.getHeartRecords(this.period, this.offset, this.pageNumber);
    this.offset = result.offset;
    return this.insertGapRecords(result.hearts);
  }

  handlePeriod(event: Date[]): void {
    this.period = event;
  }

  private insertGapRecords(records: WithingsHeart[]): WithingsHeart[] {
    const result: WithingsHeart[] = [];
    if (!records) {
      return  result;
    }

    for (let i = 0; i < records.length; i++) {
      const cur = records[i];
      const next = i !== records.length - 1 ? records[i + 1] : null;
      const rec = this.createGapRecord(cur, next);
      rec.forEach((r) => result.push(r));
    }

    return result;
  }

  private createGapRecord(cur: WithingsHeart, next: WithingsHeart): WithingsHeart[] {
    if (!next) {
      return [cur];
    }
    const hours = getDifferenceInHours(cur.timestamp, next.timestamp);
    if (hours > 24) {
      return [cur, new WithingsHeart(0, 0, 0, '', -1, -1, Math.floor(hours / 24))];
    }
    return [cur];
  }

  pageChanged(event: any): void {
    this.getRecords();
  }
}
