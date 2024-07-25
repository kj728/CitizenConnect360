import { createReducer, on } from "@ngrx/store"
import { CommentsActions } from "../Actions/comments.actions"


export interface CommentInterface {

    id: string

  

    addSuccessMessage: string,
    addErrorMessage: string,
    addLoading: boolean,

}

export const initialState: CommentInterface = {
    id: "",
    addSuccessMessage: '',
    addErrorMessage: '',
    addLoading: false
}


export  const commentReducer =createReducer(
    initialState,
    on(CommentsActions.addComment,(state)=>{
        return{
            ...state,
            addSuccessMessage: '',
            addErrorMessage: '',
            addLoading: true
        }
    }),
    on(CommentsActions.addCommentSuccess,(state, {response})=>{
        return{
            ...state,
            addSuccessMessage: response.message,
            addErrorMessage: '',
            addLoading: false
        }
    }),
    on(CommentsActions.addCommentFailure,(state, {message})=>{
        return{
            ...state,
            addSuccessMessage: '',
            addErrorMessage: message,
            addLoading: false
        }
    })
)