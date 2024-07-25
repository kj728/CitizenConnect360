import { Request } from "express"
import { ExtendedRequest } from "../Middlewares/verifyTokens"

export interface IComments{
    id: string,
    comment: string,
    viewid: string,
    createdby: string,
    creatername: string,
    createdat: string,
    isDeleted: number
}

interface addComment{
    comment: string,
    createdby: string,
    viewid:string
    createdat: string,
    isDelted: number
}

export interface CommentRequest extends ExtendedRequest{
    body: addComment
}
