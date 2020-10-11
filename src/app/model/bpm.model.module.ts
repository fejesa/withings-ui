import { NgModule } from '@angular/core';
import { BpmRepository } from './repository/bpm.repository';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { BpmRestDatasource, REST_URL } from './datasource/bpm.rest.datasource';

@NgModule({
  imports: [HttpClientModule, HttpClientJsonpModule],
  providers: [BpmRepository, BpmRestDatasource,
    { provide: REST_URL, useValue: `http://localhost:3500/heart` }]
})
export class BpmModelModule { }
