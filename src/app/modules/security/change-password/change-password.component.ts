import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';
import { ChangePasswordModel } from '../../../models/security/change-password.model'
import * as MD5 from 'crypto-js/md5';

declare const showMessage: any;


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  fgValidator!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private service: SecurityService,
    private router: Router) { }

  ngOnInit(): void {
    this.FormsBuilding();
  }

  FormsBuilding() {
    this.fgValidator = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      newPassword2: ['', [Validators.required]]
    });
  }

  /**
   * metodo para validar ñas credenciales  de un usuario
   */
  ChangePasswordFn() {
    if (this.fgValidator.invalid || this.fgv.newPassword.value != this.fgv.newPassword2.value) {
      showMessage('Invalid form..!');
    } else {
      //showMessage('Registering...');
      let model = this.getPasswordData();
      this.service.ChangePassword(model).subscribe(
        data => {
          showMessage('Your password has been change successfully, please check your email inbox or your phone.');
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
  getPasswordData(): ChangePasswordModel {
    let model = new ChangePasswordModel();
    model.id = this.service.getUserId();
    model.currentPassword = MD5(this.fgv.currentPassword.value).toString();
    model.newPassword = MD5(this.fgv.newPassword.value).toString();
    model.newPassword2 = MD5(this.fgv.newPassword2.value).toString();
    return model;
  }

  get fgv() {
    return this.fgValidator.controls;
  }
}
