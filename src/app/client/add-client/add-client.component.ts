
import { Component, OnInit, Inject } from '@angular/core';
import { ClientService } from '../../service/client.service';
import { UserService } from '../../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from '../../model/client';
import { ParametreService } from '../../service/parametre.service';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styles: []
})
export class AddClientComponent implements OnInit {
  parametre: any = {};
  listUser: any = [];
  valid: boolean = false;
  get f() { return this.crudApi.dataForm.controls }
  constructor(public crudApi: ClientService, public fb: FormBuilder, public toastr: ToastrService,
    private router: Router, private paraService: ParametreService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<AddClientComponent>) { }

  ngOnInit() {

    if (this.crudApi.choixmenu == "A") {
      this.infoForm()
      this.paraService.getData(1).subscribe(
        response => {
          this.parametre = response;
          this.f['code'].setValue(this.parametre.numc);

        }
      );
    }
  }
  infoForm() {
    this.crudApi.dataForm = this.fb.group({
      id: null,
      code: ['', [Validators.required]],
      libelle: ['', [Validators.required]],
      adresse: ['', [Validators.required, Validators.minLength(5)]],
      tel: ['', [Validators.required, Validators.minLength(8)]],
      email: [' ', [Validators.required, Validators.minLength(10)]],
      fax: ['', [Validators.required, Validators.minLength(8)]],

      pwd: ['', [Validators.required, Validators.minLength(8)]],


    });
  }



  ResetForm() {
    this.crudApi.dataForm.reset();
  }
  onSubmit() {
    if (this.valid)
    {
      if (this.crudApi.choixmenu == "A") {
        this.addData();
      }
      else {
  
        this.updateData()
      }
    }
    else
    {
      this.toastr.success('Validation Impossible Vérifier Votre Email.....');
    }

   

  }



  addData() {
    this.crudApi.createData(this.crudApi.dataForm.value).
      subscribe(data => {
        this.toastr.success('Validation Faite avec Success');
        this.dialogRef.close();

        this.crudApi.getAll().subscribe(
          response => { this.crudApi.list = response; }
        );

        this.router.navigate(['/clients']);
      });
  }
  updateData() {

    this.crudApi.updatedata(this.crudApi.dataForm.value.code, this.crudApi.dataForm.value).
      subscribe(data => {
        this.toastr.success('Modification Faite avec Success');
        this.dialogRef.close();

        this.crudApi.getAll().subscribe(
          response => { this.crudApi.list = response; }
        );
        this.router.navigate(['/clients']);
      });
  }

  verif() {
    this.userService.verifEmail(this.crudApi.dataForm.value.email).subscribe(
      response => {
        this.listUser = response;
        if (this.listUser.length == 0) {
          this.valid = true;
        }
        else {
          this.valid = false;
          this.toastr.success('Vérifier Votre Email ..Email Déja Saisie....');
        }

      }  
   );

}    
}
