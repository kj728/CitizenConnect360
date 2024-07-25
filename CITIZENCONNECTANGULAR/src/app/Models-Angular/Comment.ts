import { Request } from "express"

export interface IComments{
    id: string,
    comment: string,
    viewid: string,
    createdby: string,
    creatername: string,
    createdat: string,
    isDeleted: number
}

export interface addComment{
    comment: string,
    viewid:string
}

export interface AddCommentResponse{
    message: string
}

