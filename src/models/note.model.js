import mongoose from "mongoose";
import { SOURCE } from "../config/roles.js";

const schemaStructure = {
    note : { type : String, required : true },
    create_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    last_update_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    source: { type: String, enum: [SOURCE.contact, SOURCE.lead, SOURCE.activity], required: true },
    source_id: { type: mongoose.Schema.Types.ObjectId, refPath: 'source', required: true }
};

const schema = new mongoose.Schema(schemaStructure, { timestamps: true });
const model = mongoose.model('Note', schema);

export const NoteModel = model;