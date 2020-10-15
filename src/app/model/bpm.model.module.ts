import { NgModule } from '@angular/core';
import { BpmRepository } from './repository/bpm.repository';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { BpmRestDatasource, REST_URL } from './datasource/bpm.rest.datasource';

@NgModule({
  imports: [HttpClientModule, HttpClientJsonpModule],
  providers: [BpmRepository, BpmRestDatasource,
    { provide: REST_URL, useValue: `http://0539ad4a7120.ngrok.io/heart` }]
})
export class BpmModelModule { }
