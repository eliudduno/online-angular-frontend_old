import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsConfig } from 'src/app/config/forms-config';
import { PasswordResetModel } from 'src/app/models/security/password-reset.model';
import { SecurityService } from 'src/app/services/security.service';


declare const showMessage: any;

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

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
      type: ['', [Validators.required]]
    });
  }

  /**
   * metodo para validar ñas credenciales  de un usuario
   */
  PasswordResetFn() {
    if (this.fgValidator.invalid) {
      showMessage('Invalid form..!');
    } else {
      //showMessage('Registering...');
      let model = this.getPasswordData();
      this.service.PasswordReset(model).subscribe(
        data => {
          showMessage('Your password has been reset successfully, please check your email inbox or your phone.');
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
   getPasswordData(): PasswordResetModel {
    let model = new PasswordResetModel();
    model.username = this.fgv.username.value;
    model.type = parseInt(this.fgv.type.value);
    return model;
  }

  get fgv() {
    return this.fgValidator.controls;
  }
}
