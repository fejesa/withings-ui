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
    if (isGradeHypertensionSystolic(value)) {
      return 'text-center bg-danger';
    }

    return 'text-center';
  }

  getDiastolicCellClass(value: number): string {
    if (isOptimalDiastolic(value) || isNormalDiastolic(value)) {
      return 'text-center bg-success';
    }
    if (isHighNormalDiastolic(value)) {
      return 'text-center bg-warning';
    }
    if (isGradeHypertensionDiastolic(value)) {
      return 'text-center bg-danger';
    }
    return 'text-center';
  }

  isValidDate(value: number): boolean {
    return value > 0;
  }
}
