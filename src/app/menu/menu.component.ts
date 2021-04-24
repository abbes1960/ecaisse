import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService} from '../service/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
  
})
export class MenuComponent implements OnInit {
  name  = '';
  constructor(private userService : UserService,private router : Router) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('name');
    
  }
logout()
{
  
  this.userService.islogin = false;
    this.userService.admin = false;
    this.userService.suser = false;
  this.router.navigate(['/login']);

}
}
