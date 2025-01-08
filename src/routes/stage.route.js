import epxress from "express";
import { StageController } from "../controllers/index.js";
import { validate } from "../middleware/index.js";
import { StageValidation } from "../validations/index.js";

const router = epxress.Router();

router.get("/", StageController.getAll);

router.get("/:id", StageController.getById);

router.post("/", validate(StageValidation.create.bodySchema), StageController.create);

router.put("/:id", validate(StageValidation.update.bodySchema), StageController.update);

router.delete("/:id", StageController.delete);

export default router;