import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {WithingsHeartResponse} from '../data/bpm.model';
import {getDateAsString} from '../../bpm-dashboard/bpm.utils';

export const REST_URL = new InjectionToken('rest_url');

@Injectable()
export class BpmRestDatasource {

  constructor(private http: HttpClient,
              @Inject(REST_URL) private url: string) { }

  getData(period: Date[], offset: number, page: number): Observable<WithingsHeartResponse> {

    const start = getDateAsString(period[0]);
    const end = getDateAsString(period[1]);

    let myHeaders = new HttpHeaders();
    myHeaders = myHeaders.set('Access-Control-Allow-Origin', '*');

    console.log(`Loading from ${start} - ${end}`);
    return this.http.request<WithingsHeartResponse>(
      'GET',
      this.url + `?from=${start}&to=${end}&offset=${offset}&page=${page}`, {
        headers: myHeaders
      }
      ).pipe(catchError((error: Response) =>
        throwError(`Network Error: ${error.statusText} (${error.status})`)));
  }
}
