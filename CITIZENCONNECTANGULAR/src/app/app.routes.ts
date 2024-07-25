import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { TermsComponent } from './terms/terms.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetComponent } from './reset/reset.component';
import { ProfileComponent } from './profile/profile.component';
import { PollsComponent } from './polls/polls.component';
import { SinglePollComponent } from './single-poll/single-poll.component';
import { AddPollComponent } from './add-poll/add-poll.component';
import { IncidentsComponent } from './incidents/incidents.component';
import { AddIncidentComponent } from './add-incident/add-incident.component';
import { ViewsComponent } from './views/views.component';
import { AddViewComponent } from './add-view/add-view.component';
import { SingleViewComponent } from './single-view/single-view.component';
import { EducateComponent } from './educate/educate.component';
import { AdminComponent } from './admin/admin.component';
import { SingleUserComponent } from './single-user/single-user.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { authGuard } from './Guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'terms', component: TermsComponent },
    { path: 'forgotpassword', component: ForgotComponent },
    { path: 'resetpassword', component: ResetComponent },
    { path: 'profile', canActivate: [authGuard], component: ProfileComponent },
    { path: 'incidents', canActivate: [authGuard], component: IncidentsComponent },
    { path: 'addpoll', component: AddPollComponent },
    { path: 'addincident', component: AddIncidentComponent },
    { path: 'addview', component: AddViewComponent },
    { path: 'educate', canActivate: [authGuard], component: EducateComponent },

    { path: 'admin', canActivate: [authGuard], component: AdminComponent },
    {
        path: 'user', children: [
            { path: ':id', component: SingleUserComponent }

        ]
    },

    {
        path: 'views', canActivate: [authGuard], children: [
            { path: '', component: ViewsComponent },
        ]
    },

    {
        path: 'view', children: [
            { path: ':id', component: SingleViewComponent }
        ],
    },


    {
        path: 'polls', canActivate: [authGuard], children: [
            { path: '', component: PollsComponent },
            { path: ':id', component: SinglePollComponent }

        ]
    },


    {
        path: 'poll', children: [
            { path: ':id', component: SinglePollComponent }
        ],
    },


    { path: '**', component: NotFoundComponent },

];