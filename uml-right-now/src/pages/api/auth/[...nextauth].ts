import { connectToMongoDB } from "@/mongo/mongodb";
import { IUser } from "@/types";
import { compare } from "bcryptjs";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../../models/user";

const options: NextAuthOptions = {
    providers:[
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "password", type: "password"}
            },
            async authorize(credentials) {
                await connectToMongoDB().catch(err => {throw new Error(err);});

                const user = await User.findOne({
                    email: credentials?.email
                }).select("+password");

                if(!user) {
                    throw new Error("Invalid credentials");
                }

                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const isPasswordCorrect = await compare(credentials!.password, user.password);

                if(!isPasswordCorrect) {
                    throw new Error("Invalid credentials");
                }

                return user;

            }
        })
    ],
    pages: {
        signIn: "/login"
    },
    session: {
        strategy: "jwt"
    },
    callbacks: {
        jwt: async ({token, user}) => {
            user && (token.user = user);
            return token;
        },
        session: async({session, token}) => {
            const user = token.user as IUser;
            session.user = user;
            return session;
        }
    }

};


export default NextAuth(options);