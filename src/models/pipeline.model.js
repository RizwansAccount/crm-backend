import mongoose from "mongoose";

const schemaStructure = {
    name : { type: String, required: true },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    last_updated_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
};

const schema = new mongoose.Schema(schemaStructure, { timestamps: true });
const model = mongoose.model('Pipeline', schema);

export const PipelineModel = model;