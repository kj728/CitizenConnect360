import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { addIncident, AddIncidentResponse, IIncident } from "../../Models-Angular/Incidents";

export const IncidentsActions = createActionGroup({
    source: 'INCIDENTS API',
    events: {

        //add incidents actions
        'add Incident': props<{ newIncident: addIncident }>(),
        'add Incident success': props<{ response: AddIncidentResponse }>(),
        'add Incident failure': props<{ message: string }>(),


        //get incident s actions
        'get': emptyProps(),
        'get Incidents success': props<{ response: IIncident[] }>(),
        'get Incidents failure': props<{ message: string }>(),



    }
})