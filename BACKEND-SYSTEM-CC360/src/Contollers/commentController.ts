import { Request, Response, RequestHandler } from "express";
import { DBHelper } from "../Database Helpers";
import { ExtendedRequest } from "../Middlewares/verifyTokens";
import { v4 as uid } from 'uuid'
import { CommentRequest, IComments } from "../Models/Comment";
import { CommentSchema } from "../Input Validation/commentValidation";



const dbInstance = new DBHelper()

export const addComment = (req: CommentRequest, res: Response) => {
    try {
        const createdby = req.info?.sub
        const role = req.info?.role
        const creatername = req.info?.username

        const id = uid()
        const { comment, viewid } = req.body

        const { error } = CommentSchema.validate(req.body)
        if (error) {
            return res.status(500).json({ message: "User input validation failed! " + error })
        }

        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();


        // Determine AM or PM
        const ampm = hours >= 12 ? 'PM' : 'AM';

        // Convert hours from 24-hour format to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // The hour '0' should be '12'

        // Helper function to add leading zero if needed
        const addLeadingZero = (num: number): string => (num < 10 ? `0${num}` : String(num));

        const formattedDateTime = `${year}-${month}-${day} ${addLeadingZero(hours)}:${addLeadingZero(minutes)}:${addLeadingZero(seconds)} ${ampm}`;
        console.log(formattedDateTime);


        if (createdby && creatername) {
            dbInstance.exec("addComment", { id, comment, viewid, createdby, creatername, createdat: formattedDateTime })
            return res.json({ message: "Comment added successfully" })
        }

    } catch (error) {
        res.status(500).json({ message: "Something went wrong " + error })

    }
}


export const getAllComments: RequestHandler = async (req, res) => {

    try {

        const comments = (await dbInstance.exec("getAllComments", {})).recordset as IComments[];

        if (comments.length > 0) {
            return res.status(200).json(comments)
        }

        return res.status(400).json({ message: "No comments found!" })
    } catch (error) {

        return res.status(500).json({ message: "Something went wrong " + error })
    }
}

export const getSpecificCommentById = async (req: Request<{ id: string }>, res: Response) => {

    try {
        const id = req.params.id;

        const comment = (await dbInstance.exec("getSpecificCommentById", { id })).recordset[0] as IComments;
        if (comment && comment.id) {

            return res.status(200).json(comment)
        }

        return res.status(400).json({ message: "No comment found!" })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong " + error })
    }
}

export const updateComment = async (req: CommentRequest, res: Response) => {

    try {

        const createdby = req.info?.sub
        const role = req.info?.role
        const id = req.params.id
        const { comment } = req.body

        const { error } = CommentSchema.validate(req.body)
        if (error) {
            return res.status(500).json({ message: "User input validation failed! " + error })
        }

        const existingComment = (await dbInstance.exec("getSpecificCommentById", { id })).recordset[0] as IComments;

        //check if comment exists
        if (!existingComment || !existingComment.id) {
            return res.status(400).json({ message: "Comment not found!" })
        }
        //check for soft delete
        if (existingComment.isDeleted === 1) {
            return res.status(400).json({ message: "Cannot update a deleted comment!" })
        }

        //check if user is authorized
        if (!createdby) {
            return res.status(400).json({ message: "You are not authorized to update this comment!" })
        }

        //update the comment
        await dbInstance.exec("updateComment", { id: existingComment.id, comment, viewid: existingComment.viewid, createdby: existingComment.createdby });
        return res.status(200).json({ message: "Comment updated successfully" })


    } catch (error) {
        return res.status(500).json({ message: "Something went wrong " + error })

    }

}

export const deleteComment = async (req: Request<{ id: string }>, res: Response) => {

    try {

        const id = req.params.id

        const existingComment = (await dbInstance.exec("getSpecificCommentById", { id })).recordset[0] as IComments;
        if (existingComment && existingComment.id) {

            await dbInstance.exec("deleteComment", { id: existingComment.id });
            return res.status(200).json({ message: "Comment deleted successfully" })
        }

        return res.status(400).json({ message: "Comment not found!" })
    } catch (error) {

        return res.status(500).json({ message: "Something went wrong " + error })
    }
}