import { createReducer, on } from "@ngrx/store"
import { Poll } from "../../Models-Angular/Poll"
import { PollActions } from "../Actions/poll.action"


export interface PollInterface {

    id: string

    allPolls: Poll[],
    allPollsError: string,
    allPollsLoading: boolean,

    addSuccessMessage: string,
    addErrorMessage: string,
    addLoading: boolean,

    poll: Poll
    getSpecificPollErrorMessage: string,
    getSpecificPollLoading: boolean,

}

export const initialState: PollInterface = {
    id: "",
    allPolls: [],
    allPollsError: '',
    allPollsLoading: false,

    addSuccessMessage: '',
    addErrorMessage: '',
    addLoading: false,

    poll: {} as Poll,
    getSpecificPollErrorMessage: '',
    getSpecificPollLoading: false,
}


export  const pollReducer = createReducer(
    initialState,
    //for adding poll
    on(PollActions.addPoll,(state)=>{
        return{
            ...state,
            addSuccessMessage: '',
            addErrorMessage: '',
            addLoading: true
        }
    }),
    on(PollActions.addPollSuccess,(state, {response})=>{
        return{
            ...state,
            addSuccessMessage: response.message,
            addErrorMessage: '',
            addLoading: false
        }
    }),
    on(PollActions.addPollFailure,(state, {message})=>{
        return{
            ...state,
            addSuccessMessage: '',
            addErrorMessage: message,
            addLoading: false,
        }
    }),

    //for getting all polls
    on(PollActions.get,(state)=>{
        return{
            ...state,
            allPolls: [],
            allPollsError: '',
            allPollsLoading: true
        }
    }),
    on(PollActions.getPollsSuccess,(state, {response})=>{
        return{
            ...state,
            allPolls: response,
            allPollsError: '',
            allPollsLoading: false,
        }
    }),
    on(PollActions.getPollsFailure,(state, {message})=>{
        return{
            ...state,
            allPolls: [],
            allPollsError: message,
            allPollsLoading: false,
        }
    }),

    //for getting specific poll
    on(PollActions.get,(state)=>{
        return{
            ...state,
            poll: {} as Poll,
            getSpecificPollErrorMessage: '',
            getSpecificPollLoading: true
        }
    }),
    on(PollActions.getSpecificPollSuccess,(state, {poll})=>{
        return{
            ...state,
            poll: poll,
            getSpecificPollErrorMessage: '',
            getSpecificPollLoading: false,
        }
    }),
    on(PollActions.getSpecificPollFailure,(state, {message})=>{
        return{
            ...state,
            poll: {} as Poll,
            getSpecificPollErrorMessage: message,
            getSpecificPollLoading: false,
        }
    }),

);

