import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PollInterface } from "../Reducers/poll.reducer";

const pollSelectorFeature = createFeatureSelector<PollInterface>('pollR')

export const getAllPollSelector = createSelector(
    pollSelectorFeature,
    (state) => state.allPolls
)

export const pollIdSelector = createSelector(
    pollSelectorFeature,
    (state) => state.id
)

export const getPollById = createSelector(
    getAllPollSelector,
    pollIdSelector,
    (allPolls,id) => allPolls.find(p=>p.poll.id === id)
)