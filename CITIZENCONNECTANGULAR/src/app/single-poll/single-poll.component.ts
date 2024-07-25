import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../State';
import { PollActions } from '../State/Actions/poll.action';
import { getAllPollSelector } from '../State/Selectors/polls.selector';
import { Poll } from '../Models-Angular/Poll';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { addVote } from '../Models-Angular/Votes';
import { VoteActions } from '../State/Actions/votes.action';

@Component({
  selector: 'app-single-poll',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './single-poll.component.html',
  styleUrl: './single-poll.component.css'
})
export class SinglePollComponent implements OnInit {

  constructor(private fb: FormBuilder, private activateRoute: ActivatedRoute, private store: Store<AppState>) { }

  retrievedPoll!: Poll

  addVoteForm!: FormGroup

  pollId!: string
  percentage = 0;
  totalVotes = 0;
  ngOnInit(): void {

    this.addVoteForm = this.fb.group({
      choice: this.fb.control(null, Validators.required),
    });



    this.activateRoute.params.subscribe(params => {
      this.pollId = params['id']
      this.store.dispatch(PollActions.get())
      this.store.select(getAllPollSelector).subscribe(allviews => {
        const poll = allviews.find(p => p.poll.id === params['id'])
        if (poll) {
          this.retrievedPoll = poll


          this.retrievedPoll.choicesArray.forEach(choice => {
            this.totalVotes += choice.votecount;
            this.percentage = (choice.votecount / this.totalVotes) * 100;

            //console.log(choice.choicetext + " - " + choice.votecount + " - " + this.percentage + "%");
          });


        }
      })
    })

  }


  calculatePercentage(choice: any): number {
    let totalVotes = 0;
    this.retrievedPoll.choicesArray.forEach(c => {
      totalVotes += c.votecount;
    });
    return (choice.votecount / totalVotes) * 100;
  }


  onSubmit() {
    console.log(this.addVoteForm.value.choice)

    let vote: addVote = {
      pollid: this.pollId,
      choiceid: this.addVoteForm.value.choice

    }
    this.store.dispatch(VoteActions.addVote({ newVote: vote }))
    this.addVoteForm.reset();
  }


}
