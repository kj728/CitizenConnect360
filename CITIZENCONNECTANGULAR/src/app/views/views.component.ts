import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

import { AppState } from '../State';
import { Store } from '@ngrx/store';
import { ViewActions } from '../State/Actions/views.action';
import { getAllViewsSelector } from '../State/Selectors/views.selector';
import { ShortenDescriptionPipe } from '../ShortenDescription/shorten-description.pipe';
import { AuthActions } from '../State/Actions/auth.actions';
import { userSelector } from '../State/Selectors/auth.selector';
import { IUser, Payload } from '../Models-Angular/User';
import { View } from '../Models-Angular/Views';

@Component({
  selector: 'app-views',
  standalone: true,
  imports: [CommonModule, RouterModule,RouterLink,ShortenDescriptionPipe],
  templateUrl: './views.component.html',
  styleUrl: './views.component.css'
})
export class ViewsComponent  implements OnInit{

  constructor(private store:Store<AppState>){

  }
  currentUser!:Payload

  allViews!: View[]
 
  
  ngOnInit(): void {

    const userString = localStorage.getItem('currentUser');
    if (userString) {

      this.currentUser = JSON.parse(userString);
    }


    this.store.dispatch(ViewActions.get())
    this.store.select(getAllViewsSelector).subscribe(allviews => {
      this.allViews = allviews;

    })

  }


  getUserName(id:string): string {
    console.log(id)
    return "Anonymous"
  }




  currentPage = 0;
  totalPages = 10; // Replace with the actual total number of pages

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
    }
  }


}
