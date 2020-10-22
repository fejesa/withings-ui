import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BpmDashboardComponent} from './bpm-dashboard/containers/bpm-dashboard/bpm-dashboard.component';
import {BpmEcgComponent} from './bpm-dashboard/components/bpm-ecg/bpm-ecg.component';

const routes: Routes = [
  {path: 'dashboard', component: BpmDashboardComponent},
  {path: 'ecg/:id/:time', component: BpmEcgComponent},
  {path: '**', redirectTo: '/dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
