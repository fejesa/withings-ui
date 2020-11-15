import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BpmDashboardComponent} from './bpm-dashboard/containers/bpm-dashboard/bpm-dashboard.component';
import {BpmEcgComponent} from './bpm-dashboard/components/bpm-ecg/bpm-ecg.component';
import {BpmChartComponent} from './bpm-dashboard/components/bpm-chart/bpm-chart.component';

const routes: Routes = [
  {path: 'dashboard', component: BpmDashboardComponent},
  {path: 'ecg/:id/:time', component: BpmEcgComponent},
  {path: 'chart', component: BpmChartComponent},
  {path: '**', redirectTo: '/dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
