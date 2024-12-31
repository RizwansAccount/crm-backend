import { ROLE } from "../config/roles.js";
import { UserModel } from "../models/index.js";

const getAllQueryByRole = async (req, Model) => {
    const user_id = req.user.user_id;
    const user_role = req.user.role;
    if (user_role === ROLE.representative) {
        return await Model.find({ $or: [{ created_by: user_id }, { assigned_to: user_id }] })
        .populate('created_by', '_id name email role')
        .populate('assigned_to', '_id name email role')
        .populate('last_updated_by', '_id name email role');
    } else {
        return await Model.find()
        .populate('created_by', '_id name email role')
        .populate('assigned_to', '_id name email role')
        .populate('last_updated_by', '_id name email role');
    }
};

const getByIdQueryByRole = async (id, req, Model) => {
    const user_role = req.user.role;
    const user_id = req.user.user_id;

    if (user_role === ROLE.representative) {
        return await Model.findOne({ _id: id, $or: [{ assigned_to: user_id }, { created_by: user_id }] })
        .populate('created_by', '_id name email role')
        .populate('assigned_to', '_id name email role')
        .populate('last_updated_by', '_id name email role');
    } else {
        return await Model.findOne({ _id: id })
        .populate('created_by', '_id name email role')
        .populate('assigned_to', '_id name email role')
        .populate('last_updated_by', '_id name email role');
    }
};

const createQueryByRole = async (req, body, Model) => {
    const isAssignedToSaleRepresentative = await UserModel.findOne({ _id: body?.assigned_to, role: ROLE.representative });
    if (isAssignedToSaleRepresentative) {
        body = { ...body, created_by: req?.user?.user_id, last_updated_by : req?.user?.user_id };
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
        return await Model.findOneAndUpdate({ _id: id, $or: [{ created_by: user_id }, { assigned_to: user_id }] }, {...allowedUpdates, last_updated_by : user_id});
    } else {
        return await Model.findByIdAndUpdate(id, { ...req.body, last_updated_by : user_id });
    }
};

const deleteQueryByRole = async (id, req, Model) => {
    const user_role = req.user.role;
    const user_id = req.user.user_id;
    if (user_role === ROLE.representative) {
        return await Model.findOneAndDelete({ _id: id, created_by: user_id });
    } else {
        return await Model.findByIdAndDelete(id);
    }

};

export { getAllQueryByRole, getByIdQueryByRole, createQueryByRole, updateQueryByRole, deleteQueryByRole };