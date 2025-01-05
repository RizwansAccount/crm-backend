import mongoose from "mongoose";
import { ROLE, SOURCE } from "../config/roles.js";
import { AssignmentModel, ContactModel, LeadModel, UserModel } from "../models/index.js";

const getAllQueryByRole = async (req, Model) => {

    const user_id = req.user.user_id;
    const user_role = req.user.role;

    const assignments = await AssignmentModel.find({ assigned_to: user_id });
    const contactIds = assignments?.map((assignment) => new mongoose.Types.ObjectId(assignment?.source_id));

    let pipeline = [
        {
            $lookup: {
                from: 'assignments',
                localField: '_id',
                foreignField: 'source_id',
                as: 'assigned_to',
                pipeline: [
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'assigned_to',
                            foreignField: '_id',
                            as: 'user'
                        }
                    },
                    {
                        $unwind: '$user'
                    },
                    {
                        $project: {
                            _id: '$user._id',
                            name: '$user.name',
                            email: '$user.email',
                            role: '$user.role'
                        }
                    }
                ],
            }
        }
    ];

    if (user_role === ROLE.representative) {
        pipeline?.unshift({
            $match: { $or: [{ created_by: new mongoose.Types.ObjectId(user_id) }, { _id: { $in: contactIds } }] }
        })
    };

    return Model.aggregate(pipeline);
};

const getByIdQueryByRole = async (id, req, Model) => {

    const user_id = req.user.user_id;
    const user_role = req.user.role;

    const assignments = await AssignmentModel.find({ assigned_to: user_id });
    const contactIds = assignments?.map((assignment) => new mongoose.Types.ObjectId(assignment?.source_id));

    let pipeline = [
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
            $lookup: {
                from: 'assignments',
                localField: '_id',
                foreignField: 'source_id',
                as: 'assigned_to',
                pipeline: [
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'assigned_to',
                            foreignField: '_id',
                            as: 'user'
                        }
                    },
                    {
                        $unwind: '$user'
                    },
                    {
                        $project: {
                            _id: '$user._id',
                            name: '$user.name',
                            email: '$user.email',
                            role: '$user.role'
                        }
                    }
                ],
            }
        }
    ];

    if (user_role === ROLE.representative) {
        pipeline.unshift({
            $match: { _id: new mongoose.Types.ObjectId(id), $or: [{ created_by: new mongoose.Types.ObjectId(user_id) }, { _id: { $in: contactIds } }] }
        })
    }

    const data = await Model.aggregate(pipeline);
    return data?.[0] ?? null;
};

const createQueryByRole = async (req, body, Model) => {
    const assgined_to = body?.assigned_to;
    if (assgined_to?.length > 0) {
        const query = await UserModel.find({ _id: { $in: assgined_to }, role: ROLE.representative });
        if ((assgined_to?.length !== query?.length)) {
            throw new Error("you only assigned to any sale-representative");
        };
    }
    const response = await Model.create({ ...body, created_by: req?.user?.user_id, last_updated_by: req?.user?.user_id });

    if (assgined_to?.length > 0) {
        const assignments = assgined_to?.map(assignedToId => ({ source: req?.source, source_id: response?._id, assigned_to: assignedToId }));
        await AssignmentModel.insertMany(assignments);
    };

    return response;
};

const updateQueryByRole = async (id, req, Model) => {
    const user_role = req.user.role;
    const user_id = req.user.user_id;
    const assgined_to = req?.body?.assigned_to;

    if (user_role === ROLE.representative) {
        const isCreatedUser = await Model.findOne({ _id: id, created_by: user_id });
        const isAssignedUser = await AssignmentModel.findOne({ source: req?.source, source_id: id, assigned_to: user_id });
        const isAllow = isCreatedUser || isAssignedUser;

        if (!isAllow) {
            throw new Error("you don't have permission to do this action");
        };
    }

    if (assgined_to?.length > 0) {

        if (user_role === ROLE.representative) {
            throw new Error("You are not allowed to assign to anyone");
        };

        const query = await UserModel.find({ _id: { $in: assgined_to }, role: ROLE.representative });

        if ((assgined_to?.length !== query?.length)) {
            throw new Error("you only assigned to any sale-representative");
        };

        await AssignmentModel.deleteMany({ source: req?.source, source_id: id });

        const assignments = assgined_to?.map(assignedToId => ({ source: req?.source, source_id: id, assigned_to: assignedToId }));
        await AssignmentModel.insertMany(assignments);

    };
    
    return await Model.findByIdAndUpdate(id, { ...req.body, last_updated_by: user_id });
};

const deleteQueryByRole = async (id, req, Model) => {
    const user_role = req.user.role;
    const user_id = req.user.user_id;
    if (user_role === ROLE.representative) {
        const query = await Model.findOneAndDelete({ _id: id, created_by: user_id });
        if (!query) {
            throw new Error("you don't have permission to perform this action!")
        };
        return query;
    } else {
        return await Model.findByIdAndDelete(id);
    }
};

const isAllowedToAttachFileOrNote = async (req) => {
    const body = req.body;
    const user_id = req.user.user_id;
    const user_role = req.user.role;
    const { source_id, source } = body;

    if (user_role !== ROLE.representative) { return true; };

    const models = { [SOURCE.contact]: ContactModel, [SOURCE.lead]: LeadModel };
    const Model = models[source];

    const isExist = await Model.findById(source_id);

    if (!isExist) {
        throw new Error("it does not exist!")
    };

    const query = await Model.findOne({ _id: source_id, $or: [{ created_by: user_id }, { assigned_to: user_id }] });
    if (!query) {
        throw new Error("you don't have permission to perform this action");
    }
    return true;
};

const isAllowedToDeleteFileOrNote = async (req, Model) => {
    const user_id = req.user.user_id;
    const user_role = req.user.role;

    if (user_role !== ROLE.representative) { return true; };

    const isExist = await Model.findById(req.params.id);
    if (!isExist) { throw new Error("it does not exist!") };

    const query = await Model.findOne({ _id: req.params.id, create_by: user_id });

    if (!query) {
        throw new Error("You don't have permission to perform this action");
    }

    return true;
};

const isAllowedToAccessFilesOrNotes = async (req) => {
    const user_id = req?.user?.user_id;
    const user_role = req?.user?.role;
    const source = req?.query?.source;
    const source_id = req?.query?.source_id;

    if (user_role !== ROLE.representative) {
        return true;
    };

    const models = { [SOURCE.contact]: ContactModel, [SOURCE.lead]: LeadModel };

    const Model = models[source];

    const isExist = await Model.findById(source_id);
    if (!isExist) { throw new Error("it does not exist!") };

    const query = await Model.findOne({ _id: source_id, $or: [{ created_by: user_id }, { assigned_to: user_id }] });

    if (!query) {
        throw new Error("you don't have permission to perform this action");
    };

    return query;
};

export {
    getAllQueryByRole, getByIdQueryByRole, createQueryByRole, updateQueryByRole, deleteQueryByRole,
    isAllowedToAttachFileOrNote, isAllowedToDeleteFileOrNote, isAllowedToAccessFilesOrNotes
};
