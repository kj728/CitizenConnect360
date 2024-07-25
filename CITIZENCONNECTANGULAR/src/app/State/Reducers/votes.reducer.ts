import { createReducer, on } from "@ngrx/store"
import { VoteActions } from "../Actions/votes.action"

export interface VoteInterface {

    id: string

    addSuccessMessage: string,
    addErrorMessage: string,
    addLoading: boolean,
}


export const initialState: VoteInterface = {
    id: "",

    addSuccessMessage: '',
    addErrorMessage: '',
    addLoading: false
}

export  const voteReducer =createReducer(
    initialState,
    on(VoteActions.addVote,(state)=>{
        return{
            ...state,
            addSuccessMessage: '',
            addErrorMessage: '',
            addLoading: true
        }
    }),
    on(VoteActions.addVoteSuccess,(state, { response})=>{
        return{
            ...state,
            addSuccessMessage: response.message,
            addErrorMessage: '',
            addLoading: false
        }
    }),
    on(VoteActions.addVoteFailure,(state, {message })=>{
        return{
            ...state,
            addSuccessMessage: '',
            addErrorMessage: message,
            addLoading: false
        }
    })

)