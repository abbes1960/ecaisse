import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { AddCategorieComponent } from './categorie/add-categorie/add-categorie.component';
import { ListCategorieComponent } from './categorie/list-categorie/list-categorie.component';
import { AddArticleComponent } from './article/add-article/add-article.component';
import { ListArticleComponent } from './article/list-article/list-article.component';
import { AddScategorieComponent } from './scategorie/add-scategorie/add-scategorie.component';
import { ListScategorieComponent } from './scategorie/list-scategorie/list-scategorie.component';
import { DemoComponent } from './demo/demo.component';
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

const routes : Routes = [
    {path: '', component:TemplateComponent,children : [
    {path: 'categories', component: ListCategorieComponent},
    {path: 'categorie', component: AddCategorieComponent},
    {path: 'scategories', component: ListScategorieComponent},
    {path: 'scategorie', component: AddScategorieComponent},
    {path: 'demo', component: DemoComponent},
    {path: 'accueil', component: AccueilComponent},
    {path: 'accueil1', component: Accueil1Component},
    {path: 'client', component: AddClientComponent},
    {path: 'clients', component: ListClientComponent},
    {path: 'four', component: AddFourComponent},
    {path: 'fours', component: ListFourComponent},
    {path: 'users', component: ListUserComponent},
    {path: 'articles', component: ListArticleComponent},
    {path: 'article', component: AddArticleComponent},
    
]},
{path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
  

];
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }