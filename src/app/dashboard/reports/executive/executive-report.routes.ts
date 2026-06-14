import { Router }
from "express";

import {
  summary
}
from "./executive-report.controller";

const router =
  Router();

router.get(
  "/executive-report",
  summary
);

export default router;