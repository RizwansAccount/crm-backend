import { ROLE, SOURCE } from "../config/roles.js";
import {
  AssignmentModel,
  ContactModel,
  LeadModel,
  UserModel,
} from "../models/index.js";

export const AssignmentService = {
  getAll: async (req) => {
    const user_id = req.user.user_id;
    const user_role = req.user.role;
    const { source, source_id } = req.query;
    let query =
      user_role === ROLE.representative
        ? { assigned_to: user_id, source, source_id }
        : { source, source_id };

    return await AssignmentModel.find(query).populate(
      "assigned_to",
      "_id name email role"
    );
  },

  createAndUpdate: async (req, body) => {

    const user_role = req?.user?.role;
    const user_id = req?.user?.user_id;

    if (user_role === ROLE.representative) {
      throw new Error("you don't have permission to do this action!");
    };

    const { source, source_id, assigned_to } = body;
    const models = { [SOURCE.contact]: ContactModel, [SOURCE.lead]: LeadModel };
    const Model = models[source];
    const sourceData = await Model.findById(source_id);

    if (!sourceData) {
      throw new Error("source not found!");
    }

    if (assigned_to?.length > 0) {
      const users = await UserModel.find({_id: { $in: assigned_to }, role: ROLE.representative });
      if (users?.length !== assigned_to?.length) {
        throw new Error("only assigned to sale representatives!");
      }
    }

    await Model.findByIdAndUpdate(source_id, { last_updated_by : user_id });

    await AssignmentModel.deleteMany({ source, source_id });

    const query = assigned_to?.map((user_id) => ({source, source_id, assigned_to: user_id, }));

    return await AssignmentModel.insertMany(query);
  },

  delete: async (req) => {
    const user_role = req.user.role;
    const { source, source_id, user_id } = req?.body;

    if (user_role === ROLE.representative) {
      throw new Error("you don't have permission to do this action!");
    }

    const query = await AssignmentModel.findOne({
      source,
      source_id,
      assigned_to: user_id,
    });

    if (!query) {
      throw new Error("assignment not found!");
    };

    return await AssignmentModel.deleteOne({
      source,
      source_id,
      assigned_to: user_id,
    });
  },
};
