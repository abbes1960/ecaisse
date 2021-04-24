import { Component, OnInit,Inject } from '@angular/core';
import { ScategorieService} from '../../service/scategorie.service';
import { ToastrService } from 'ngx-toastr';
import { Scategorie} from '../../model/Scategorie';
import { Router } from '@angular/router';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AddScategorieComponent } from '../../scategorie/add-scategorie/add-scategorie.component';
@Component({
  selector: 'app-list-scategorie',
  templateUrl: './list-scategorie.component.html',
  styles: [
  ]
})
export class ListScategorieComponent implements OnInit {
  public fileName = "SousCategories";
  scategorie : Scategorie;
  p: number = 1;
  control: FormControl = new FormControl('');
  constructor(public crudApi: ScategorieService, public toastr: ToastrService,
    private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddScategorieComponent>,) { }
 
  ngOnInit() {
    
    this.getData();
  }
  addScategorie()
  {
 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    //dialogConfig.data="gdddd";
    this.matDialog.open(AddScategorieComponent, dialogConfig);
  }
 
  

  
  getData() {
    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.list = response;}
     );
  }
  
  exporToExcel() {
    this.crudApi.getExcelData().subscribe((responseMessage) => {
      let file = new Blob([responseMessage], { type: 'application/vnd.ms-excel' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    })
   
  }
  
  removeData(code: string) {
    if (window.confirm('Are sure you want to delete this Scatégorie ?')) {
    this.crudApi.deleteData(code)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning(' data successfully deleted!'); 
          this.getData();
        },
        error => console.log(error));
  }
  }
  selectData(item : Scategorie) {
    this.crudApi.choixmenu = "M";
    this.crudApi.formData = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    
    this.matDialog.open(AddScategorieComponent, dialogConfig);
  }
 
}
