import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceConfig } from 'src/app/config/service-config';
import { ProductModel } from 'src/app/models/products/product.model';
import { SecurityService } from '../security.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  entity = 'product';
  token: String = '';
  filter: String = '?filter={"include":[{"relation":"category"},{"relation":"brand"}]}';

  constructor(private http: HttpClient, private securityService: SecurityService) {
    this.token = this.securityService.getToken();
  }


  getAllRecords(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${ServiceConfig.BASE_URL}${this.entity}/${this.filter}`);
  }

  getRecordsById(id: string): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${ServiceConfig.BASE_URL}${this.entity}/${id}`);
  }

  /**
   * Agregar nuevo registro a una nueva categoria 
   * @param record 
   * @returns 
   */
  saveNewRecord(record: ProductModel): Observable<ProductModel> {
    return this.http.post<ProductModel>(`${ServiceConfig.BASE_URL}${this.entity}`, record, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: `Bearer ${this.token}`
      })
    });
  }

  EditRecord(record: ProductModel): Observable<ProductModel> {
    return this.http.put<ProductModel>(`${ServiceConfig.BASE_URL}${this.entity}/${record.id}`, record, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    });
  }

  DeleteRecord(recordId: String): Observable<any> {
    return this.http.delete<ProductModel>(`${ServiceConfig.BASE_URL}${this.entity}/${recordId}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    });
  }
}
