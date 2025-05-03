import mongoose, { Document, Model } from 'mongoose'

export interface IUser {
    username: string,
    password: string
    email: string,
    picture: string,
    name: string
}

export interface IUserDocument extends IUser, Document {
    createdAt: Date,
    updatedAt: Date
}

const userSchema = new mongoose.Schema<IUserDocument>({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    picture: {
        type: String
    },
    name: {
        type: String
    }
})

const User: Model<IUserDocument> = mongoose.models?.User || mongoose.model("User", userSchema)

export default User