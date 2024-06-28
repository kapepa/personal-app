import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { PaginationParamsInt, ProductsResInt } from '../../../types/products-int';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  private apiUrl = `${environment.apiUrl}/product`;

  constructor(
    private apiService: ApiService,
  ) { }

  getProducts = (params: PaginationParamsInt): Observable<ProductsResInt> => {
    return this.apiService.get(
      this.apiUrl,
      {
        params,
        responseType: "json"
      }
    );
  }
}
