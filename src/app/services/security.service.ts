import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ServiceConfig } from '../config/service-config';
import { ChangePasswordModel } from '../models/security/change-password.model';
import { PasswordResetModel } from '../models/security/password-reset.model';
import { UserModel } from '../models/security/user.model';

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
  PasswordReset(data: PasswordResetModel): Observable<any> {
    return this.http.post<any>(`${ServiceConfig.BASE_URL}password-reset`, data, {
      headers: new HttpHeaders({})
    });
  }
  ChangePassword(data: ChangePasswordModel): Observable<any> {
    return this.http.post<any>(`${ServiceConfig.BASE_URL}change-password`, data, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`
      })
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
      console.log("Sessión Data")
      console.log(sessionData);

      let data: UserModel = {
        id: sessionData.data.id,
        customerId: sessionData.data.customerId,
        username: sessionData.data.username,
        role: sessionData.data.role,
        token: sessionData.token,
        isLogged: true,
        //cartId: sessionData.data.cartId
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
    // console.log(localStorage.getItem('session'));

    let currentSession = localStorage.getItem('session');
    console.log(currentSession);

    return currentSession;
  }

  sessionExist(): Boolean {
    let currentSession = this.getSessionData;
    return (currentSession) ? true : false;
  }
  /**
   * verificar si un usuario tiene una parametro en la sesion
   * @param roleId role id para verficar
   * @returns 
   */
  VerifyRolInSesion(roleId): Boolean {
    let currentSession = JSON.parse(this.getSessionData());
    return (currentSession.role == roleId);
  }

  getToken(): String {
    let currentSession = JSON.parse(this.getSessionData());
    return currentSession.token;
  }
  getUserId(): String {
    let currentSession = JSON.parse(this.getSessionData());
    return currentSession.id;
  }
  /**
   * Cerrar session 
   */
  logout() {
    localStorage.removeItem('session');
    this.setUserData(new UserModel());
  }
}
