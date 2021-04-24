import { Component, OnInit, Inject } from '@angular/core';
import { ScategorieService } from '../../service/scategorie.service';
import { CategorieService } from '../../service/categorie.service';
import { ArticleService } from '../../service/article.service';
import { UserService } from '../../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';
import { Router } from '@angular/router';
import { Categorie } from '../../model/categorie';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styles: [
  ]
})
export class AddArticleComponent implements OnInit {
  num: any;
  code: string;
  CategorieList: Categorie[];
  ScategorieList: any[];
  scategorie: any = {};
  userFile;
  public imagePath;
  imgURL: any;
  public message: string;
  codef : string;
  name : string;
  constructor(public crudApi: ArticleService, public fb: FormBuilder, public toastr: ToastrService,
    public scategorieService: ScategorieService,
    public categorieService: CategorieService,
    public userService: UserService,
    private router: Router, @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<AddArticleComponent>,

  ) { }
  get f() { return this.crudApi.dataForm.controls; }
  ngOnInit() {
    if (this.crudApi.choixmenu == "A") { this.infoForm() };
    this.categorieService.getAll().subscribe(
      response => { this.CategorieList = response; }
    );
    
    this.codef = localStorage.getItem('codef');
    this.f['codef'].setValue(this.codef);
    
  }

  infoForm() {
    this.crudApi.dataForm = this.fb.group({
      id: null,
      code: ['', [Validators.required]],
      libelle: ['', [Validators.required]],
      pa: [0, [Validators.required]],
      pv: [0, [Validators.required]],
      tva: [0, [Validators.required]],
      stock: [0, [Validators.required]],
      ccateg: ['', [Validators.required]],
      cscateg: ['', [Validators.required]],
      codef : [''],
    });
  }

  ResetForm() {
    this.crudApi.dataForm.reset();
  }
  onSubmit() {
    if (this.crudApi.choixmenu == "A") {
      this.addData();
    }
    else {
      this.updateData()
    }
  }

  onSelectCateg(code: string) {
    this.scategorieService.listScateg(code).subscribe(
      response => { this.ScategorieList = response; }
    );
  }

  onSelectScateg(code: string) {
    
      this.crudApi.getNumero(code).subscribe(
        response => {
        this.num = response;
          if (this.num > 0) {
            this.code = (1000000000 + this.num + 1).toString().substring(1);
          }
          else {
            this.code = (code + '0001');
          }
          this.f['code'].setValue(this.code);
        }
      );

    }
  

  addData() {
 
    const formData = new FormData();
    
    const article = this.crudApi.dataForm.value;
    formData.append('article', JSON.stringify(article));
    formData.append('file', this.userFile);
    this.crudApi.createData(formData).subscribe(data => {
      this.dialogRef.close();
      if (this.userService.four)
    {
      this.crudApi.getListArtf(parseInt(this.codef)).subscribe(
        response =>{this.crudApi.list = response;}
       );
    }
    else
    {
      this.crudApi.getAll().subscribe(
        response =>{this.crudApi.list = response;}
       );
    }
     
      this.router.navigate(['/articles']);
    });
  }
  updateData() {
    this.crudApi.updatedata(this.crudApi.dataForm.value.id, this.crudApi.dataForm.value).
      subscribe(data => {
        this.dialogRef.close();
        this.crudApi.getAll().subscribe(
          response =>{this.crudApi.list = response;}
         );
        this.router.navigate(['/articles']);
      });
  }

  onSelectFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userFile = file;
      // this.f['profile'].setValue(file);

      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.toastr.success('Only images are supported.');

        return;
      }
      var reader = new FileReader();
      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }
    }
  }
}
