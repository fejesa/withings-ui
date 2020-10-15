import {Component, Input} from '@angular/core';
import {WithingsHeart} from '../../../model/data/bpm.model';
import {
  isGradeHypertensionDiastolic,
  isGradeHypertensionSystolic,
  isHighNormalDiastolic,
  isHighNormalSystolic,
  isNormalDiastolic,
  isNormalSystolic,
  isOptimalDiastolic,
  isOptimalSystolic
} from '../../bpm.utils';

@Component({
  selector: 'app-bpm-table',
  templateUrl: './app-bpm-table.component.html',
  styleUrls: ['../../containers/bpm-dashboard/app-bpm-dashboard.component.css']
})
export class BpmTableComponent {

  @Input()
  records: WithingsHeart[];

  getSystolicCellClass(value: number): string {
    if (isOptimalSystolic(value) || isNormalSystolic(value)) {
      return 'badge badge-pill badge-success result-label';
    }
    if (isHighNormalSystolic(value)) {
      return 'badge badge-pill badge-warning result-label';
    }
    if (isGradeHypertensionSystolic(value)) {
      return 'badge badge-pill badge-danger result-label';
    }

    return 'text-center';
  }

  getDiastolicCellClass(value: number): string {
    if (isOptimalDiastolic(value) || isNormalDiastolic(value)) {
      return 'badge badge-pill badge-success result-label';
    }
    if (isHighNormalDiastolic(value)) {
      return 'badge badge-pill badge-warning result-label';
    }
    if (isGradeHypertensionDiastolic(value)) {
      return 'badge badge-pill badge-danger result-label';
    }
    return 'text-center';
  }

  isValidDate(value: number): boolean {
    return value > 0;
  }
}
