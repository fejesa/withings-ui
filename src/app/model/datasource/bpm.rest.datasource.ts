import { Injectable, Inject, InjectionToken } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {WithingsHeart} from '../data/bpm.model';
import {getDateAsString} from '../../bpm-dashboard/bpm.utils';

export const REST_URL = new InjectionToken('rest_url');

@Injectable()
export class BpmRestDatasource {

  constructor(private http: HttpClient,
              @Inject(REST_URL) private url: string) { }

  getData(period: Date[]): Observable<WithingsHeart[]> {

    const start = getDateAsString(period[0]);
    const end = getDateAsString(period[1]);

    // TODO: set headers
    let myHeaders = new HttpHeaders();
    myHeaders = myHeaders.set('Access-Control-Allow-Origin', '*');
    myHeaders = myHeaders.set('Content-Type', 'application/json');
    myHeaders = myHeaders.set('Accept', 'application/json, */*;q=0.5');

    console.log(`Loading from ${start} - ${end}`);
    return this.http.request<WithingsHeart[]>(
      'GET',
      this.url + `?from=${start}&to=${end}`, {
        headers: myHeaders
      }
      ).pipe(catchError((error: Response) =>
      throwError(`Network Error: ${error.statusText} (${error.status})`)));
  }
}
