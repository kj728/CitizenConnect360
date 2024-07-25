import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PollsService } from "../../Services/polls.service";
import { Router } from "@angular/router";
import { PollActions } from "../Actions/poll.action";
import { concatMap, map, catchError, of } from "rxjs";


@Injectable()
export class PollEffects {
    constructor(private action$: Actions, private pollServ: PollsService, private router: Router) { }
    addPoll$ = createEffect(() => {
        return this.action$.pipe(
            ofType(PollActions.addPoll),
            concatMap(req => this.pollServ.addPoll(req.newPoll).pipe(
                map(addPollResponse => PollActions.addPollSuccess({ response: addPollResponse })),
                catchError(error => of(PollActions.addPollFailure({ message: error })))
            ))
        )
    })

    getPolls$ = createEffect(() => {
        return this.action$.pipe(
            ofType(PollActions.get),
            concatMap(() => this.pollServ.getAllPolls().pipe(
                map(response => PollActions.getPollsSuccess({ response: response })),
                catchError(error => of(PollActions.getPollsFailure({ message: error.error.message })))
            ))
        )
    })

    //for one poll
    getPoll$ = createEffect(() => {
        return this.action$.pipe(
            ofType(PollActions.getSpecificPoll),
            concatMap(({ id }) => this.pollServ.getSpecificPoll(id).pipe(
                map(response => PollActions.getSpecificPollSuccess({ poll: response })),
                catchError(error => of(PollActions.getSpecificPollFailure({ message: error })))
            ))
        )
    })


}