import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import {ModelModule} from './model/model.module';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent
  ],
  imports: [
    BrowserModule, ModelModule
  ],
  providers: [],
  bootstrap: [TableComponent]
})
export class AppModule { }
