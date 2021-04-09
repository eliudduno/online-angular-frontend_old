import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ServiceConfig } from '../config/service-config';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  userData = new BehaviorSubject<UserModel>(new UserModel);

  constructor(
    private http: HttpClient
  ) {
    this.verifyCurrentSession();
  }

  verifyCurrentSession() {
    let currentSession = this.getSessionData();
    if (currentSession) {
      this.setUserData(JSON.parse(currentSession));
    }
  }

  /**
   * Metodo para actualizar los datos del usuario
   * @param user 
   */
  setUserData(user: UserModel) {
    this.userData.next(user);
  }
  /**
   * metodo para obtener el estatus del usuario 
   * @returns 
   */
  getUserData() {
    return this.userData.asObservable();
  }

  /**
   * Metodo para llamar al customer POST en el BACKEND
   * @param customer customer data to save
   * @returns 
   */

  CustomerLogin(user: UserModel): Observable<any> {
    return this.http.post<any>(`${ServiceConfig.BASE_URL}login`, user, {
      headers: new HttpHeaders({})
    });
  }
  /**
   * guarda datos de la sesion
   * @param sessionData  datos de usuario y token
   * @returns 
   */
  saveSessionData(sessionData: any): Boolean {
    let currentSession = localStorage.getItem('session');
    if (currentSession) {
      return false;
    } else {
      let data: UserModel = {
        id: sessionData.data.id,
        customerId: sessionData.data.customerId,
        username: sessionData.data.username,
        role: sessionData.data.role,
        token: sessionData.token,
        isLogged: true
      };
      localStorage.setItem('session', JSON.stringify(data));
      this.setUserData(data);
      return true;
    }
  }
  /**
   * Retorna datos de la sesion actual 
   * @returns 
   */
  getSessionData() {
    let currentSession = localStorage.getItem('session');
    return currentSession;
  }
  getToken(): String {
    let currentSession = JSON.parse(this.getSessionData());
    return currentSession.token;
  }
  /**
   * Cerrar session 
   */
  logout() {
    localStorage.removeItem('session');
    this.setUserData(new UserModel());
  }
}
