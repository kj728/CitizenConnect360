
import { Request, RequestHandler, Response } from "express"
import { IUser, Payload, UserRequest } from "../Models/User"
import { v4 as uid } from 'uuid'
import { RegisterSchema } from "../Input Validation/userValidation";
import bcyrpt from 'bcrypt'
import { DBHelper } from "../Database Helpers";
import { transcode } from "buffer";
import Jwt from 'jsonwebtoken';
import { PasswordSchema } from "../Input Validation/passwordValidaton";
import { EmailSchema } from "../Input Validation/emailValidation";

const dbInstance = new DBHelper();

export const addUser = async (req: UserRequest, res: Response) => {

    try {
        //generate unique id
        const id = uid();
        const { error } = RegisterSchema.validate(req.body)
        if (error) {
            return res.status(500).json({ message: "User input validation failed! " + error })
        }
        //get data from the request
        const { username, email, password, role } = req.body;

        const hashedPassword = await bcyrpt.hash(password, 10)

        await dbInstance.exec('addUser', { id, username, email, password: hashedPassword, role })

        //success message
        return res.status(200).json({ message: "User account created successfully" })

    } catch (error) {
        //error message
        return res.status(500).json({ message: "Something went wrong " + error });
    }



}

export const getAllUsers: RequestHandler = async (req, res) => {

    try {
        const users = (await dbInstance.exec("getAllUsers", {})).recordset as IUser[]
        if (users.length > 0) {
            return res.status(200).json(users)
        }
        return res.status(400).json({ message: "No users found!" });
    } catch (error) {
        //error message
        return res.status(500).json({ message: "Something went wrong " + error });
    }
}

export const getSpecificUserById = async (req: Request<{ id: string }>, res: Response) => {
    try {

        const id = req.params.id;

        const user = (await dbInstance.exec("getSpecificUserById", { id })).recordset[0] as IUser;

        if (user && user.id) {
            return res.status(200).json(user)
        }

        return res.status(400).json({ message: "No user found!" });

    } catch (error) {
        //error message
        return res.status(500).json({ message: "Something went wrong " + error });

    }
}

export const getSpecificUserByEmail = async (req: Request<{ email: string }>, res: Response) => {
    try {

        const email = req.params.email;

        const user = (await dbInstance.exec("getSpecificUserByEmail", { email })).recordset[0] as IUser;

        if (user && user.id) {
            return res.status(200).json(user)
        }

        return res.status(400).json({ message: "No user found!" });

    } catch (error) {
        //error message
        return res.status(500).json({ message: "Something went wrong " + error });

    }
}

export const updateUser = async (req: Request<{ id: string }>, res: Response) => {
    try {

        const id = req.params.id;

        const user = (await dbInstance.exec("getSpecificUserById", { id })).recordset[0] as IUser;

        if (user && user.id) {
            //user exists start update process
            //validate input
            const { error } = RegisterSchema.validate(req.body)
            if (error) {
                return res.status(500).json("User input validation failed! " + error)
            }
            //get data from the request
            const { username, email, password, role } = req.body;

            // const hashedPassword = await bcyrpt.hash(password, 10);

            //update the user
            (await dbInstance.exec("updateUser", { id, username, email, password, role, status: user.status }))
            //success message
            return res.status(200).json({ message: "User updated successfully" })

        }

        return res.status(400).json({ message: "No user found!" });

    } catch (error) {
        //error message
        return res.status(500).json({ message: "Something went wrong " + error });
    }

}

export const deleteUser = async (req: Request<{ id: string }>, res: Response) => {

    try {
        const id = req.params.id;
        const user = (await dbInstance.exec("getSpecificUserById", { id })).recordset[0] as IUser;
        if (user && user.id) {
            //user exists start update process
            await dbInstance.exec("deleteUser", { id })

            //success message
            return res.status(200).json({ message: "User deleted successfully" })
        }

    } catch (error) {
        //error message
        return res.status(500).json({ message: "Something went wrong " + error });
    }

}

export const logInUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        const users = (await dbInstance.exec("getAllUsers", {})).recordset as IUser[]

        if (users.length > 0) {
            //check if user exists
            const user = users.find(u => u.email === email)


            if (user && user.id) {
                // check if user is not deleted
                if (user.isDeleted !== 1) {

                    if (user.status !== 1) {
                        // has no approval to use the website 
                        return res.status(404).json({ message: "You are not approved to access the website" })
                    }
                    // compare password
                    const isPassValid = await bcyrpt.compare(password, user.password)

                    if (isPassValid) {
                        //store user info in payload
                        const payload: Payload = {
                            sub: user.id,
                            username: user.username,
                            role: user.role,
                        }
                        const token = Jwt.sign(payload, process.env.SECRET_KEY as string, { expiresIn: '3d' })
                        //success message
                        return res.status(200).json({ message: "User signed in successfully", token, payload })
                    }

                } else {

                    // has soft delete 
                    return res.status(404).json({ message: "Data Deleted!" })

                }

            }

            return res.status(400).json({ message: "Wrong email or password" });

        }

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong " + error })
    }
}

export const updatePassword = async (req: Request<{ id: string }>, res: Response) => {
    try {
        //get the user

        const { error } = PasswordSchema.validate(req.body)

        if (error) {
            return res.status(500).json({ message: "User input validation failed! " + error })
        }

        const { password } = req.body
        const user = (await dbInstance.exec("getSpecificUserById", { id: req.params.id })).recordset[0] as IUser
        if (user && user.id) {

            // check if user is not deleted
            if (user.isDeleted !== 1) {

                //hash the  new password
                const newHashedPassword = await bcyrpt.hash(password, 10);
                //update the user
                (await dbInstance.exec("updateUser", { id: user.id, username: user.username, email: user.email, password: newHashedPassword, role: user.role, status: user.status }))
                //success message
                return res.status(200).json({ message: "User password updated successfully" })

            } else {
                // has soft delete 
                return res.status(404).json({ message: "Data Deleted!" })
            }
        }
        return res.status(400).json({ message: "No user found!" });

    } catch (error) {

        return res.status(500).json({ message: "Something went wrong " + error })

    }

}

export const forgotPassword = async (req: Request, res: Response) => {

    try {
        const { email } = req.body

        const { error } = EmailSchema.validate(req.body)

        if (error) {
            return res.status(500).json({ message: "User input validation failed! " + error })
        }

        const user = (await dbInstance.exec("getSpecificUserByEmail", { email })).recordset[0] as IUser
        if (user && user.id) {

            console.log(user)
            // check if user is not deleted
            if (user.isDeleted !== 1) {
                //update password reset column
                (await dbInstance.query(`UPDATE users SET passwordReset = 1 WHERE email = '${user.email}'`))

                //success message
                return res.status(200).json({ message: "Password reset link sent to your email" })
            } else {
                // has soft delete 
                return res.status(404).json({ message: "Data Deleted!" })
            }
        }
        return res.status(400).json({ message: "No user found!" });
    } catch (error) {

        return res.status(500).json({ message: "Something went wrong " + error })
    }
}


export const approveOfficial = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const user = (await dbInstance.exec("getSpecificUserById", { id: req.params.id })).recordset[0] as IUser
        if (user && user.id) {
            if (user.isDeleted !== 1) {
                (await dbInstance.exec("updateUser", { id: user.id, username: user.username, email: user.email, password: user.password, role: "Government Official", status: 1 }))
                return res.status(200).json({ message: "User approved successfully" })
            } else {
                return res.status(404).json({ message: "Data Deleted!" })
            }
        }
        return res.status(400).json({ message: "No user found!" });

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong " + error })
    }
}