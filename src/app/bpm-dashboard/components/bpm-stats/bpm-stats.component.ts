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
    templateUrl: './app-bpm-stats.component.html',
    styleUrls: ['../../containers/bpm-dashboard/app-bpm-dashboard.component.css']
  }
)
export class BpmStatsComponent {

  @Input()
  records: WithingsHeart[];

  private static minimum(a: number, b: number): number {
    if (b <= 0) {
      return a;
    } else {
      return Math.min(a, b);
    }
  }

  private static maximum(a: number, b: number): number {
    if (b <= 0) {
      return a;
    } else {
      return Math.max(a, b);
    }
  }

  getMinSystole(): number {
    if (this.isEmpty()) {
      return;
    }
    return this.records
      .reduce((min, item) => BpmStatsComponent.minimum(min, item.systole), this.records[0].systole);
  }

  getMaxSystole(): number {
    if (this.isEmpty()) {
      return;
    }
    return this.records
      .reduce((min, item) => BpmStatsComponent.maximum(min, item.systole), this.records[0].systole);
  }

  getMinDiastole(): number {
    if (this.isEmpty()) {
      return;
    }
    return this.records
      .reduce((min, item) => BpmStatsComponent.minimum(min, item.diastole), this.records[0].diastole);
  }

  getMaxDiastole(): number {
    if (this.isEmpty()) {
      return;
    }
    return this.records
      .reduce((min, item) => BpmStatsComponent.maximum(min, item.diastole), this.records[0].diastole);
  }

  getSystolicClass(value: number): string {
    if (isOptimalSystolic(value) || isNormalSystolic(value)) {
      return 'col badge badge-pill badge-success result-label';
    }
    if (isHighNormalSystolic(value)) {
      return 'col badge badge-pill badge-warning result-label';
    }
    return 'col badge badge-pill badge-danger result-label';
  }

  getDiastolicClass(value: number): string {
    if (isOptimalDiastolic(value) || isNormalDiastolic(value)) {
      return 'col badge badge-pill badge-success result-label';
    }
    if (isHighNormalDiastolic(value)) {
      return 'col badge badge-pill badge-warning result-label';
    }
    return 'col badge badge-pill badge-danger result-label';
  }

  isEmpty(): boolean {
    return !this.records || this.records.length === 0;
  }
}
