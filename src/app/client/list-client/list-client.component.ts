import { Component, OnInit,Inject } from '@angular/core';
import { ClientService} from '../../service/client.service';
import { ToastrService } from 'ngx-toastr';
import { Client} from '../../model/Client';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AddClientComponent } from '../../client/add-client/add-client.component';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styles: []
})
export class ListClientComponent implements OnInit {
 
  p: number = 1;
  constructor(public crudApi: ClientService, public toastr: ToastrService,
    private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddClientComponent>,) { }
 
  ngOnInit() {
    this.getData();
  }
  
  getData() {
    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.list = response;}
     );
   
  }
  
  addclient()
  {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    //dialogConfig.data="gdddd";
    this.matDialog.open(AddClientComponent, dialogConfig);
  }
  removeData(id: number) {
    if (window.confirm('Are sure you want to delete this Client ?')) {
    this.crudApi.deleteData(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.success(' data successfully deleted!'); 
          this.getData();
        },
        error => console.log(error));
  }
  }
  selectData(item : Client) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    
    this.matDialog.open(AddClientComponent, dialogConfig);
  }


}
