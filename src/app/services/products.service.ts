import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
} from '../models/product.model';
import { retry, catchError, map } from 'rxjs/operators';
import { throwError, zip } from 'rxjs';

import { environment } from './../../environments/environmet';
import { checkTime } from '../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = `${environment.API_URL}/api`;

  constructor(private http: HttpClient) {}

  getByCategory(categoryId: string, limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset != null) {
      params = params.set('limit', limit);
      params = params.set('offset', limit);
    }
    return this.http.get<Product[]>(
      `${this.apiUrl}/categories/${categoryId}/products`,
      { params }
    );
  }

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', limit);
    }
    return this.http
      .get<Product[]>(`${this.apiUrl}/products`, {
        params,
        context: checkTime(),
      })
      .pipe(
        retry(3),
        map((products) =>
          products.map((item) => {
            return {
              ...item,
              taxes: 0.19 * item.price,
            };
          })
        )
      );
  }

  fetchReadAndUpdate(id: string, dto: UpdateProductDTO) {
    return zip(this.getProduct(id), this.update(id, dto));
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          return throwError('Algo esta fallando en el servidor');
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError('El producto no existe');
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError('No estas permitido');
        }
        return throwError('Ups algo salio mal');
      })
    );
  }

  // getProductsByPage(limit: number, offset: number) {
  //   return this.http.get<Product[]>(`${this.apiUrl}`, {
  //     params: { limit, offset },
  //   });
  // }

  create(dto: CreateProductDTO) {
    return this.http.post<Product>(`${this.apiUrl}/products`, dto);
  }

  update(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, dto);
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/products/${id}`);
  }
}
