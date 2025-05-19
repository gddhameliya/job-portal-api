import { Request, Response } from "express";
import ApiResponse from "../common/utils/apiResponse";
import { Router } from "express";
const router = Router();

import userRoute from "./user.routes";
import jobroute from "./job.routes"

router.use("/user", userRoute); //* User Routes
router.use("/job", jobroute); //* Job Routes

//* Root Route
router.get("/", async (req: Request, res: Response) => {
  return ApiResponse.OK({ res, message: `Welcome to the Juno Backend apis!`, });
});

//* Wrong Route
router.use((req: Request, res: Response) => {
  return ApiResponse.NOT_FOUND({ res, message: `Oops! Looks like you're lost.`, });
});

export default router;
