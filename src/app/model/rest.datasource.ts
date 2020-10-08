import { Injectable, Inject, InjectionToken } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {WithingsHeart} from './withings.model';

export const REST_URL = new InjectionToken('rest_url');

@Injectable()
export class RestDataSource {

  constructor(private http: HttpClient,
              @Inject(REST_URL) private url: string) { }

  getData(): Observable<WithingsHeart[]> {

    let myHeaders = new HttpHeaders();
    myHeaders = myHeaders.set('Access-Control-Allow-Origin', '*');
    myHeaders = myHeaders.set('Content-Type', 'application/json');
    myHeaders = myHeaders.set('Accept', 'application/json, */*;q=0.5');

    console.log('Loading');
    return this.http.request<WithingsHeart[]>(
      'GET',
      this.url + '?from=2020-06-12&to=2020-08-12', {
        headers: myHeaders
      }
      ).pipe(catchError((error: Response) =>
      throwError(`Network Error: ${error.statusText} (${error.status})`)));
  }
}
