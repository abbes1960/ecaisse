
  import { Component, OnInit,Inject } from '@angular/core';
  import { ArticleService} from '../../service/article.service';
  import { ToastrService } from 'ngx-toastr';
  import { Article} from '../../model/article';
  import { PanierService} from '../../service/panier.service';
  import { Panier} from '../../model/panier';
  import { Lpanier} from '../../model/Lpanier';
  
  import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
  import { MatDialogRef } from "@angular/material/dialog";
  import { Router } from '@angular/router';
  import { MAT_DIALOG_DATA } from "@angular/material/dialog";
  import { AddLpanierComponent } from '../../panier/add-lpanier/add-lpanier.component';
  import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
  from '@angular/forms';
  @Component({
    selector: 'app-add-panier',
    templateUrl: './add-panier.component.html',
    styles: [

    ]
  })
  export class AddPanierComponent implements OnInit {
    lpanier : Lpanier;
    article : Article;

    montttc :number = 0;
    monttva : number = 0;
    montht  : number = 0;
    constructor(public service: ArticleService, public toastr: ToastrService,
      public panierService: PanierService,private router : Router,
      private matDialog: MatDialog,public fb: FormBuilder,
      @Inject(MAT_DIALOG_DATA) public data: any,
      public dialogRef:MatDialogRef<AddLpanierComponent>,) { }

    ngOnInit() {
      this.getData();
    }



    panier()
    {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width="70%";
      //dialogConfig.data="gdddd";
      this.matDialog.open(AddLpanierComponent, dialogConfig);
    }
    addToCart(item :Lpanier)
    {
      this.montttc =item.pv;
      this.montht  =(this.montttc /( 100 + item.tva))*100;
      this.monttva = this.montttc - this.montht;
      this.panierService.totttc =this.panierService.totttc + this.montttc;
      this.panierService.tottht =this.panierService.tottht + this.montht;
      this.panierService.tottva =this.panierService.tottva + this.monttva;
      item.montttc = this.montttc;
      item.montht  = this.montht;
      item.monttva  = this.monttva;
      item.qte = 1;
      this.panierService.list.push(item)
      
    }

    Show(item : Article)
    {

    }


    getData() {
      this.service.getAll().subscribe(
        response =>{this.service.list = response;}
       );

    }

    payement()
    {

    }
    
    vider()
    {
      
    }



  }

