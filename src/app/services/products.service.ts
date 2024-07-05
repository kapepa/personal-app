import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { PaginationParamsInt, ProductInt, ProductsResInt } from '../../../types/products-int';
import { environment } from '../../../environment';
import { CreateDto } from '../../dto/create-dto';

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

  createProduct = (body: FormData): Observable<ProductInt> => {
    return this.apiService.post(
      this.apiUrl,
      body,
      {
        responseType: "json"
      }
    );
  }

  updateProduct = (id: string, body: FormData): Observable<ProductInt> => {
    return this.apiService.patch(
      `${this.apiUrl}/${id}`,
      body,
      {
        responseType: "json"
      }
    );
  }

  deleteProduct = (id: string): Observable<boolean> => {
    return this.apiService.delete(
      `${this.apiUrl}/${id}`,
      {
        responseType: "json"
      }
    )
  }
}
