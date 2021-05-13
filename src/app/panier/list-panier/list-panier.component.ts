import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PanierService } from '../../service/panier.service';
import { Panier } from '../../model/panier';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
from '@angular/forms';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-list-panier',
  templateUrl: './list-panier.component.html',
  styles: [
  ]
})
export class ListPanierComponent implements OnInit {
  p = 1;
  Liste;
  SearchText: string;
  format = '3.3-3';
  constructor(private service: PanierService, private router: Router,
    private toastr: ToastrService, public fb: FormBuilder,
    private datePipe: DatePipe,public decimalPipe: DecimalPipe) { }

  ngOnInit() {

    this.getAll();

  }
  getAll() {
    this.service.getAll().subscribe(
      response => { this.Liste = response; }
    );

  }



  selectData(item: Panier) {
    this.service.formData = this.fb.group(Object.assign({}, item));

    this.router.navigate(['/panier']);
  }
  transformDate(date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

}
