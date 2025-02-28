import { UserModel } from "../models/index.js";
import passwordHash from 'password-hash';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';

export const UserService = {
    getAll: async () => {
        return await UserModel.find();
    },

    getById: async (id) => {
        return await UserModel.findOne({ _id: id });
    },

    getCurrentUser : async(user) => {
        return {
            email: user?.email, role: user?.role, user_id: user?.user_id, name : user?.name
        };
    },

    create: async (body) => {
        let { email, password } = body;

        const isUserExist = await UserModel.findOne({ email });

        if (isUserExist) { throw new Error('user already exists!') };

        password = passwordHash?.generate(password);
        return await UserModel.create({ ...body, password });
    },

    login: async (body) => {
        const { email, password } = body;
        const user = await UserModel.findOne({ email: email });

        if (!user) { throw new Error("user does not exist!") };

        const isPasswordValid = passwordHash.verify(password, user?.password);

        if (!isPasswordValid) { throw new Error('invalid password!'); }

        const userDetails = { name : user.name, email: user.email, role: user.role, user_id: user._id, name : user.name };

        const token = jwt.sign(userDetails, config.env.jwtSecret);

        return { token, user_id: user?._id, email: user?.email, role: user?.role, name : user?.name };
    },

    update: async (id, body) => {
        let { password } = body;
        if (password) {
            password = passwordHash?.generate(password);
            body = { ...body, password };
        };
        return await UserModel.findByIdAndUpdate(id, body);
    },

    delete: async (id) => {
        return await UserModel.findByIdAndDelete(id);
    },
};