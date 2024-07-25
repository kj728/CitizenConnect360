import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { AuthEffects } from './State/Effects/auth.effects';
import { provideHttpClient } from '@angular/common/http';
import { viewReducer } from './State/Reducers/viewsReducer';
import { ViewEffects } from './State/Effects/view.effects';
import { commentReducer } from './State/Reducers/comments.reducer';
import { CommentEffects } from './State/Effects/comment.effects';
import { authReducer } from './State/Reducers/auth.reducer';
import { incidentReducer } from './State/Reducers/incidents.reducer';
import { IncidentsEffects } from './State/Effects/incidents.efffects';
import { pollReducer } from './State/Reducers/poll.reducer';
import { PollEffects } from './State/Effects/poll.effect';
import { voteReducer } from './State/Reducers/votes.reducer';
import { VotesEffects } from './State/Effects/votes.effects';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  provideHttpClient(),
  provideStore({ authR: authReducer, viewR:viewReducer ,commentR:commentReducer,incidentR:incidentReducer, pollR:pollReducer, voteR:voteReducer },),
  provideEffects([AuthEffects,ViewEffects,CommentEffects,IncidentsEffects,PollEffects,VotesEffects]),
  provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })],
  
};
