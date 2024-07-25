import { createFeatureSelector, createSelector } from "@ngrx/store"
import { AuthInterface } from "../Reducers/auth.reducer"

const authSelectorFeature = createFeatureSelector<AuthInterface>('authR')

export const errorSelectorLI =createSelector(authSelectorFeature,(state)=>state.loginErrorMessage)
export const successSelectorLI = createSelector(authSelectorFeature,(state)=>state.loginSuccessMessage)

export const errorSelectorRG =createSelector(authSelectorFeature,(state)=>state.registerErrorMessage)
export const successSelectorRG = createSelector(authSelectorFeature,(state)=>state.registerSuccessMessage)

export const getAllUserSelector = createSelector(
    authSelectorFeature,
    (state) => state.allUsers
)

export const userIdSelector = createSelector(
    authSelectorFeature,
    (state) => state.id
)

export const userSelector = createSelector(
    getAllUserSelector,
    userIdSelector,
    (allusers,id) => allusers.find(u=>u.id === id)
)


