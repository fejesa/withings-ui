import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BpmEcgComponent} from './components/bpm-ecg/bpm-ecg.component';
import {BpmPeriodComponent} from './components/bpm-period/bpm-period.component';
import {BpmStatsComponent} from './components/bpm-stats/bpm-stats.component';
import {BpmTableComponent} from './components/bpm-table/bpm-table.component';
import {BpmDashboardComponent} from './containers/bpm-dashboard/bpm-dashboard.component';
import {BpmModelModule} from '../model/bpm.model.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {FormsModule} from '@angular/forms';
import {PaginationModule} from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [
    BpmEcgComponent,
    BpmPeriodComponent,
    BpmStatsComponent,
    BpmTableComponent,
    BpmDashboardComponent
  ],
  imports: [
    CommonModule, BpmModelModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    FormsModule
  ],
  exports: [
    BpmDashboardComponent
  ]
})
export class BpmDashboardModule {

}
