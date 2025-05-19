import { jobRepository } from "../repositories/job.repository";
import { Request } from "express";
import { enums, message } from "../common/constants/index";
import { helper } from "../common/utils/index";
import config from "../config/env.config";

//* Function based job service modules
export const jobService = {
  //* create job Service Function
  createJob: async (req: Request) => {
    return await jobRepository.createJob(req);
  },

  //* fetch all job Service Function
  fetchAllJob: async (req: Request) => {
    return await jobRepository.fetchAllJob(req);
  },

  //* getjobProfile job Service Function
  fetchJobById: async (req: Request) => {
    const job = await jobRepository.fetchJobById(req);
    if (!job) return "Job is not found";

    return job;
  },

  //* create job Service Function
  updateJob: async (req: Request) => {
    await jobRepository.updateJob(req);
    return await jobRepository.fetchJobById(req);
  },

  //* create job Service Function
  deleteJob: async (req: Request) => {
    const job = await jobRepository.fetchJobById(req);
    if (!job) return "job is not found";

    return await jobRepository.deleteJob(req?.params?.id);
  },
};
