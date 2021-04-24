import { Component, OnInit,Inject } from '@angular/core';
import { CategorieService } from '../../service/categorie.service'
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';
import { Router } from '@angular/router';
import { Categorie } from '../../model/Categorie';
import { MatDialogRef } from "@angular/material/dialog";
@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.scss']
})
export class AddCategorieComponent implements OnInit {
num : any;
code : string;
  constructor(public crudApi: CategorieService, public fb: FormBuilder, public toastr: ToastrService,
    private router: Router,public dialogRef:MatDialogRef<AddCategorieComponent>) { }
    get f() { return this.crudApi.formData.controls }
  ngOnInit() {

    if (this.crudApi.choixmenu == "A") 
    { this.infoForm() 
    this.onSelectCode()};
  }

  onSelectCode() {
    
    this.crudApi.getNumero().subscribe(
      response => {
      
        this.num = response;
        this.code = (1000 + this.num +1).toString().substring(1);
      
        this.f['code'].setValue(this.code);
      }
    );
  }

  infoForm() {
    this.crudApi.formData = this.fb.group({
      id: null,
      code: ['', [Validators.required]],
      libelle: ['', [Validators.required]],
    });
  }
  ResetForm() {
    this.crudApi.formData.reset();
  }
  onSubmit() {
   
      if (this.crudApi.choixmenu == "A") {
        this.addData();
      }
      else {
  
        this.updateData()
      }
  
  
  }

lister()
{
  this.router.navigate(['/categories']);
}

  addData() {
    
    this.crudApi.createData(this.crudApi.formData.value).
      subscribe(data => {
        this.dialogRef.close();
        this.crudApi.getAll().subscribe(
          response =>{this.crudApi.list = response;}
         );                                            
        this.router.navigate(['/categories']);
      });
  }
  updateData() {
    this.crudApi.updatedata(this.crudApi.formData.value.code, this.crudApi.formData.value).
      subscribe(data => {
        this.dialogRef.close();
        this.crudApi.getAll().subscribe(
          response =>{this.crudApi.list = response;}
         );
        this.router.navigate(['/categories']);
      });
  }

}
