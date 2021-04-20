import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormsConfig } from 'src/app/config/forms-config';
import { ProductModel } from 'src/app/models/products/product.model';
import { ProductService } from 'src/app/services/products/product.service';

declare const showMessage: any;
declare const showRemoveConfirmationWindow: any;
declare const closeAllModal: any;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  page: number = 1;
  ElementosPorPagina: number = FormsConfig.ITERMS_PER_PAGE;
  recordList: ProductModel[];
  idToRemove: String = '';

  constructor(private service: ProductService,
    private spinner: NgxSpinnerService,
    private router: Router) {
  }

  ngOnInit(): void {
    /** spinner starts on init */
    // this.spinner.show();


    this.fillRecords();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 500);
  }

  fillRecords() {
    this.service.getAllRecords().subscribe(
      data => {
        this.recordList = data;
      },
      error => {
        showMessage("There is an error with backend comnication.");
      }
    );
  }

  RemoveConfirmation(id) {
    this.idToRemove = id;
    showRemoveConfirmationWindow();
  }

  RemoveRecord() {
    if (this.idToRemove) {
      this.service.DeleteRecord(this.idToRemove).subscribe(
        data => {
          this.idToRemove = '';
          this.fillRecords();
          closeAllModal('removeConfirmationModal');
          showMessage('Record removed succesfully.');
          alert('regrese');

        },
        error => {
          showMessage("There is an error with backend comnication.");
        }
      );
    }
  }
}
