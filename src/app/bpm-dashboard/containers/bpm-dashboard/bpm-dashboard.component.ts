import {Component, DoCheck} from '@angular/core';
import {WithingsHeart} from '../../../model/data/bpm.model';
import {getDefaultPeriod, getDifferenceInHours} from '../../bpm.utils';
import {BpmRestDatasource} from '../../../model/datasource/bpm.rest.datasource';

@Component({
  selector: 'app-bpm-dashboard',
  templateUrl: './bpm-dashboard.component.html',
  styleUrls: ['./bpm-dashboard.component.css']
})
export class BpmDashboardComponent implements DoCheck {

  private MAX_ROW_PER_PAGE = 100;

  private period: Date[];
  private offset = 0;
  private hearts: WithingsHeart[];

  pageNumber = 1;

  private state = {
    period: getDefaultPeriod(),
    offset: this.offset,
    pageNumber: this.pageNumber
  };

  constructor(private dataSource: BpmRestDatasource) {
    this.period = getDefaultPeriod();
  }

  getMaxRowNumber(): number {
    return this.MAX_ROW_PER_PAGE;
  }

  maxItemNumber(): number {
    return 1000;
  }

  ngDoCheck(): void {
    if (this.isChanged()) {
      this.updateState();
      this.dataSource
        .getHeartRecords(this.period, this.offset, this.pageNumber)
        .subscribe(data => {
          this.offset = data.offset;
          this.hearts = this.insertGapRecords(data.hearts);
        });
    }
  }

  getRecords(): WithingsHeart[] {
    return this.hearts;
  }

  handlePeriod(event: Date[]): void {
    this.period = event;
  }

  pageChanged(event: any): void {
    this.getRecords();
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

  private isChanged(): boolean {
    return (!this.state.period || this.state.period !== this.period)
      || (this.state.offset !== this.offset && this.state.pageNumber !== this.pageNumber);
  }

  private updateState(): void {
    this.state.pageNumber = this.pageNumber;
    this.state.period = this.period;
    this.state.offset = this.offset;
  }
}
