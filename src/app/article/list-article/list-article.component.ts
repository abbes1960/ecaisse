import { Component, OnInit, Inject } from '@angular/core';
import { ArticleService } from '../../service/article.service';
import { ToastrService } from 'ngx-toastr';
import { Article } from '../../model/article';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';
import { AddArticleComponent } from '../../article/add-article/add-article.component';
@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styles: [
  ]
})
export class ListArticleComponent implements OnInit {
  article: Article;
  p: number = 1;

  codef: number = 0;
  control: FormControl = new FormControl('');
  constructor(public crudApi: ArticleService, public toastr: ToastrService,
    private router: Router, public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userService: UserService,
    public dialogRef: MatDialogRef<AddArticleComponent>,) { }

  ngOnInit() {

    if (this.userService.four) {
      this.codef = parseInt(localStorage.getItem('codef'));

      this.getlistArtf(this.codef);
    }
    else {
      this.getData();

    }


  }
  addArticle() {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "70%";
    //dialogConfig.data="gdddd";
    this.matDialog.open(AddArticleComponent, dialogConfig);
  }




  getData() {
    
    this.crudApi.getAll().subscribe(
      response => {
        
        this.crudApi.list = response;
      }
    );

  }

  getlistArtf(code: number) {

    this.crudApi.getListArtf(code).subscribe(
      response => { this.crudApi.list = response; }
    );

  }
  exporToExcel() {
    this.crudApi.getExcelData().subscribe((responseMessage) => {
      let file = new Blob([responseMessage], { type: 'application/vnd.ms-excel' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    })
   
  }

  removeData(id: number) {
    if (window.confirm('Are sure you want to delete this Article ?')) {
      this.crudApi.deleteData(id)
        .subscribe(
          data => {
            console.log(data);
            this.toastr.warning(' data successfully deleted!');
            if (this.userService.four) {

              this.getlistArtf(this.codef);
            }
            else {
              this.getData();
            }
            this.getData();
          },
          error => console.log(error));
    }
  }
  selectData(item: Article) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({}, item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "70%";

    this.matDialog.open(AddArticleComponent, dialogConfig);
  }
}
