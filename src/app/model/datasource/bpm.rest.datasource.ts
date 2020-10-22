import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {WithingsHeartResponse, WithingsSignal} from '../data/bpm.model';
import {getDateAsString} from '../../bpm-dashboard/bpm.utils';

export const REST_URL = new InjectionToken('rest_url');

@Injectable()
export class BpmRestDatasource {

  constructor(private http: HttpClient,
              @Inject(REST_URL) private url: string) { }

  getHeartRecords(period: Date[], offset: number, page: number): Observable<WithingsHeartResponse> {

    const start = getDateAsString(period[0]);
    const end = getDateAsString(period[1]);

    console.log(`Loading from ${start} - ${end}`);
    return this.http.request<WithingsHeartResponse>(
      'GET',
      this.url + `/heart?from=${start}&to=${end}&offset=${offset}&page=${page}`, {
        headers: this.createRequestHeaders()
      }
      ).pipe(catchError((error: Response) =>
        throwError(`Network Error: ${error.statusText} (${error.status})`)));
  }

  getSignal(signalId: number): Observable<WithingsSignal> {
    console.log(`Loading signal ${signalId}`);

    return this.http.request<WithingsSignal>(
      'GET',
      this.url + `/ecg?signalid=${signalId}`, {
        headers: this.createRequestHeaders()
      }
    ).pipe(catchError((error: Response) =>
      throwError(`Network Error: ${error.statusText} (${error.status})`)));
  }

  private createRequestHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Access-Control-Allow-Origin', '*');
    return headers;
  }
}
