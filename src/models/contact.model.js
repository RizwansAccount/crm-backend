import mongoose from "mongoose";

const schemaStructure = {
    name: { type: String, required: true, },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    company: { type: String, required: true },
    tags: [{ type: String }],
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    last_updated_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
};

const schema = new mongoose.Schema(schemaStructure, { timestamps: true });
const model = mongoose.model('Contact', schema);

export const ContactModel = model;