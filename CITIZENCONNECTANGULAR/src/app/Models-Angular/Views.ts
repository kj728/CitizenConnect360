import { Request } from "express";

import { IComments } from "./Comment";

export interface IView {
    id: string,
    title: string,
    description: string,
    viewsummary: string,
    createdby: string,
    creatername: string,
    createdat: string,
    isDeleted: number

}

export interface addView {
    title: string,
    description: string,
    viewsummary: string,
    createdby: string,
    createdat: string,
    isDeleted: number
}


export interface View {
    view: IView,
    commentsArray: IComments[]
}


export interface AddViewResponse{
    message: string
}



