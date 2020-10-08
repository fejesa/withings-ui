import { Component } from '@angular/core';
import {WithingsHeart} from '../model/withings.model';
import {Model} from '../model/repository.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  constructor(private model: Model) { }

  getResults(): WithingsHeart[] {
    return this.model.getResults();
  }
}
