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
    selector: 'app-bpm-stats',
    templateUrl: './app-bpm-stats.component.html'
  }
)
export class BpmStatsComponent {

  @Input()
  records: WithingsHeart[];

  getMinSystole(): number {
    if (this.noRecords()) {
      return;
    }
    return this.records
      .reduce((min, item) => this.min(min, item.systole), this.records[0].systole);
  }

  getMaxSystole(): number {
    if (this.noRecords()) {
      return;
    }
    return this.records
      .reduce((min, item) => this.max(min, item.systole), this.records[0].systole);
  }

  getMinDiastole(): number {
    if (this.noRecords()) {
      return;
    }
    return this.records
      .reduce((min, item) => this.min(min, item.diastole), this.records[0].diastole);
  }

  getMaxDiastole(): number {
    if (this.noRecords()) {
      return;
    }
    return this.records
      .reduce((min, item) => this.max(min, item.diastole), this.records[0].diastole);
  }

  getSystolicClass(value: number): string {
    if (isOptimalSystolic(value) || isNormalSystolic(value)) {
      return 'col badge badge-pill badge-success';
    }
    if (isHighNormalSystolic(value)) {
      return 'col badge badge-pill badge-warning';
    }
    return 'col badge badge-pill badge-danger';
  }

  getDiastolicClass(value: number): string {
    if (isOptimalDiastolic(value) || isNormalDiastolic(value)) {
      return 'col badge badge-pill badge-success';
    }
    if (isHighNormalDiastolic(value)) {
      return 'col badge badge-pill badge-warning';
    }
    return 'col badge badge-pill badge-danger';
  }

  private noRecords(): boolean {
    return !this.records || this.records.length === 0;
  }

  private min(a: number, b: number): number {
    if (b <= 0) {
      return a;
    } else {
      return Math.min(a, b);
    }
  }

  private max(a: number, b: number): number {
    if (b <= 0) {
      return a;
    } else {
      return Math.max(a, b);
    }
  }
}
