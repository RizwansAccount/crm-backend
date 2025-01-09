import mongoose from "mongoose";
import { SOURCE } from "../config/roles.js";

const schemaStructure = {
    pipeline_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Pipeline', required: true },
    source: { type: String, enum: [SOURCE.contact, SOURCE.lead, SOURCE.activity], required: true },
    source_id: { type: mongoose.Schema.Types.ObjectId, refPath: 'source', required: true },
    expected_revenue: { type: Number, required: true },
    close_date: { type: Date, required: true },
    stage_id: { type: mongoose.Schema.Types.ObjectId, ref : 'Stage', required : true },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    last_updated_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
};

const schema = new mongoose.Schema(schemaStructure, { timestamps: true });
const model = mongoose.model('Opportunity', schema);

export const OpportunityModel = model;