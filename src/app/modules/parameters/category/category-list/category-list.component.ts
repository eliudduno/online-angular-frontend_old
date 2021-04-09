import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormsConfig } from 'src/app/config/forms-config';
import { CategoyModel } from 'src/app/models/parameters/category.models';
import { CategoryService } from 'src/app/services/parameters/category.service';

declare const showMessage: any;
declare const showRemoveConfirmationWindow: any;

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  page: number = 1;
  ElementosPorPagina: number = FormsConfig.ITERMS_PER_PAGE;
  recordList: CategoyModel[];
  idToRemove: String = '';
  constructor(private service: CategoryService,
    private spinner: NgxSpinnerService) {
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
        console.log(this.recordList);
      },
      error => {
        showMessage("There is on error  with backend comnication.");
      }
    );
  }

  RemoveConfirmation(_id) {
    this.idToRemove = _id;
    showRemoveConfirmationWindow();
  }

}
