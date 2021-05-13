import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { AddCategorieComponent } from './categorie/add-categorie/add-categorie.component';
import { ListCategorieComponent } from './categorie/list-categorie/list-categorie.component';
import { AddArticleComponent } from './article/add-article/add-article.component';
import { ListArticleComponent } from './article/list-article/list-article.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';
import { MatDialogModule,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {NgxPaginationModule} from 'ngx-pagination';
import { AddScategorieComponent } from './scategorie/add-scategorie/add-scategorie.component';
import { ListScategorieComponent } from './scategorie/list-scategorie/list-scategorie.component';
import { DemoComponent } from './demo/demo.component';
import { MomentModule } from 'ngx-moment';
import { NgxPayPalModule } from 'ngx-paypal';
import { ListUserComponent } from './user/list-user/list-user.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { TemplateComponent } from './template/template.component';
import { AccueilComponent } from './accueil/accueil.component';
import { Accueil1Component } from './accueil1/accueil1.component';
import { AddClientComponent } from './client/add-client/add-client.component';
import { ListClientComponent } from './client/list-client/list-client.component';
import { ListFourComponent } from './four/list-four/list-four.component';
import { AddFourComponent } from './four/add-four/add-four.component';
import {DecimalPipe} from '@angular/common';
import { APP_BASE_HREF } from '@angular/common';
import { Login1Component } from './user/login1/login1.component';
import { AddPanierComponent } from './panier/add-panier/add-panier.component';
import { AddLpanierComponent } from './panier/add-lpanier/add-lpanier.component';
import { ListPanierComponent } from './panier/list-panier/list-panier.component';
import { PayementComponent } from './panier/payement/payement.component';
import { ReglementComponent } from './reglement/reglement.component';
import { PaypalComponent } from './paypal/paypal.component';


const MATERIAL_MODULES = [MatToolbarModule,
  MatIconModule
];
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AddCategorieComponent,
    ListCategorieComponent,
    AddArticleComponent,
    ListArticleComponent,
    AddScategorieComponent,
    ListScategorieComponent,
    DemoComponent,
 
    ListUserComponent,
    LoginComponent,
    RegisterComponent,
    TemplateComponent,
    AccueilComponent,
    Accueil1Component,
    AddClientComponent,
    ListClientComponent,
    ListFourComponent,
    AddFourComponent,
    Login1Component,
    AddPanierComponent,
    AddLpanierComponent,
    ListPanierComponent,
    PayementComponent,
    ReglementComponent,
    PaypalComponent,
    
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    NgxPaginationModule,
    MomentModule,
    MatCardModule,
    NgxPayPalModule
  ],
  exports : MATERIAL_MODULES,
  providers: [DatePipe,DecimalPipe,{ provide: MAT_DIALOG_DATA, useValue: {} ,},{ provide: APP_BASE_HREF, useValue: '' },
    { provide: MatDialogRef, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
