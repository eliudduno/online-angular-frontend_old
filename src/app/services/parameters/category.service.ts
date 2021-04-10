import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceConfig } from 'src/app/config/service-config';
import { CategoryModel } from 'src/app/models/parameters/category.models';
import { SecurityService } from '../security.service';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  entity = 'category';
  token: String = '';

  constructor(private http: HttpClient, private securityService: SecurityService) {
    this.token = this.securityService.getToken();
  }


  getAllRecords(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(`${ServiceConfig.BASE_URL}${this.entity}`);
  }

  getRecordsById(id: string): Observable<CategoryModel> {
    return this.http.get<CategoryModel>(`${ServiceConfig.BASE_URL}${this.entity}/${id}`);
  }

  /**
   * Agregar nuevo registro a una nueva categoria 
   * @param record 
   * @returns 
   */
  saveNewRecord(record: CategoryModel): Observable<CategoryModel> {
    return this.http.post<CategoryModel>(`${ServiceConfig.BASE_URL}${this.entity}`, record, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: `Bearer ${this.token}`
      })
    });
  }

  EditRecord(record: CategoryModel): Observable<CategoryModel> {
    return this.http.put<CategoryModel>(`${ServiceConfig.BASE_URL}${this.entity}/${record.id}`, record, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    });
  }

  DeleteRecord(recordId: String): Observable<any> {
    return this.http.delete<CategoryModel>(`${ServiceConfig.BASE_URL}${this.entity}/${recordId}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    });
  }
}
