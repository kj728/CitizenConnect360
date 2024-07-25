import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IncidentInterface } from "../Reducers/incidents.reducer";

const incidentSelectorFeature = createFeatureSelector<IncidentInterface>('incidentR')

export const getAllIncidentsSelector = createSelector(
    incidentSelectorFeature,
    (state) => state.allIncidents
)

export const incidentIdSelector = createSelector(
    incidentSelectorFeature,
    (state) => state.id
)

export const getIncidentById = createSelector(
    getAllIncidentsSelector,
    incidentIdSelector,
    (allincidents,id) => allincidents.find(i=>i.id === id)
)



