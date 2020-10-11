import {Injectable} from '@angular/core';
import {BpmRestDatasource} from '../datasource/bpm.rest.datasource';
import {WithingsHeart} from '../data/bpm.model';

@Injectable()
export class BpmRepository {

  private records: WithingsHeart[] = new Array<WithingsHeart>();

  constructor(private dataSource: BpmRestDatasource) {
    this.dataSource.getData().subscribe(data => {
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

  getRecords(): WithingsHeart[] {
    return this.records;
  }
}
