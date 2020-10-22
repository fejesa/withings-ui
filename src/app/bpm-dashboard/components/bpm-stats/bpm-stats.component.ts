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
    templateUrl: './bpm-stats.component.html',
    styleUrls: ['./bpm-stats.component.css']
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

  private static getStatClass(severity: string): string {
    return `col badge badge-pill badge-${severity} stat-result-label`;
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
      return BpmStatsComponent.getStatClass('success');
    }
    if (isHighNormalSystolic(value)) {
      return BpmStatsComponent.getStatClass('warning');
    }
    return BpmStatsComponent.getStatClass('danger');
  }

  getDiastolicClass(value: number): string {
    if (isOptimalDiastolic(value) || isNormalDiastolic(value)) {
      return BpmStatsComponent.getStatClass('success');
    }
    if (isHighNormalDiastolic(value)) {
      return BpmStatsComponent.getStatClass('warning');
    }

    return BpmStatsComponent.getStatClass('danger');
  }

  isEmpty(): boolean {
    return !this.records || this.records.length === 0;
  }
}
