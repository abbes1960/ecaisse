import { Component, OnInit } from '@angular/core';
import { UserService} from '../service/user.service';
import { Router } from '@angular/router';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { ArticleService} from '../service/article.service';
@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  
  styles: [
  ]
})
export class TemplateComponent implements OnInit {
name : string;
  constructor(private userService : UserService,private router : Router,
    public artService: ArticleService) { }

  ngOnInit(): void {
   this.name =  localStorage.getItem('name');
    this.artService.getAll().subscribe(
      response =>{this.artService.list = response;}
     );
  }
  
logout()
{
  this.userService.islogin = false;
    this.userService.admin = false;
    this.userService.suser = false;
  this.router.navigate(['/login']);

}
addArticle()
{
  
  this.router.navigate(['/articles']);
}
generatePdf()
{
  
 const document = this.artService.getDocument();
 alert("dddd");
 pdfMake.createPdf(document).open(); 

}
}
