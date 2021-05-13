import { Component, OnInit } from '@angular/core';
import { PanierService } from '../../service/panier.service';
import { ArticleService } from '../../service/article.service';
import { CompteurService } from '../../service/compteur.service';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import {  MatDialogRef } from '@angular/material/dialog';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-payement',
  templateUrl: './payement.component.html',
  styles: [
  ]
})
export class PayementComponent implements OnInit {
  constructor(public service: PanierService, public fb: FormBuilder,public toastr: ToastrService,
    private router : Router, public articleService: ArticleService,private datePipe: DatePipe,
    public compteurservice: CompteurService,
    public dialogRef: MatDialogRef<PayementComponent>) { }
    public payPalConfig?: IPayPalConfig;
    compteur: any = {};
    annee;
    numero;
    Date;
    showSuccess = false;
    get f() { return this.service.formData.controls; }
  ngOnInit() {
    this.infoForm();
    this.Date = this.transformDate(new Date(Date.now()));
      this.annee = (this.Date).toString().substring(0, 4);
      this.f['annee'].setValue(this.annee);
      this.onSelectCompteur(this.annee);
    
   }
  infoForm() {
    this.service.formData = this.fb.group({
        id: null,
        numero: ['', [Validators.required]],
        annee: ['', [Validators.required]],
        date_mvt: ['', [Validators.required]],
        nom: ['', [Validators.required, Validators.minLength(8)]], 
        adresse: ['', [Validators.required, Validators.minLength(8)]],
        sadresse: ['', [Validators.required, Validators.minLength(8)]],
        ville: ['', [Validators.required, Validators.minLength(8)]],
        codep: ['', [Validators.required, Validators.minLength(8)]],
        tel: ['', [Validators.required, Validators.minLength(8)]],
        tel1: ['', [Validators.required, Validators.minLength(8)]],
        totht: [''],
        tottva: [''],
        totttc: [''],
        modreg : [''],
        numcarte : [''],
        lpaniers :[],
           });
    }
   valider() 
   {
    alert('fff');
    this.f['annee'].setValue(this.annee);
    this.f['date_mvt'].setValue(this.transformDate(new Date()));
    this.f['numero'].setValue(this.numero);
    this.f['totht'].setValue(this.service.tottht);
    this.f['tottva'].setValue(this.service.tottva);
    this.f['totttc'].setValue(this.service.totttc);
    this.f['lpaniers'].setValue(this.service.list);
    this.service.saveOrUpdate(this.service.formData.value).
         subscribe( data => {
           this.toastr.success( 'Validation Faite avec Success'); 
           this.dialogRef.close();
           this.router.navigate(['/paniers']);
         });
      }
   
   transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  onSelectCompteur(id: number) {
    this.compteurservice.getData(id).subscribe(
      response => {
        this.compteur = response;
        this.numero = (this.annee *1000000) + this.compteur.numpanier;
      }
    );
}
onSelectmodreg(id :number)
{
  if (id == 1)
  {
    this.f['modreg'].setValue('Paypal');
    this.payement();
  }
  else if (id = 2 )
  {
    this.f['modreg'].setValue('Credit Card');
  }
  else if (id = 3 ) {
    this.f['modreg'].setValue('E-Dinar Poste');
  }
  else 
  {
    this.f['modreg'].setValue('à la Livraison');
  }
  
}
private payement(): void {
  this.payPalConfig = {
  currency: 'EUR',
  clientId: 'sb',
  createOrderOnClient: (data) => <ICreateOrderRequest>{
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'EUR',
          value: '1000',
          breakdown: {
            item_total: {
              currency_code: 'EUR',
              value: '9.99'
            }
          }

        },
        items: [
          {
            name: 'Enterprise Subscription',
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'EUR',
              value: '9.99',
            },
          }
        ]
      }
    ]
  },
  advanced: {
    commit: 'true'
  },
  style: {
    label: 'paypal',
    layout: 'vertical'
  },
  onApprove: (data, actions) => {
    console.log('onApprove - transaction was approved, but not authorized', data, actions);
    actions.order.get().then(details => {
      this.toastr.success( 'Payement Effectué  Faite avec Success'); 
         
    });
  },
  onClientAuthorization: (data) => {
    console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
    this.showSuccess = true;
  },
  onCancel: (data, actions) => {
    console.log('OnCancel', data, actions);
  },
  onError: err => {
    console.log('OnError', err);
  },
  onClick: (data, actions) => {
    console.log('onClick', data, actions);
  },
};
}
}
