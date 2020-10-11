import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BpmDashboardModule} from './bpm-dashboard/bpm-dashboard.module';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, CommonModule, BpmDashboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
