import { Router } from "@angular/router";
import { ViewsService } from "../../Services/views.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { concatMap, map, catchError, of, mergeMap } from "rxjs";
import { ViewActions } from "../Actions/views.action";
import { response } from "express";


@Injectable()
export class ViewEffects {
    constructor(private action$: Actions, private viewServ: ViewsService, private router: Router) { }


    addView$ = createEffect(() => {
        return this.action$.pipe(
            ofType(ViewActions.addView),
            concatMap(req => this.viewServ.addView(req.newView).pipe(
                map(addViewResponse => ViewActions.addViewSuccess({ response: addViewResponse })),
                catchError(error => of(ViewActions.addViewFailure({ message: error })))
            ))
        )
    })

    getViews$ = createEffect(() => {
        return this.action$.pipe(
            ofType(ViewActions.get),
            concatMap(() => this.viewServ.getAllViews().pipe(
                map(allViews => ViewActions.getViewSuccess({ response: allViews })),
                catchError(error => of(ViewActions.getViewFailure({ message: error.error.message })))
            ))
        )
    })

    //for oneview
    getView$ = createEffect(() => {
        return this.action$.pipe(
            ofType(ViewActions.getSpecificView),
            mergeMap(({id}) => this.viewServ.getSpecificViewById(id).pipe(
                map(response => ViewActions.getSpecificViewSuccess({ view: response })),
                catchError(error => of(ViewActions.getSpecificViewFailure({ message: error.error.message })))
            ))
        )
    })

    


}
