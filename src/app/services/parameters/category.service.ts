import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceConfig } from 'src/app/config/service-config';
import { CategoyModel } from 'src/app/models/parameters/category.models';
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


  getAllRecords(): Observable<CategoyModel[]> {
    return this.http.get<CategoyModel[]>(`${ServiceConfig.BASE_URL}${this.entity}`);
  }

  /**
   * Agregar nuevo registro a una nueva categoria 
   * @param record 
   * @returns 
   */
  saveNewRecord(record: CategoyModel): Observable<CategoyModel> {
    return this.http.post<CategoyModel>(`${ServiceConfig.BASE_URL}${this.entity}`, record, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    });
  }

  EditRecord(record: CategoyModel): Observable<CategoyModel> {
    return this.http.put<CategoyModel>(`${ServiceConfig.BASE_URL}${this.entity}`, record, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    });
  }

  DeleteRecord(recordId: String): Observable<any> {
    return this.http.delete<CategoyModel>(`${ServiceConfig.BASE_URL}${this.entity}/${recordId}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    });
  }
}
