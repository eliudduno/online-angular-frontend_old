import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsConfig } from 'src/app/config/forms-config';
import { UserModel } from 'src/app/models/user.model';
import { SecurityService } from '../../../services/security.service';
import * as MD5 from 'crypto-js/md5';

declare const showMessage: any;
declare const initSidenav: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  fgValidator!: FormGroup;
  usernameMinLength = FormsConfig.DOCUMENT_MIN_LENGTH;


  constructor(
    private fb: FormBuilder,
    private service: SecurityService,
    private router: Router) { }

  ngOnInit(): void {
    this.FormsBuilding();
  }

  FormsBuilding() {
    this.fgValidator = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(this.usernameMinLength)]],
      password: ['', [Validators.required]]
    });
  }

  /**
   * metodo para validar ñas credenciales  de un usuario
   */
  LoginCustomerFn() {
    if (this.fgValidator.invalid) {
      showMessage('Invalid form..!');
    } else {
      //showMessage('Registering...');
      let model = this.getLoginData();
      console.log(model);
      this.service.CustomerLogin(model).subscribe(
        data => {
          this.service.saveSessionData(data);
          //showMessage('Welcome to your account.');
          //redireccionando luego de logear
          this.router.navigate(['/home']);
        },
        error => {
          showMessage('Invalid data.');
        }
      );
    }
  }

  /**
   * obtiene los datos del usuario en un mmodelo
   * @returns 
   */
  getLoginData(): UserModel {
    let model = new UserModel();
    model.username = this.fgv.username.value;
    model.password = MD5(this.fgv.password.value).toString();
    return model;
  }

  get fgv() {
    return this.fgValidator.controls;
  }
}


