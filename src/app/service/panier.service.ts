import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Panier } from '../model/panier';
import { Lpanier } from '../model/lpanier';

import { ClientService } from '../service/client.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  public formData:  FormGroup;
  private baseUrl = '/api/paniers';
  list :  any=[];
  tottht : number = 0;
  tottva : number = 0;
  totttc : number = 1000;
  qte : number = 0;
  nba :number = 0;
  panier    : any={};
  
  constructor(private http:HttpClient,private toastr: ToastrService,
   ) { }
   getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
 
  saveOrUpdate(info: Object): Observable<Object> {
  
    return this.http.post(`${this.baseUrl}`, info);
  }
  updatedata(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
 /* getDocument(id :number) {
    {
      this.getData(id).subscribe(
       response =>{
         this.panier = response;
       
         }
      );  
      this.steService.getData(1).subscribe(
        response =>{
          this.ste = response;
          }
       );  
       this.clientService.getData(this.livr.code).subscribe(
        response =>{
          this.client = response;
      
          }
       );
      sessionStorage.setItem('livr', JSON.stringify(this.livr));
    return {
      content: [
        {
          columns: [
            [{
              text: this.ste.libelle ,
              style: 'name'
            },
            {
              text: this.ste.slibelle,
              style: 'name'
            },
            {
              text: this.ste.adresse,
              style: 'name'
            },
            {
              text: 'MatFiscale : '+ this.ste.matf,
            },
            {
              text: 'Tel 1  : '+ this.ste.te1 +'   Tel   : '+ this.ste.tel2,
              color: 'blue',
            },
            ],
          ]
        },
        {
          text: 'Bon de Livraison',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 20,20, 20]
        },
       
        {
          columns: [
            [{
              text: 'Numero : '+ this.livr.numero ,
              style: 'ligne',
              margin: [0,10, 0, 0] 
            },
            {
              text: ' Date : ' +this.livr.date_mvt,
              style: 'ligne',
              margin: [0,10, 0, 0] 
             },
            {
              text: 'Code :  '+ this.livr.code ,
              style: 'ligne1',
             },
            {
              text: 'Client :  '+ this.livr.libcl ,
              style: 'ligne1',
          
            },
            {
              text: 'Adresse  :  '+ this.client.adresse ,
              style: 'ligne1',
            
            },
            {
              text: 'Tel  :  '+ this.client.tel ,
              style: 'ligne1',
            },
            {
              text: 'Mat Fiscale   :  '+ this.client.matfisc ,
              style: 'ligne1',
              },
             ],
          ]
        },
        
        {
          text: ' ',
          style: 'header'
        },
        
        
       this.getDetails(this.livr.llivrs),
       {

       },

       {
        text: ' ',
        style: 'header'
      },

        {
          text: '  Tot ht  : ' + this.livr.totht +  '      Tot Rem  : ' + this.livr.totrem
          +'        Tot Tva   : ' + this.livr.tottva +'      Tot TTC  : ' + this.livr.totttc,
          style: 'total',
          
        },
        
        {
          text: 'Signature',
          style: 'sign',
          alignment : 'right'

        },
       
      ],
     
        styles: {
          header: {
            fontSize: 18,
            bold: true,
        
             alignment: 'center',
          },
          name: {
            fontSize: 16,
            bold: true
          },
          total: {
            fontSize: 12,
            bold: true,
            italics: true,
            
          },
          ligne: {
            fontSize: 12,
            bold: true,
            italics: true
          },
          ligne1: {
            fontSize: 12,
            bold: true,
            italics: true,
            margin: [300,10, 0,0]
          },
          sign: {
            margin: [0, 50, 20, 10],
            alignment: 'right',
            italics: true
          },
          tableHeader: {
            bold: true,
            fontSize: 15,
            alignment: 'center',
          }
        }
    };
  }*/
  
  }
