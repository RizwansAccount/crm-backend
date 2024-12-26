import express from "express";
import userRoute from './user.route.js';
import contactRoute from './contact.route.js';

// routes
const protectedRouter = express.Router();
const unProtectedRouter = express.Router();

// Protected Routes
protectedRouter.use("/contact", contactRoute);

// Un-Protected Routes
unProtectedRouter.use("/user", userRoute);

export { protectedRouter, unProtectedRouter };