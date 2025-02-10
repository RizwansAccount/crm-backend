import mongoose from "mongoose";
import { LEAD_STATUS } from "../config/roles.js";

const schemaStructure = {
    name: { type: String, required: true, },
    contact: { type: Number, required: true },
    lead_source: { type: String, required: true },
    status: { type: String, enum: [LEAD_STATUS.new, LEAD_STATUS.contacted, LEAD_STATUS.qualified, LEAD_STATUS.lost], required: true, default: LEAD_STATUS.new },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    last_updated_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
};

const schema = new mongoose.Schema(schemaStructure, { timestamps: true });
const model = mongoose.model('Lead', schema);

export const LeadModel = model;