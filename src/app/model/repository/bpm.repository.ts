import {Injectable} from '@angular/core';
import {BpmRestDatasource} from '../datasource/bpm.rest.datasource';
import {WithingsHeartResponse} from '../data/bpm.model';

@Injectable()
export class BpmRepository {

  private hearts: WithingsHeartResponse = new WithingsHeartResponse([], 0, 0, 0);

  private period: Date[];
  private offset: number;
  private page: number;

  constructor(private dataSource: BpmRestDatasource) {
  }

  getHeartRecords(period: Date[], offset: number, page: number): WithingsHeartResponse {
    // TODO: use Observable
    if ((!this.period || this.period !== period) || (this.offset !== offset && this.page !== page)) {

      this.period = period;
      this.offset = offset;
      this.page = page;

      this.dataSource.getHeartRecords(period, offset, page).subscribe(data => {
          this.hearts = data;
          console.log('List size:' + this.hearts.hearts.length);
        });
    }
    return this.hearts;
  }
}
