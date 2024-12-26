import mongoose from "mongoose";

const schemaStructure = {
    name: { type: String, required: true, },
    email: { type: String, required: true, unique : true },
    password: { type: String, required: true },
    role : { type : String, enum : ['admin', 'manager', 'sale-representative'], required : true }
};

const schema = new mongoose.Schema(schemaStructure, { timestamps: true });
const model = mongoose.model('User', schema);

export const UserModel = model;