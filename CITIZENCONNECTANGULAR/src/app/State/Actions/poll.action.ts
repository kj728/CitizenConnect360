import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { addPoll, AddPollResponse, Poll } from "../../Models-Angular/Poll";



export const PollActions = createActionGroup({
    source: 'POLL API',
    events: {

        //add poll action
        'add Poll': props<{ newPoll: addPoll }>(),
        'add Poll success': props<{ response: AddPollResponse }>(),
        'add Poll failure': props<{ message: string }>(),

        //get polls action
        'get': emptyProps(),
        'get Polls success': props<{ response: Poll[] }>(),
        'get Polls failure': props<{ message: string }>(),

        //get specific poll
        'get specificPoll': props<{ id: string }>(),
        'get specificPoll success': props<{ poll: Poll; }>(),
        'get specificPoll failure': props<{ message: string }>(),


    }
})