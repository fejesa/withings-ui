import {Injectable} from '@angular/core';
import {RestDataSource} from './rest.datasource';
import {WithingsHeart} from './withings.model';

@Injectable()
export class Model {

  private results: WithingsHeart[] = new Array<WithingsHeart>();

  constructor(private dataSource: RestDataSource) {
    this.dataSource.getData().subscribe(data => {
        console.log('On next');
        this.results = data;
      },
      error => {
        console.log('Error' + error);
      },
      () => {
        console.log('Complete');
      });
  }

  getResults(): WithingsHeart[] {
    return this.results;
  }
}
