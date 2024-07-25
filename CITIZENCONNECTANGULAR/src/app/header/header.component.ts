import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';
import { Payload } from '../Models-Angular/User';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent  implements OnInit{

  constructor(public authService: AuthenticationService, private router:Router) { }

  showNav = false;

  currentUser!: Payload


  ngOnInit(): void {
   
    const userString = localStorage.getItem('currentUser');
    if (userString) {
      this.currentUser = JSON.parse(userString);
    }

  }
  toggle() {
    this.showNav =!this.showNav;
  }

  logoutUser(){
    this.authService.logOut()
    this.router.navigate(['/login'])

  }
}
