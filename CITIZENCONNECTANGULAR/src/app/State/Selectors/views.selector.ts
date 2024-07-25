import { createFeatureSelector, createSelector } from "@ngrx/store"
import { ViewInterface } from "../Reducers/viewsReducer"

const viewSelectorFeature = createFeatureSelector<ViewInterface>('viewR')

export const errorSelectorAdd =createSelector(viewSelectorFeature,(state)=>state.addErrorMessage)
export const successSelectorAdd = createSelector(viewSelectorFeature,(state)=>state.addSuccessMessage)


export const getAllViewsSelector = createSelector(
    viewSelectorFeature,
    (state) => state.allViews
)

export const viewIdSelector = createSelector(
    viewSelectorFeature,
    (state) => state.id
)

export const getViewById = createSelector(
    getAllViewsSelector,
    viewIdSelector,
    (allviews,id) => allviews.find(v=>v.view.id === id)
)

export const commentsSelector = createSelector(
    getViewById,
    (view) => view?.commentsArray
)




