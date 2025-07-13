import { Router } from "express";
import { parseWebPage } from "../controllers/parserController";

const router = Router();

router.post("/parse-web-page", parseWebPage);

export default router;
