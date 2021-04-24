
import { Component, OnInit,Inject} from '@angular/core';
import { ScategorieService} from '../../service/scategorie.service';
import { CategorieService} from '../../service/categorie.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }

from '@angular/forms';
import { Router } from '@angular/router';
import { Scategorie} from '../../model/sCategorie';
import { Categorie} from '../../model/categorie';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-add-scategorie',
  templateUrl: './add-scategorie.component.html',
  styles: [
  ]
})
export class AddScategorieComponent implements OnInit {
  CategorieList: Categorie[];
  num : any;
  code : string;
  constructor(public crudApi: ScategorieService ,public fb: FormBuilder,public toastr: ToastrService,

    public categorieService: CategorieService,
    private router : Router,@Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<AddScategorieComponent>,

    ) { }
    get f() { return this.crudApi.formData.controls }
  ngOnInit() {

    if (this.crudApi.choixmenu == "A")
    {
      this.infoForm() 
    }
    this.categorieService.getAll().subscribe(
      response =>{this.CategorieList = response;}
     );
   }

   
    
  


  infoForm() {
    this.crudApi.formData = this.fb.group({
        id: null,
        code: ['', [Validators.required]],
        ccateg: ['', [Validators.required]],
        libelle: ['', [Validators.required]],
        rang: [1],
      });
    }



  ResetForm() {
      this.crudApi.formData.reset();
  }
  onSubmit() {

    if (this.crudApi.choixmenu == "A")
    {
      this.addData();
    }
    else
    {

     this.updateData()
    }

}



addData() {
  this.crudApi.createData(this.crudApi.formData.value).
  subscribe( data => {
    this.dialogRef.close();

    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.list = response;}
     );
    this.router.navigate(['/scategories']);
  });
}
  updateData()
  {
    this.crudApi.updatedata(this.crudApi.formData.value.code,this.crudApi.formData.value).
    subscribe( data => {
      this.dialogRef.close();

      this.crudApi.getAll().subscribe(
        response =>{this.crudApi.list = response;}
       );
      this.router.navigate(['/scategories']);
    });
  }

  OnSelectCateg(ctrl) {
    if (ctrl.selectedIndex == 0) {

      this.f['ccateg'].setValue('');
    }
    else {
      this.code = this.CategorieList[ctrl.selectedIndex - 1].code;
      this.crudApi.getNumero(this.code).subscribe(
        response => {
        
          this.num = response;
          if (this.num > 0)
          {
            this.code = (100000 + this.num +1).toString().substring(1);
          }
          else
          {
            this.code = (this.code+'01');
          }
        
          this.f['code'].setValue(this.code);
        }
      );
    
    }
  }
}
