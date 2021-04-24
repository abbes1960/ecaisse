import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styles: [
  ]
})
export class DemoComponent implements OnInit {
date_debut  ;
dated ;
datef ;
date_fin ;
nbj = 0;
myDate = new Date(Date.now());
  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.date_debut = this.datePipe.transform(this.myDate,'yyyy-MM-dd');
  
  }

  cal()
  {
    
    this.dated = new Date(this.date_debut).getTime();
    alert(this.dated);
    this.datef = this.dated + (this.nbj *( 86400000));
    
    this.date_fin = this.datePipe.transform(this.datef, 'yyyy-MM-dd');
   
  }
diff()
{
  this.dated = new Date(this.date_debut).getTime();
  this.datef = new Date(this.date_fin).getTime();
  this.nbj = (this.datef - this.dated)/ 86400000;

}

}
