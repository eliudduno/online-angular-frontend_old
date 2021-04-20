import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsConfig } from 'src/app/config/forms-config';
import { BrandModel } from 'src/app/models/parameters/brand.models';
import { CategoryModel } from 'src/app/models/parameters/category.models';
import { ProductModel } from 'src/app/models/products/product.model';
import { BrandService } from 'src/app/services/parameters/brand.service';
import { CategoryService } from 'src/app/services/parameters/category.service';
import { ProductService } from 'src/app/services/products/product.service';

declare const initSelect: any;
declare const showMessage: any;

@Component({
  selector: 'app-product-creation',
  templateUrl: './product-creation.component.html',
  styleUrls: ['./product-creation.component.css']
})
export class ProductCreationComponent implements OnInit {

  fgValidator!: FormGroup;
  nameMinLength = FormsConfig.PARAM_NAME_MIN_LENGTH;
  codeMinLength = FormsConfig.PARAM_CODE_MIN_LENGTH;
  categoryList: CategoryModel[];
  brandList: BrandModel[];


  constructor(
    private fb: FormBuilder,
    private service: ProductService,
    private brandService: BrandService,
    private categoryService: CategoryService,
    private router: Router) { }

  ngOnInit(): void {
    //Funcions para buscar brand y category e llenar los arreglos
    this.getAllCategories();
    this.getAllBrand();
    this.FormsBuilding();
  }

  /**
   * Rellena todo el combo en los select des brand y category
   */
  //Funcions para buscar brand y category e llenar los arreglos
  getAllCategories() {
    this.categoryService.getAllRecords().subscribe(
      data => {
        this.categoryList = data;
        setTimeout(initSelect(), 500);
      },
      error => {
        console.error("Error loading category");
      }
    );
  }

  getAllBrand() {
    this.brandService.getAllRecords().subscribe(
      data => {
        this.brandList = data;
        setTimeout(initSelect(), 500);
      },
      error => {
        console.error("Error loading brands");
      }
    );
  }

  FormsBuilding() {
    this.fgValidator = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(this.codeMinLength)]],
      name: ['', [Validators.required, Validators.minLength(this.codeMinLength)]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      rate: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      brandId: ['', [Validators.required]]
    });
  }

  saveNewRecordFn() {
    if (this.fgValidator.invalid) {
      showMessage('Invalid form..!');
    } else {
      let model = this.getCustomerData();
      this.service.saveNewRecord(model).subscribe(
        data => {
          showMessage('Record saved succesfully.');
          //redireccionando luego de logear
          this.router.navigate(['/products/product-list']);
        },
        error => {
          showMessage('Error saving..');
        }
      );
    }
  }

  getCustomerData(): ProductModel {
    let model = new ProductModel();
    model.code = this.fgv.code.value;
    model.name = this.fgv.name.value;
    model.description = this.fgv.description.value;
    model.stock = parseInt(this.fgv.stock.value);
    model.rate = parseInt(this.fgv.rate.value);
    model.price = parseInt(this.fgv.price.value);
    model.categoryId = this.fgv.categoryId.value;
    model.brandId = this.fgv.brandId.value;
    return model;
  }
  get fgv() {
    return this.fgValidator.controls;
  }

}
