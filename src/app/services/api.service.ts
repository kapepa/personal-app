import { HttpClient, HttpContext, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OptionsHttp } from '../../../types/options-http';
import { ProductInt } from '../../../types/products-int';
import { CreateDto } from '../../dto/create-dto';
import { UpdateDto } from '../../dto/update-dto';

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

  post<T>(url: string, body: CreateDto, options: OptionsHttp ): Observable<T> {
    return this.httpClient.post<T>(url, body, options) as Observable<T>;
  }

  patch<T>(url: string, body: UpdateDto, options: OptionsHttp ): Observable<T> {
    return this.httpClient.patch<T>(url, body, options) as Observable<T>;
  }

  delete<T>(url: string, options: OptionsHttp): Observable<T> { 
    return this.httpClient.get<T>(url, options) as Observable<T>;
  }
}
