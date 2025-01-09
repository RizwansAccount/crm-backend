import mongoose from "mongoose";

const schemaStructure = {
    pipeline_id: {type : mongoose.Schema.Types.ObjectId, ref: 'Pipeline', required: true},
    name: {type: String, required: true, unique: true},
    created_by: {type : mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    last_updated_by: {type : mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
};

const schema = new mongoose.Schema(schemaStructure, { timestamps: true });
const model = mongoose.model('Stage', schema);

export const StageModel = model;