import { createReducer, on } from "@ngrx/store";
import { AuthActions } from '../Actions/auth.actions';
import { IUser } from "../../Models-Angular/User";

export interface AuthInterface {
    id: string

    allUsers: IUser[] 
    allUsersError: string
    allUsersLoading: boolean

    registerSuccessMessage: string,
    registerErrorMessage: string,
    registerLoading: boolean,

    loginSuccessMessage: string,
    loginErrorMessage: string,
    loginLoading: boolean

    updateSuccessMessage: string, 
    updateErrorMessage: string,
    updateLoading: boolean,

    deleteSuccessMessage: string, 
    deleteErrorMessage: string,
    deleteLoading: boolean,

    approveSuccessMessage: string, 
    approveErrorMessage: string,
    approveLoading: boolean,

}

export const initialState: AuthInterface = {

    id: "",

    allUsers: [],
    allUsersError: '',
    allUsersLoading: false,

    registerSuccessMessage: "",
    registerErrorMessage: "",
    registerLoading: false,

    loginSuccessMessage: "",
    loginErrorMessage: "",
    loginLoading: false,

    updateSuccessMessage: '',
    updateErrorMessage: '',
    updateLoading: false,

    deleteSuccessMessage: '',
    deleteErrorMessage: '',
    deleteLoading: false,


    approveSuccessMessage: '', 
    approveErrorMessage: '',
    approveLoading: false,
}

export const authReducer = createReducer(
    initialState,

    // for register
    on(AuthActions.register, (state) => {
        return {
            ...state,
            registerSuccessMessage: '',
            registerErrorMessage: '',
            registerLoading: true
        }

    }),
    on(AuthActions.registerSuccess, (state, { response }) => {
        return {
            ...state,
            registerSuccessMessage: response.message,
            registerErrorMessage: '',
            registerLoading: false
        }

    }),
    on(AuthActions.registerFailure, (state, { message }) => {
        return {
            ...state,
            registerSuccessMessage: '',
            registerErrorMessage: message,
            registerLoading: false
        }

    }),

    // for login

    on(AuthActions.login, (state,) => {
        return {
            ...state,
            loginSuccessMessage: '',
            loginErrorMessage: '',
            loginLoading: true
        }
    }),
    on(AuthActions.loginSuccess, (state, { response }) => {
        return {
            ...state,
            loginSuccessMessage: response.message,
            loginErrorMessage: '',
            loginLoading: false
        }
    }),

    on(AuthActions.loginFailure, (state, { message }) => {
        return {
            ...state,
            loginSuccessMessage: '',
            loginErrorMessage: message,
            loginLoading: false
        }
    }),

    //for getting users
    on(AuthActions.get, (state) => {
        return {
            ...state,
            allUsers: [],
            allUsersError: '',
            allUsersLoading: true
        }
    }),

    on(AuthActions.getSuccess, (state, { allUsers }) => {
        return {
            ...state,
            allUsers: allUsers,
            allUsersError: '',
            allUsersLoading: false
        }
    }),

    on(AuthActions.getFailure, (state, { message }) => {
        return {
            ...state,
            allUsers: [],
            allUsersError: message,
            allUsersLoading: false
        }
    }),

    //for getting a single user

    on(AuthActions.getSpecificUser, (state, { id }) => {
        return {
            ...state,
            id: id
        }
    }),

    on(AuthActions.updateUser, (state) => {
        return {
            ...state,
            updateSuccessMessage: '',
            updateErrorMessage: '',
            updateLoading: true
        }
    }),

    on(AuthActions.updateUserSuccess, (state, { response }) => {
        return {
            ...state,
            updateSuccessMessage: response.message,
            updateErrorMessage: '',
            updateLoading: false
        }
    }),
    on(AuthActions.updateUserFailure, (state, { message }) => {
        return {
            ...state,
            updateSuccessMessage: '',
            updateErrorMessage: message,
            updateLoading: false
        }
    }),

    //for approving official

    on(AuthActions.approveOffical, (state) => {
        return {
            ...state,
            approveSuccessMessage: '',
            approveErrorMessage: '',
            approveLoading: true
        }
    }),

    on(AuthActions.approveOfficalSuccess, (state, { response }) => {
        return {
            ...state,
            approveSuccessMessage: response.message,
            approveErrorMessage: '',
            approveLoading: false
        }
    }),

    on(AuthActions.approveOfficalFailure, (state, { message }) => {
        return {
            ...state,
            approveSuccessMessage: '',
            approveErrorMessage: message,
            approveLoading: false
        }

    }),

    //for deleting
    on(AuthActions.deleteUser, (state) => {
        return {
            ...state,
            deleteSuccessMessage: '',
            deleteErrorMessage: '',
            deleteLoading: true
        }
    }),

    on(AuthActions.deleteUserSuccess, (state, { response }) => {
        return {
            ...state,
            deleteSuccessMessage: response.message,
            deleteErrorMessage: '',
            deleteLoading: false
        }
    }),
    
    on(AuthActions.deleteUserFailure, (state, { message }) => {
        return {
            ...state,
            deleteSuccessMessage: '',
            deleteErrorMessage: message,
            deleteLoading: false
        }
    }),


)

