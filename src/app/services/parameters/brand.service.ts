import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceConfig } from 'src/app/config/service-config';
import { BrandModel } from 'src/app/models/parameters/brand.models';
import { SecurityService } from '../security.service';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  entity = 'brand';
  token: String = '';

  constructor(private http: HttpClient, private securityService: SecurityService) {
    this.token = this.securityService.getToken();
  }


  getAllRecords(): Observable<BrandModel[]> {
    return this.http.get<BrandModel[]>(`${ServiceConfig.BASE_URL}${this.entity}`);
  }

  getRecordsById(id: string): Observable<BrandModel> {
    return this.http.get<BrandModel>(`${ServiceConfig.BASE_URL}${this.entity}/${id}`);
  }

  /**
   * Agregar nuevo registro a una nueva categoria 
   * @param record 
   * @returns 
   */
  saveNewRecord(record: BrandModel): Observable<BrandModel> {
    return this.http.post<BrandModel>(`${ServiceConfig.BASE_URL}${this.entity}`, record, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: `Bearer ${this.token}`
      })
    });
  }

  EditRecord(record: BrandModel): Observable<BrandModel> {
    return this.http.put<BrandModel>(`${ServiceConfig.BASE_URL}${this.entity}/${record.id}`, record, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    });
  }

  DeleteRecord(recordId: String): Observable<any> {
    return this.http.delete<BrandModel>(`${ServiceConfig.BASE_URL}${this.entity}/${recordId}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    });
  }
}
