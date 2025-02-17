import mongoose from "mongoose";
import { ROLE } from "../config/roles.js";
import { OpportunityModel } from "../models/index.js";
import { isAllowedToAccessOpporunity, isAllowedToCreateOpportunity, isAllowedToUpdateOpportunity } from "../utils/queriesByRole.js";

const getOpportunityPipeline = ({ source, source_id }) => {
    let pipeline = [
        {
            $match: {
                source: source,
                source_id: new mongoose.Types.ObjectId(source_id)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "created_by",
                foreignField: "_id",
                as: "created_by"
            }
        },
        {
            $unwind: '$created_by'
        },
        {
            $lookup: {
                from: "users",
                localField: "last_updated_by",
                foreignField: "_id",
                as: "last_updated_by"
            }
        },
        {
            $unwind: '$last_updated_by'
        },
        {
            $lookup: {
                from: "stages",
                localField: "stage_id",
                foreignField: "_id",
                as: "current_stage",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            pipeline_id: 1
                        }
                    }
                ]
            }
        },
        {
            $unwind : "$current_stage"
        },
        {
            $lookup: {
                from: "stages",
                localField: "pipeline_id",
                foreignField: "pipeline_id",
                as: "stages",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            pipeline_id: 1
                        }
                    }
                ]
            }
        },
        {
            $project: {
                _id: 1,
                pipeline_id: 1,
                source:1,
                source_id:1,
                expected_revenue: 1,
                close_date: 1,
                stage_id: 1,
                current_stage: 1,
                stages: 1,
                created_by: { _id: 1, name: 1, email: 1, role: 1 },
                last_updated_by: { _id: 1, name: 1, email: 1, role: 1 }
            }
        }
    ];
    return pipeline;
};

export const OpportunityService = {
    getAll: async (req) => {

        const isAllow = await isAllowedToAccessOpporunity(req);
        // if (!isAllow) { throw new Error("You don't have permission to do this action!"); };
        if (!isAllow) { return [] };

        const source = req?.query?.source;
        const source_id = req?.query?.source_id;

        // return await OpportunityModel.find({ source, source_id })
        //     .populate('created_by', '_id name email role')
        //     .populate('last_updated_by', '_id name email role');

        const pipeline = getOpportunityPipeline({ source, source_id });
        return await OpportunityModel.aggregate(pipeline);

    },

    getById: async (id, req) => {

        const isAllow = await isAllowedToAccessOpporunity(req);
        // if (!isAllow) { throw new Error("You don't have permission to do this action!"); };
        if (!isAllow) { return {} };

        const source = req?.query?.source;
        const source_id = req?.query?.source_id;

        let pipeline = getOpportunityPipeline({ source, source_id });

        pipeline.unshift({ $match: { _id: new mongoose.Types.ObjectId(id) } });
        const data = await OpportunityModel.aggregate(pipeline);
        return data?.[0];

        // return await OpportunityModel.findOne({ _id: id, source, source_id })
        //     .populate('created_by', '_id name email role')
        //     .populate('last_updated_by', '_id name email role');
    },

    create: async (req) => {
        const body = await isAllowedToCreateOpportunity(req);
        if (!body) { throw new Error("You don't have permission to do this action!"); };
        return await OpportunityModel.create(body);
    },

    update: async (id, req) => {
        const body = await isAllowedToUpdateOpportunity(req);
        if (!body) { throw new Error("You don't have permission to do this action!"); };
        return await OpportunityModel.findByIdAndUpdate(id, body);
    },

    delete: async (id, req) => {

        const user_id = req?.user?.user_id;
        const user_role = req?.user?.role;

        if (user_role === ROLE.representative) {
            const isAllow = await OpportunityModel.findOne({ _id: id, created_by: user_id });
            if (!isAllow) { throw new Error("You don't have permission to do this action!"); };
            return await OpportunityModel.findByIdAndDelete(id);
        };

        return await OpportunityModel.findByIdAndDelete(id);
    }
}