import { connectToMongoDB } from "@/mongo/mongodb";
import { IUser } from "@/types";
import { hash } from "bcryptjs";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../../models/user";

function containsUppercase(str: string) {
    return /[A-Z]/.test(str);
}

function containsNumber(str: string) {
    return /\d/.test(str);
}

function containsSpecialChars(str: string) {
    const specialChars =
      // eslint-disable-next-line no-useless-escape
      /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    connectToMongoDB().catch(err => res.json(err));

    if (req.method === "POST") {
        if(!req.body) return res.status(400).json({error: "Data is missing"});

        const {email, password} = req.body;
        const userExists = await User.findOne({email});

        if(userExists) {
            return res.status(409).json({error: "User already exists"});
        }else {
            if(password.length < 10) {
                return res.status(409).json({error: "Password should be longer than 10 characters"});
            } else if (!containsUppercase(password)) {
                return res.status(409).json({error: "Password should contain a capital letter"});
            } else if (!containsNumber(password)) {
                return res.status(409).json({error: "Password should contain a number"});
            } else if (!containsSpecialChars(password)) {
                return res.status(409).json({error: "Password should contain a special character"});
            }

            const hashedPassword = await hash(password, 12);
            User.create({
                email,
                password: hashedPassword
            }).then((data: IUser) => {
                const user = {
                    email: data.email,
                    _id: data._id
                };
                return res.status(201).json({
                    success: true,
                    user
                });
            }).catch((error: unknown) => {
                if(error && error instanceof mongoose.Error.ValidationError) {
                    // eslint-disable-next-line prefer-const
                    for(let field in error.errors) {
                        const msg = error.errors[field].message;
                        return res.status(409).json({ error: msg});
                    }
                }
            });
        }

    }else {
        res.status(405).json({error: "Method not allowed"});
    }
};

export default handler;