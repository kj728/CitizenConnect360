import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AppState } from '../State';
import { Store } from '@ngrx/store';
import { ViewActions } from '../State/Actions/views.action';
import { getAllViewsSelector, getViewById } from '../State/Selectors/views.selector';
import { View } from '../Models-Angular/Views';
import { CommentsActions } from '../State/Actions/comments.actions';
import { addComment } from '../Models-Angular/Comment';
import { Payload } from '../Models-Angular/User';

@Component({
  selector: 'app-single-view',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './single-view.component.html',
  styleUrl: './single-view.component.css'
})
export class SingleViewComponent implements OnInit {

  constructor(private fb: FormBuilder, private activateRoute: ActivatedRoute, private store: Store<AppState>) {

  }

  

  addCommentForm!: FormGroup

  retrievedView!: View

  ngOnInit(): void {




    this.addCommentForm = this.fb.group({
      comment: [null, Validators.required]
    })

    this.activateRoute.params.subscribe(params => {

      this.store.dispatch(ViewActions.get())
      this.store.select(getAllViewsSelector).subscribe(allviews => {
        const view = allviews.find(v => v.view.id === params['id'])
        if (view) {
          this.retrievedView = view
        }

      })

    })


  }

  onSubmit() {
    console.log("Add Comment Form Submitted")
    console.log(this.addCommentForm.value)

    let comment: addComment = {
      comment: this.addCommentForm.value.comment,
      viewid: this.retrievedView.view.id,

    }


    this.store.dispatch(CommentsActions.addComment({ newComment: comment }))
    this.addCommentForm.reset()
  }

}
