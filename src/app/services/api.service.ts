import { HttpClient, HttpContext, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OptionsHttp } from '../../../types/options-http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  get<T>(url: string, options: OptionsHttp ): Observable<T> {
    return this.httpClient.get<T>(url, options) as Observable<T>;
  }
}
