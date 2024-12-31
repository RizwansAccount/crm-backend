import express from "express";
import userRoute from './user.route.js';
import contactRoute from './contact.route.js';
import fileRoute from './file.route.js';
import noteRoute from './note.route.js';

// routes
const protectedRouter = express.Router();
const unProtectedRouter = express.Router();

// Protected Routes
protectedRouter.use("/contact", contactRoute);
protectedRouter.use("/file", fileRoute);
protectedRouter.use("/note", noteRoute);

// Un-Protected Routes
unProtectedRouter.use("/user", userRoute);

export { protectedRouter, unProtectedRouter };