import {NgModule} from '@angular/core';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {BpmRestDatasource, REST_URL} from './datasource/bpm.rest.datasource';

@NgModule({
  imports: [HttpClientModule, HttpClientJsonpModule],
  providers: [BpmRestDatasource,
    { provide: REST_URL, useValue: `https://97bc55642b3b.ngrok.io` }]
})
export class BpmModelModule { }
