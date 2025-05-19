import express from "express";
import auth from "../middlewares/auth";
import { jobController } from "../controllers/job.controller";

const router = express.Router();

//? POST
//* Create job API
router.post("/create", auth({ isTokenRequired: true }), jobController.createJob.validation, jobController.createJob.handler);

//? GET
//* fetch all job API
router.get("/fetch-job", auth({ isTokenRequired: true }), jobController.fetchAllJob.validation, jobController.fetchAllJob.handler);

//* fetch job by id API
router.get("/fetch-job-by-id/:id", auth({ isTokenRequired: true }), jobController.fetchJobById.validation, jobController.fetchJobById.handler);

//? PUT
//* Update job API
router.put("/update-job/:id", auth({ isTokenRequired: true }), jobController.updateJob.validation, jobController.updateJob.handler);

//? DELETE
//* Delete job API
router.delete("/delete-job/:id", auth({ isTokenRequired: true }), jobController.deleteJob.validation, jobController.deleteJob.handler);

export default router;
