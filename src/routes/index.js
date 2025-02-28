import express from "express";
import userRoute from './user.route.js';
import contactRoute from './contact.route.js';
import leadRoute from './lead.route.js';
import fileRoute from './file.route.js';
import noteRoute from './note.route.js';
import assignmentRoute from './assignment.route.js';
import pipelineRoute from './pipeline.route.js';
import stageRoute from './stage.route.js';
import opportunityRoute from './opportunity.route.js';

// routes
const protectedRouter = express.Router();
const unProtectedRouter = express.Router();

// Protected Routes
protectedRouter.use("/contact", contactRoute);
protectedRouter.use("/lead", leadRoute);
protectedRouter.use("/file", fileRoute);
protectedRouter.use("/note", noteRoute);
protectedRouter.use("/assignment", assignmentRoute);
protectedRouter.use("/pipeline", pipelineRoute);
protectedRouter.use("/stage", stageRoute);
protectedRouter.use("/opportunity", opportunityRoute);

// Un-Protected Routes
unProtectedRouter.use("/user", userRoute);

export { protectedRouter, unProtectedRouter };