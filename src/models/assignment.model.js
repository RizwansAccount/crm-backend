import mongoose from "mongoose";

const schemaStructure = {
    source: { type: String, enum: ['Contact', 'Lead'], required: true, },
    source_id: { type: mongoose.Schema.Types.ObjectId, refPath: 'source', required: true, },
    assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, },
};

const schema = new mongoose.Schema(schemaStructure, { timestamps: true });
const model = mongoose.model('Assignment', schema);

export const AssignmentModel = model;