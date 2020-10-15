import {Component, Input} from '@angular/core';
import {WithingsHeart} from '../../../model/data/bpm.model';
import {
  isEveningTime,
  isGradeHypertensionDiastolic,
  isGradeHypertensionSystolic,
  isHighNormalDiastolic,
  isHighNormalSystolic, isMiddayTime, isMorningTime,
  isNormalDiastolic,
  isNormalSystolic,
  isOptimalDiastolic,
  isOptimalSystolic
} from '../../bpm.utils';

@Component({
  selector: 'app-bpm-table',
  templateUrl: './app-bpm-table.component.html',
  styleUrls: [
    '../../containers/bpm-dashboard/app-bpm-dashboard.component.css',
    './app-bpm-table.component.css'
  ]
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

  getMeasureTimeCellClass(value: number): string {
    const d = new Date(value * 1000);
    if (isMorningTime(d)) {
      return 'badge badge-pill badge-success result-label morning';
    }
    if (isMiddayTime(d)) {
      return 'badge badge-pill badge-success result-label midday';
    }
    if (isEveningTime(d)) {
      return 'badge badge-pill badge-success result-label evening';
    }
    return 'badge badge-pill badge-success result-label bedtime';
  }

  isEmpty(): boolean {
    return !this.records || this.records.length === 0;
  }
}
