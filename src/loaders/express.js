import express from "express";
import cors from "cors";
import helmet from "helmet";
import { protectedRouter, unProtectedRouter } from "../routes/index.js";
import { authenticate } from "../middleware/index.js";

export default async function expressLoader({ app }) {
	app.use(cors());
	app.use(helmet());

	app.use(express.json());
	app.use(express.urlencoded({ extended : true }));

	app.use("/crm/api/", unProtectedRouter);
	app.use("/crm/api/", authenticate, protectedRouter);
}