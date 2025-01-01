import { ROLE, SOURCE } from "../config/roles.js";
import { ContactModel, LeadModel, UserModel } from "../models/index.js";

const getAllQueryByRole = async (req, Model) => {
    const user_id = req.user.user_id;
    const user_role = req.user.role;
    const query = user_role === ROLE.representative ? { $or: [{ created_by: user_id }, { assigned_to: user_id }] } : {};

    return await Model.find(query)
        .populate('created_by', '_id name email role')
        .populate('assigned_to', '_id name email role')
        .populate('last_updated_by', '_id name email role');
};

const getByIdQueryByRole = async (id, req, Model) => {
    const user_role = req.user.role;
    const user_id = req.user.user_id;
    const query = user_role === ROLE.representative ? { _id: id, $or: [{ assigned_to: user_id }, { created_by: user_id }] } : { _id: id };

    return await Model.findOne(query)
        .populate('created_by', '_id name email role')
        .populate('assigned_to', '_id name email role')
        .populate('last_updated_by', '_id name email role');
};

const createQueryByRole = async (req, body, Model) => {
    const isAssignedToSaleRepresentative = await UserModel.findOne({ _id: body?.assigned_to, role: ROLE.representative });
    if (isAssignedToSaleRepresentative) {
        body = { ...body, created_by: req?.user?.user_id, last_updated_by: req?.user?.user_id };
        return await Model.create(body);
    } else {
        throw new Error('you can only assign to any sale-representative');
    }
};

const updateQueryByRole = async (id, req, Model) => {
    const user_role = req.user.role;
    const user_id = req.user.user_id;
    if (user_role === ROLE.representative) {
        const { created_by, assigned_to, ...allowedUpdates } = req.body;
        const query = await Model.findOneAndUpdate({ _id: id, $or: [{ created_by: user_id }, { assigned_to: user_id }] }, { ...allowedUpdates, last_updated_by: user_id });
        if (!query) {
            throw new Error("you don't have permission to do this action!")
        };
        return query;
    } else {
        return await Model.findByIdAndUpdate(id, { ...req.body, last_updated_by: user_id });
    }
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
