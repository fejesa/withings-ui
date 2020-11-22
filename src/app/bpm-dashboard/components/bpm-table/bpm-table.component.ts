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
} from '../../../util/bpm.utils';
import {Router} from '@angular/router';
import {getDateAsString, isEveningTime, isMiddayTime, isMorningTime} from '../../../util/date.util';

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

  @Input()
  period: Date[];

  constructor(private router: Router) {}

  showDiagram(): void {
    this.router.navigate(['chart'], {
      queryParams: {
        from: getDateAsString(this.period[0]),
        to: getDateAsString(this.period[1])
      }
    });
  }

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
    let daytime: string;
    if (isMorningTime(value)) {
      daytime = 'morning';
    } else if (isMiddayTime(value)) {
      daytime = 'midday';
    } else if (isEveningTime(value)) {
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
