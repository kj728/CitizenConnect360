import { Component, OnInit } from '@angular/core';
import { Payload } from '../Models-Angular/User';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  constructor() { }

  currentUser!: Payload


  ngOnInit(): void {
   

    const userString = localStorage.getItem('currentUser');
    if (userString) {

      this.currentUser = JSON.parse(userString);
    }


  }



}
