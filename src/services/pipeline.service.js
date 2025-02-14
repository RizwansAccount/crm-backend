import mongoose from "mongoose";
import { ROLE } from "../config/roles.js";
import { PipelineModel, StageModel } from "../models/index.js";

const getPipelineByRole = () => {
    let pipeline = [
        {
            $lookup: {
                from: 'users',
                localField: 'created_by',
                foreignField: '_id',
                as: 'created_by'
            }
        },
        {
            $unwind: '$created_by'
        },
        {
            $lookup: {
                from: 'users',
                localField: 'last_updated_by',
                foreignField: '_id',
                as: 'last_updated_by'
            }
        },
        {
            $unwind: '$last_updated_by'
        },
        {
            $lookup: {
                from: 'stages',
                localField: '_id',
                foreignField: 'pipeline_id',
                as: 'stages',
                pipeline: [
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'created_by',
                            foreignField: '_id',
                            as: 'created_by'
                        }
                    },
                    {
                        $unwind: '$created_by'
                    },
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'last_updated_by',
                            foreignField: '_id',
                            as: 'last_updated_by'
                        }
                    },
                    {
                        $unwind: '$last_updated_by'
                    },
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            // created_by: { _id: 1, name: 1, email: 1, role: 1 },
                            // last_updated_by: { _id: 1, name: 1, email: 1, role: 1 }
                        }
                    }
                ]
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                stages: 1,
                created_by: { _id: 1, name: 1, email: 1, role: 1 },
                last_updated_by: { _id: 1, name: 1, email: 1, role: 1 }
            }
        }
    ];
    return pipeline;
}

export const PipelineService = {
    getAll: async () => {
        const pipeline = getPipelineByRole();
        return await PipelineModel.aggregate(pipeline);
    },

    getById: async (id) => {

        let pipeline = getPipelineByRole();
        pipeline.unshift({ $match: { _id: new mongoose.Types.ObjectId(id) } });
        const data = await PipelineModel.aggregate(pipeline);
        return data?.[0];
    },

    create: async (req, body) => {
        const user_id = req?.user?.user_id;
        if (req?.user?.role === ROLE.representative) {
            throw new Error("You don't have permission to do this action");
        };


        const pipeline = await PipelineModel.create({ ...body, created_by: user_id, last_updated_by: user_id });

        if (req?.body?.stages?.length > 0) {
            const allStagesData = req?.body?.stages?.map((stage) => ({
                name: stage, pipeline_id: pipeline?._id, created_by: user_id, last_updated_by: user_id
            }));
            await StageModel.insertMany(allStagesData);
        };

        return pipeline;
    },

    update: async (id, req) => {
        if (req?.user?.role === ROLE.representative) {
            throw new Error("You don't have permission to do this action");
        };
        return await PipelineModel.findByIdAndUpdate(id, { ...req?.body, last_updated_by: req?.user?.user_id });
    },

    delete: async (id, req) => {
        if (req?.user?.role === ROLE.representative) {
            throw new Error("You don't have permission to do this action");
        };
        await PipelineModel.findByIdAndDelete(id);
        return await StageModel.deleteMany({pipeline_id : id});
    }
}