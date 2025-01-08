import epxress from "express";
import { PipelineController } from "../controllers/index.js";
import { validate } from "../middleware/index.js";
import { PipelineValidation } from "../validations/index.js";

const router = epxress.Router();

router.get("/", PipelineController.getAll);

router.get("/:id", PipelineController.getById);

router.post("/", validate(PipelineValidation.create.bodySchema), PipelineController.create);

router.put("/:id", validate(PipelineValidation.update.bodySchema), PipelineController.update);

router.delete("/:id", PipelineController.delete);

export default router;
