import {Component, EventEmitter, Output} from '@angular/core';
import {getDefaultPeriod} from '../../../util/date.util';

@Component({
  selector: 'app-bpm-period',
  templateUrl: './bpm-period.component.html'
})
export class BpmPeriodComponent {

  rangeValues: Date[];

  @Output()
  selectPeriod: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.rangeValues = getDefaultPeriod();
  }

  handlePeriodSelection(): void {
    this.selectPeriod.emit(this.rangeValues);
  }
}
