import { createActionGroup, props } from "@ngrx/store";
import { addVote, AddVoteResponse } from "../../Models-Angular/Votes";


export const VoteActions = createActionGroup({
    source: 'VOTE API',
    events: {
        //add vote action
        'add Vote': props<{ newVote: addVote }>(),
        'add Vote success': props<{ response: AddVoteResponse }>(),
        'add Vote failure': props<{ message: string }>(),
    }

})