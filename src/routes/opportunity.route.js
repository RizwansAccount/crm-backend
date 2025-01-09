import epxress from "express";
import { OpportunityController } from "../controllers/index.js";
import { validate } from "../middleware/index.js";
import { OpportunityValidation } from "../validations/index.js";

const router = epxress.Router();

router.get("/", OpportunityController.getAll);

router.get("/:id", OpportunityController.getById);

router.post("/", validate(OpportunityValidation.create.bodySchema), OpportunityController.create);

router.patch("/:id", validate(OpportunityValidation.update.bodySchema), OpportunityController.update);

router.delete("/:id", OpportunityController.delete);

export default router;
