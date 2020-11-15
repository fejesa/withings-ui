import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {WithingsBloodPressure, WithingsHeartResponse, WithingsSignal} from '../data/bpm.model';
import {getDateAsString} from '../../bpm-dashboard/bpm.utils';

export const REST_URL = new InjectionToken('rest_url');

@Injectable()
export class BpmRestDatasource {

  constructor(private http: HttpClient,
              @Inject(REST_URL) private url: string) { }

  getBloodPressures(period: Date[]): Observable<WithingsBloodPressure[]> {
    const start = getDateAsString(period[0]);
    const end = getDateAsString(period[1]);
    console.log(`Loading blood pressure records from ${start} - ${end}`);
    return this.http.request<WithingsBloodPressure[]>(
      'GET',
      this.url + `/bp?from=${start}&to=${end}`, {
        headers: this.createRequestHeaders()
      }
    ).pipe(catchError((error: Response) =>
      throwError(`Network Error: ${error.statusText} (${error.status})`)));
  }

  getHeartRecords(period: Date[], offset: number, page: number): Observable<WithingsHeartResponse> {

    const start = getDateAsString(period[0]);
    const end = getDateAsString(period[1]);

    console.log(`Loading heart records from ${start} - ${end}`);
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
