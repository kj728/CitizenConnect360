import { Request } from "express";
import { ExtendedRequest } from "../Middlewares/verifyTokens";
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

interface addViews {
    title: string,
    description: string,
    viewsummary: string,
    createdby: string,
    createdat: string,
    isDeleted: number
}

export interface ViewRequest extends ExtendedRequest {
    body: addViews;
}

export interface View {
    view: IView,
    commentsArray: IComments[]
}