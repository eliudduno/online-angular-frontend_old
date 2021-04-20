import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-product-edition',
  templateUrl: './product-edition.component.html',
  styleUrls: ['./product-edition.component.css']
})
export class ProductEditionComponent implements OnInit {

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
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    //Funcions para buscar brand y category e llenar los arreglos
    this.getAllCategories();
    this.getAllBrand();
    this.FormsBuilding();
    //Funcion para obtener todos los datos del registro a editar
    this.FillFields();
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

  FillFields() {
    let id = this.route.snapshot.params["id"];
    this.service.getRecordsById(id).subscribe(
      data => {
        //asignando valores a los controles en el formulario  
        this.fgv.id.setValue(data.id);
        this.fgv.code.setValue(data.code);
        this.fgv.name.setValue(data.name);
        this.fgv.description.setValue(data.description);
        this.fgv.stock.setValue(data.stock);
        this.fgv.rate.setValue(data.rate);
        this.fgv.price.setValue(data.price);
        this.fgv.categoryId.setValue(data.categoryId);
        this.fgv.brandId.setValue(data.brandId);
      },
      err => {
        console.log('data');
        showMessage('Record not found.');
        this.router.navigate(["/products/product-list"]);
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
      id: ['', [Validators.required]],
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

  editRecordFn() {
    if (this.fgValidator.invalid) {
      showMessage('Invalid form..!');
    } else {
      let model = this.getRecordData();
      this.service.EditRecord(model).subscribe(
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

  getRecordData(): ProductModel {
    let model = new ProductModel();
    model.id = this.fgv.id.value;
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
