import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthenticationService } from "../../Services/authentication.service";
import { concatMap, map, catchError, of, mergeMap } from "rxjs";
import { AuthActions } from "../Actions/auth.actions";
import { Router } from "@angular/router";


@Injectable()
export class AuthEffects {
    constructor(private action$: Actions, private authServ: AuthenticationService, private router: Router) { }


    registerUser$ = createEffect(() => {
        return this.action$.pipe(
            //filtering all actions and listening to the register action
            ofType(AuthActions.register),
            //receiving input from the action and reaching out to the service
            concatMap(req => this.authServ.registerUser(req.user).pipe(
                map(registerResponse => AuthActions.registerSuccess({ response: registerResponse })),
                catchError(error => of(AuthActions.registerFailure({ message: error })))
            ))
        )
    })

    logInUser$ = createEffect(() => {
        return this.action$.pipe(
            //filtering all actions and listening to the login action
            ofType(AuthActions.login),
            //receiving input from the action and reaching out to the service
            concatMap(req => this.authServ.loginUser(req.user).pipe(
                map(loginResponse => {
                    //add token  to local storage 
                    localStorage.setItem('token', loginResponse.token)
                    // add payload to local storage
                    localStorage.setItem('currentUser', JSON.stringify(loginResponse.payload));
                    // navigate to home page after sign-in

                    setTimeout(() => {

                        if (loginResponse.payload.role == "Admin") {
                            this.router.navigate(['/admin']).then(() => {
                                window.location.reload();
                            });

                        } else {

                            this.router.navigate(['']).then(() => {
                                window.location.reload();
                            });

                        }



                    }, 1000)

                    return AuthActions.loginSuccess({ response: loginResponse });
                }),
                catchError(error => of(AuthActions.loginFailure({ message: error })))
            ))
        )
    })

    getUsers$ = createEffect(() => {
        return this.action$.pipe(
            ofType(AuthActions.get),
            mergeMap(() => this.authServ.getAllUsers().pipe(
                map(response => AuthActions.getSuccess({ allUsers: response })),
                catchError(error => of(AuthActions.getFailure({ message: error.error.message })))
            ))
        )
    })

    getUser$ = createEffect(() => {
        return this.action$.pipe(
            ofType(AuthActions.getSpecificUser),
            mergeMap(({ id }) => this.authServ.getSpecificUser(id).pipe(
                map(response => AuthActions.getSpecificUserSuccess({ user: response })),
                catchError(error => of(AuthActions.getSpecificUserFailure({ message: error.error.message })))
            ))
        )
    })

    updateUser$ = createEffect(() => {
        return this.action$.pipe(
            ofType(AuthActions.updateUser),
            mergeMap(({ updatedUser, id }) => this.authServ.updateUser(updatedUser, id).pipe(
                map(response => AuthActions.updateUserSuccess({ response: response })),
                catchError(error => of(AuthActions.updateUserFailure({ message: error })))
            ))
        )
    })

    approveOffical$ = createEffect(() => {
        return this.action$.pipe(
            ofType(AuthActions.approveOffical),
            mergeMap(({ id }) => this.authServ.approveOfficial(id).pipe(
                map(response => {
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000)
                    return AuthActions.approveOfficalSuccess({ response: response });
                }),
                catchError(error => of(AuthActions.approveOfficalFailure({ message: error })))
            ))
        )
    })


    deleteUser$ = createEffect(() => {
        return this.action$.pipe(
            ofType(AuthActions.deleteUser),
            mergeMap(({ id }) => this.authServ.deleteUser(id).pipe(
                map(response => {
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000)
                    return AuthActions.deleteUserSuccess({ response: response });
                }),
                catchError(error => of(AuthActions.deleteUserFailure({ message: error })))
            ))
        )
    })

}