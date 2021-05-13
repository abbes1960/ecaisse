import { Component, OnInit } from '@angular/core';
import { UserService} from '../../service/user.service'
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl,Validators }
from '@angular/forms';
import { Router } from '@angular/router';
import { User} from '../../model/user';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
    ]
})
export class RegisterComponent implements OnInit {
  submitted = false;
  userFile;
  public imagePath;
  imgURL: any;
  pwdd :string;
  acceptTerms : string;
  constructor(public crudApi: UserService ,public fb: FormBuilder,public toastr: ToastrService,
    private router : Router) { }
    
  ngOnInit() {
  
   
    this.infoForm();
   }

   get f() { return this.crudApi.formData.controls; }

  
  infoForm() {
    this.crudApi.formData = this.fb.group({
        id: null,
        username: ['', [Validators.required, Validators.minLength(5)]],
        nom: ['', [Validators.required, Validators.minLength(5)]],
        role: ['', [Validators.required, Validators.minLength(8)]],
        email: ['', [Validators.required, Validators.minLength(8)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        });
    }
   
  

  onReset() {
    this.submitted = false;
      this.crudApi.formData.reset();
  }
  onSubmit() {
    
    this.submitted = true;
    const val = this.crudApi.formData.value;
  //  if (val.password == val.pwdd)
 //   {
      if (this.crudApi.choixmenu == "A")
      {
        this.addData();
      }
      else
      {
       this.updateData()
      }
  /*  }
    else
    {
      this.toastr.warning( 'Vérifiet votre de passe ...');  
    }*/
}
  
   

addData() {
  const formData = new FormData();
    
    const users = this.crudApi.formData.value;
    formData.append('user', JSON.stringify(users));
    formData.append('file', this.userFile);
    this.crudApi.createData(formData).subscribe( data => {
    this.toastr.success( 'Validation Faite avec Success'); 
    this.router.navigate(['/login']);
  });
}

  updateData()
  {
  
    this.crudApi.updatedata(this.crudApi.formData.value.id,this.crudApi.formData.value).
    subscribe( data => {
      this.toastr.success( 'Modification Faite avec Success');

      this.router.navigate(['/users']);
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



