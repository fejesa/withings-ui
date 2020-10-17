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
  templateUrl: './bpm-table.component.html',
  styleUrls: [
    '../../containers/bpm-dashboard/bpm-dashboard.component.css',
    './bpm-table.component.css'
  ]
})
export class BpmTableComponent {

  @Input()
  records: WithingsHeart[];

  getSystolicCellClass(value: number): string {

    if (isOptimalSystolic(value) || isNormalSystolic(value)) {
      return this.getResultCellClass('success');
    }
    if (isHighNormalSystolic(value)) {
      return this.getResultCellClass('warning');
    }
    if (isGradeHypertensionSystolic(value)) {
      return this.getResultCellClass('danger');
    }

    return 'text-center';
  }

  getDiastolicCellClass(value: number): string {
    if (isOptimalDiastolic(value) || isNormalDiastolic(value)) {
      return this.getResultCellClass('success');
    }
    if (isHighNormalDiastolic(value)) {
      return this.getResultCellClass('warning');
    }
    if (isGradeHypertensionDiastolic(value)) {
      return this.getResultCellClass('danger');
    }
    return 'text-center';
  }

  getResultCellClass(severity: string): string {
    return `badge badge-pill badge-${severity} result-label`;
  }

  isValidDate(value: number): boolean {
    return value > 0;
  }

  getMeasureTimeCellClass(value: number): string {
    const d = new Date(value * 1000);
    let daytime: string;
    if (isMorningTime(d)) {
      daytime = 'morning';
    } else if (isMiddayTime(d)) {
      daytime = 'midday';
    } else if (isEveningTime(d)) {
      daytime = 'evening';
    } else {
      daytime = 'bedtime';
    }

    return `badge badge-pill time-label ${daytime}`;
  }

  isEmpty(): boolean {
    return !this.records || this.records.length === 0;
  }
}
