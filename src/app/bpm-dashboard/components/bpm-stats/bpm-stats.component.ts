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
    if (!this.records) {
      return;
    }
    return this.records
      .reduce((min, item) => Math.min(min, item.systole), this.records[0].systole);
  }

  getMaxSystole(): number {
    if (!this.records) {
      return;
    }
    return this.records
      .reduce((min, item) => Math.max(min, item.systole), this.records[0].systole);
  }

  getMinDiastole(): number {
    if (!this.records) {
      return;
    }
    return this.records
      .reduce((min, item) => Math.min(min, item.diastole), this.records[0].diastole);
  }

  getMaxDiastole(): number {
    if (!this.records) {
      return;
    }
    return this.records
      .reduce((min, item) => Math.max(min, item.diastole), this.records[0].diastole);
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
}
