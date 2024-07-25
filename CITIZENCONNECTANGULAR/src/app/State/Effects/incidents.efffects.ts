import { Actions, createEffect, ofType } from "@ngrx/effects";
import { IncidentsService } from "../../Services/incidents.service";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { IncidentsActions } from "../Actions/incidents.actions";
import { concatMap, map, catchError, of } from "rxjs";


@Injectable()
export class IncidentsEffects {
    constructor(private action$: Actions, private incidentServ: IncidentsService, private router: Router) { }

    addIncident$ = createEffect(() => {
        return this.action$.pipe(
            ofType(IncidentsActions.addIncident),
            concatMap(req => this.incidentServ.adddIncident(req.newIncident).pipe(
                map(addIncidentResponse => IncidentsActions.addIncidentSuccess({ response: addIncidentResponse })),
                catchError(error => of(IncidentsActions.addIncidentFailure({ message: error })))
            ))
        )
    })

    getIncidents$ = createEffect(() => {
        return this.action$.pipe(
            ofType(IncidentsActions.get),
            concatMap(() => this.incidentServ.getAllIncidents().pipe(
                map(response => IncidentsActions.getIncidentsSuccess({ response: response })),
                catchError(error => of(IncidentsActions.getIncidentsFailure({ message: error.error.message })))
            ))
        )
    })

    

}
