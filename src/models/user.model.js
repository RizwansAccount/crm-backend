import mongoose from "mongoose";
import { ROLE } from "../config/roles.js";

const schemaStructure = {
    name: { type: String, required: true, },
    email: { type: String, required: true, unique : true },
    password: { type: String, required: true },
    role : { type : String, enum : [ROLE.admin, ROLE.manager, ROLE.representative], required : true, default : ROLE.representative }
};

const schema = new mongoose.Schema(schemaStructure, { timestamps: true });
const model = mongoose.model('User', schema);

export const UserModel = model;