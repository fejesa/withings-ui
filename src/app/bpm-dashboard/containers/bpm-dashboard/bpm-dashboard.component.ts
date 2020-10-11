import {Component} from '@angular/core';
import {BpmRepository} from '../../../model/repository/bpm.repository';
import {WithingsHeart} from '../../../model/data/bpm.model';

@Component({
  selector: 'app-bpm-dashboard',
  templateUrl: './app-bpm-dashboard.component.html',
  styleUrls: ['./app-bpm-dashboard.css']
})
export class BpmDashboardComponent {

  records: WithingsHeart[];

  constructor(private model: BpmRepository) { }

  getRecords(): WithingsHeart[] {
    return this.model.getRecords();
  }
}
