import { AuthInterface } from "./Reducers/auth.reducer";
import { CommentInterface } from "./Reducers/comments.reducer";
import { IncidentInterface } from "./Reducers/incidents.reducer";
import { PollInterface } from "./Reducers/poll.reducer";
import { ViewInterface } from "./Reducers/viewsReducer";
import { VoteInterface } from "./Reducers/votes.reducer";

export interface AppState {
    auth: AuthInterface
    views: ViewInterface
    comments: CommentInterface
    incidents:IncidentInterface
    polls:PollInterface
    votes:VoteInterface

}