import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { PaginationParamsInt, ProductsResInt } from '../../../types/products-int';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  constructor(
    private apiService: ApiService,
  ) { }

  getProducts = (url: string, params: PaginationParamsInt): Observable<ProductsResInt> => {
    return this.apiService.get(
      url, 
      {
        params,
        responseType: "json"
      }
    );
  }
}
