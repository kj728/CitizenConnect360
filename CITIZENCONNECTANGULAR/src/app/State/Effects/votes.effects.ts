import { Actions, createEffect, ofType } from "@ngrx/effects";
import { VotesService } from "../../Services/votes.service";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { VoteActions } from "../Actions/votes.action";
import { concatMap, map, catchError, of } from "rxjs";



@Injectable()
export class VotesEffects {
    constructor(private action$: Actions, private voteServ: VotesService, private router: Router) { }

    addView$ = createEffect(() => {
        return this.action$.pipe(
            ofType(VoteActions.addVote),
            concatMap(req => this.voteServ.addVote(req.newVote).pipe(
                map(addVoteResponse => VoteActions.addVoteSuccess({ response: addVoteResponse })),
                catchError(error => of(VoteActions.addVoteFailure({ message: error })))
            ))
        )
    })

}