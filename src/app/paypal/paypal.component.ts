import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PanierService } from '../service/panier.service';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styles: [
  ]
})
export class PaypalComponent implements OnInit {
  format = '5.2-2';
  
  @ViewChild('paypal',{static : true}) paypalElement: ElementRef;  
  constructor(public service: PanierService,public toastr: ToastrService,
    public decimalPipe: DecimalPipe) { }  
 
  ngOnInit() :void {     
   window.paypal
   .Buttons(
     {
       style : {
         layout : 'horizontal',
         color : 'blue',
       },
     createOrder :(data, actions) =>
     {
     return actions.order.create({
         purchase_units :[
           {
            amount : {
              value : '1000',
              // this.decimalPipe.transform(this.service.totttc, this.format),
              currency_code : 'USD'
            }
           }
         ]
       });
     },
     onApprouve : (data, actions)=>
     {
return actions.order.capture().then(details =>{
  this.toastr.warning(' Payement effectué Avec success ....');
})
     },
     onError : error =>
     {
       console.log(error);
     }
    }
   ).render(this.paypalElement.nativeElement);
  }  
  // ============END Get Subcription Details Method========================  
  

}