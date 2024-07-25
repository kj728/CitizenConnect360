import { createReducer, on } from "@ngrx/store";
import { IIncident } from "../../Models-Angular/Incidents";
import { IncidentsActions } from "../Actions/incidents.actions";


export interface IncidentInterface {

    id: string

    allIncidents: IIncident[],
    allIncidentsError: string,
    allIncidentsLoading: boolean,

    addSuccessMessage: string,
    addErrorMessage: string,
    addLoading: boolean,
}

export const initialState: IncidentInterface = {
    id: "",
    

    allIncidents: [],
    allIncidentsError: '',
    allIncidentsLoading: false,


    addSuccessMessage: '',
    addErrorMessage: '',
    addLoading: false,
}


export  const incidentReducer = createReducer(
    initialState,
    //for adding incident
    on(IncidentsActions.addIncident,(state)=>{
        return{
            ...state,
            addSuccessMessage: '',
            addErrorMessage: '',
            addLoading: true
        }
    }),
    on(IncidentsActions.addIncidentSuccess,(state, {response})=>{

        return{
           ...state,
            addSuccessMessage: response.message,
            addErrorMessage: '',
            addLoading: false,
    
        }
    }),
    on(IncidentsActions.addIncidentFailure,(state, {message})=>{
        return{
           ...state,
            addSuccessMessage: '',
            addErrorMessage: message,
            addLoading: false,
        }
    }),

    //for getting incidents

    on(IncidentsActions.get,(state)=>{
        return{
            ...state,
            allIncidents: [],
            allIncidentsError: '',
            allIncidentsLoading: true
        }
    }),
    on(IncidentsActions.getIncidentsSuccess,(state, {response})=>{
        return{
            ...state,
            allIncidents: response,
            allIncidentsError: '',
            allIncidentsLoading: false
        }
    }),
    on(IncidentsActions.getIncidentsFailure,(state, {message})=>{
        return{
            ...state,
            allIncidents: [],
            allIncidentsError: message,
            allIncidentsLoading: false
        }
    })


)