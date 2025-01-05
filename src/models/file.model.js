import mongoose from "mongoose";

const schemaStructure = {
    original_name: { type: String, required: true },
    current_name: { type: String, required: true },
    type: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true },
    link: { type: String, required: true },
    create_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    last_update_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    source: { type: String, enum: ['Contact', 'Lead', 'Activity'], required: true },
    source_id: { type: mongoose.Schema.Types.ObjectId, refPath: 'source', required: true }
};

const schema = new mongoose.Schema(schemaStructure, { timestamps: true });
const model = mongoose.model('File', schema);

export const FileModel = model;