import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../State';
import { Poll } from '../Models-Angular/Poll';
import { Payload } from '../Models-Angular/User';
import { PollActions } from '../State/Actions/poll.action';
import { getAllPollSelector } from '../State/Selectors/polls.selector';

@Component({
  selector: 'app-polls',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './polls.component.html',
  styleUrl: './polls.component.css'
})
export class PollsComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  currentUser!: Payload

  allPolls!: Poll[]

  ngOnInit(): void {
    const userString = localStorage.getItem('currentUser');
    if (userString) {

      this.currentUser = JSON.parse(userString);
    }


    this.store.dispatch(PollActions.get())
    this.store.select(getAllPollSelector).subscribe(allPolls => {
      this.allPolls = allPolls;

      console.log(this.allPolls)

    })


  }



}
