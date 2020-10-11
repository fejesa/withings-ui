import {Component, Input} from '@angular/core';
import {WithingsHeart} from '../../../model/data/bpm.model';
import {
  isHighNormalDiastolic,
  isHighNormalSystolic,
  isNormalDiastolic,
  isNormalSystolic,
  isOptimalDiastolic,
  isOptimalSystolic
} from '../../bpm.utils';

@Component({
  selector: 'app-bpm-table',
  templateUrl: './app-bpm-table.component.html'
})
export class BpmTableComponent {

  @Input()
  records: WithingsHeart[];

  getSystolicCellClass(value: number): string {
    if (isOptimalSystolic(value) || isNormalSystolic(value)) {
      return 'text-center bg-success';
    }
    if (isHighNormalSystolic(value)) {
      return 'text-center bg-warning';
    }
    return 'text-center bg-danger';
  }

  getDiastolicCellClass(value: number): string {
    if (isOptimalDiastolic(value) || isNormalDiastolic(value)) {
      return 'text-center bg-success';
    }
    if (isHighNormalDiastolic(value)) {
      return 'text-center bg-warning';
    }
    return 'text-center bg-danger';
  }
}
