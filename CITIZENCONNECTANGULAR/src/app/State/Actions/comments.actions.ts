import { createActionGroup, props } from "@ngrx/store";
import { addComment, AddCommentResponse } from "../../Models-Angular/Comment";



export const CommentsActions = createActionGroup({
    source: 'COMMENTS API',
    events: {

        'add Comment': props<{ newComment: addComment }>(),
        'add Comment success': props<{ response: AddCommentResponse }>(),
        'add Comment failure': props<{ message: string }>(),

    }
})