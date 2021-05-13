import { Component, OnInit, Inject } from '@angular/core';
import { ArticleService } from '../../service/article.service';
import { PanierService } from '../../service/panier.service';
import { Lpanier } from '../../model/lpanier';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PayementComponent } from '../../panier/payement/payement.component';

@Component({
  selector: 'app-add-lpanier',
  templateUrl: './add-lpanier.component.html',
  styles: [
  ]
})
export class AddLpanierComponent implements OnInit {
  lpanier: Lpanier;
  constructor(public articleService: ArticleService,
    public service: PanierService,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PayementComponent>,) { }

  ngOnInit(): void {
  }

  remove(i: number) {
    if (i != null)

      this.service.list.splice(i, 1);
    this.calcul();
  }




  calcul() {

    this.service.totttc = (this.service.list.reduce((prev, curr) => {
      return prev + (curr.qte * curr.pv);
    }, 0));
    this.service.tottht = (this.service.list.reduce((prev, curr) => {
      return prev + ((curr.qte * curr.pv)/(100 + curr.tva))*100;
    }, 0));
    this.service.tottva = this.service.totttc - this.service.tottht;
  }


  payement() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "70%";

    this.matDialog.closeAll();
    this.matDialog.open(PayementComponent, dialogConfig);

  }
vider()
{
  this.service.list = [];
  this.service.totttc = 0;
  this.service.tottht = 0;
  this.service.tottva = 0;
}


  

}
