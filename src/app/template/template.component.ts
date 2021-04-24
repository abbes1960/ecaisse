import { Component, OnInit } from '@angular/core';
import { UserService} from '../service/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  
  styles: [
  ]
})
export class TemplateComponent implements OnInit {
name : string;
  constructor(private userService : UserService,private router : Router) { }

  ngOnInit(): void {
   this.name =  localStorage.getItem('name');
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
}
