import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CommentsService } from "../../Services/comments.service";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { concatMap, map, catchError, of } from "rxjs";
import { ViewActions } from "../Actions/views.action";
import { CommentsActions } from "../Actions/comments.actions";
import { addComment } from '../../Models-Angular/Comment';


@Injectable()
export class CommentEffects {
    constructor(private action$: Actions, private commentServ: CommentsService, private router: Router) { }

    addView$ = createEffect(() => {
        return this.action$.pipe(
            ofType(CommentsActions.addComment),
            concatMap(req => this.commentServ.addComment(req.newComment).pipe(
                map(addCommentResponse => CommentsActions.addCommentSuccess({ response: addCommentResponse })),
                catchError(error => of(CommentsActions.addCommentFailure({ message: error })))
            ))
        )
    })


}