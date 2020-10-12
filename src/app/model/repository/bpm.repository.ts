import {Injectable} from '@angular/core';
import {BpmRestDatasource} from '../datasource/bpm.rest.datasource';
import {WithingsHeart} from '../data/bpm.model';

@Injectable()
export class BpmRepository {

  private records: WithingsHeart[] = new Array<WithingsHeart>();

  private period: Date[];

  constructor(private dataSource: BpmRestDatasource) {
  }

  getRecords(period: Date[]): WithingsHeart[] {
    if (!this.period || this.period !== period) {

      this.period = period;

      this.dataSource.getData(this.period).subscribe(data => {
          console.log('On next');
          this.records = data;
        },
        error => {
          console.log('Error' + error);
        },
        () => {
          console.log('Complete');
        });
    }
    return this.records;
  }
}
