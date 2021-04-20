import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsConfig } from 'src/app/config/forms-config';
import { BrandModel } from 'src/app/models/parameters/brand.models';
import { BrandService } from 'src/app/services/parameters/brand.service';

declare const showMessage: any;

@Component({
  selector: 'app-brand-edition',
  templateUrl: './brand-edition.component.html',
  styleUrls: ['./brand-edition.component.css']
})
export class BrandEditionComponent implements OnInit {

  fgValidator!: FormGroup;
  nameMinLength = FormsConfig.PARAM_NAME_MIN_LENGTH;
  codeMinLength = FormsConfig.PARAM_CODE_MIN_LENGTH;
  id: string;

  constructor(
    private fb: FormBuilder,
    private service: BrandService,
    private router: Router,
    private route: ActivatedRoute) {
    this.id = this.route.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.FormsBuilding();
    this.getDataOfRecord();
  }

  FormsBuilding() {
    this.fgValidator = this.fb.group({
      id: ['', [Validators.required]],
      code: ['', [Validators.required, Validators.minLength(this.codeMinLength)]],
      name: ['', [Validators.required, Validators.minLength(this.nameMinLength)]]
    });
  }

  getDataOfRecord() {
    console.log(this.id);
    if (this.id) {
      this.service.getRecordsById(this.id).subscribe(
        data => {
          console.log(data);
          this.fgv.id.setValue(data.id);
          this.fgv.code.setValue(data.code);
          this.fgv.name.setValue(data.name);
        },
        error => {
          showMessage("Record not found.");
          this.router.navigate(["/parameters/brand/-list"]);
        }
      );
    } else {
      this.router.navigate(["/parameters/brand/-list"]);
    }
  }

  EditRecordFn() {
    if (this.fgValidator.invalid) {
      showMessage('Invalid form..!');
    } else {
      let model = this.getCustomerData();
      this.service.EditRecord(model).subscribe(
        data => {
          showMessage('Record updated succesfully.');
          //redireccionando luego de logear
          this.router.navigate(['/parameters/brand-list']);
        },
        error => {
          showMessage('Error saving..');
        }
      );
    }
  }

  getCustomerData(): BrandModel {
    let model = new BrandModel();
    model.id = this.fgv.id.value
    model.code = this.fgv.code.value;
    model.name = this.fgv.name.value;
    return model;
  }
  get fgv() {
    return this.fgValidator.controls;
  }
}

