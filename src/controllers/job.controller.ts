import { Request, Response } from "express";
import { ApiResponse } from "../common/utils/index";
import { jobService } from "../services/job.service";
import { validator } from "../middlewares/validator";
import Joi from "joi";
import { message } from "../common/constants/index";

//* Function based job controller modules
export const jobController = {
  //? Create job Controller Function
  createJob: {
    //* Validation for create job
    validation: validator({
      body: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
      }),
    }),

    //* create job controller function
    handler: async (req: Request, res: Response) => {
      //* create job service function
      let job = await jobService.createJob(req);

      //* Check if job type is string
      if (typeof job === "string") {
        return ApiResponse.BAD_REQUEST({ res, message: job });
      }

      return ApiResponse.OK({ res, message: "job created successfully.", payload: job });
    },
  },

  // ? fetch job Controller Function
  fetchAllJob: {
    //* Validation for fetch job
    validation: validator({
      body: Joi.object({}),
    }),

    //* fetch job controller function
    handler: async (req: Request, res: Response) => {
      //* fetch job service function
      let job = await jobService.fetchAllJob(req);

      if (typeof job == "string") return ApiResponse.BAD_REQUEST({ res, message: job });

      return ApiResponse.OK({ res, message: "job fetch in successfully.", payload: job });
    },
  },

  //? Get job  Controller Function
  fetchJobById: {
    //* Validation for fetch job
    validation: validator({
      params: Joi.object({
        id: Joi.string().required(),
      }),
    }),

    //* fetch job controller function
    handler: async (req: any, res: Response) => {
      // * Get job  service function
      let job = await jobService.fetchJobById(req);

      if (typeof job == "string") {
        return ApiResponse.BAD_REQUEST({ res, message: job });
      }

      return ApiResponse.OK({ res, message: message.SUCCESS, payload: job });
    },
  },

  //? Update job Controller Function
  updateJob: {
    //* Validation for create job
    validation: validator({
      body: Joi.object({
        title: Joi.string(),
        description: Joi.string(),
      }),
      params: Joi.object({
        id: Joi.string().required(),
      }),
    }),

    //* update job controller function
    handler: async (req: Request, res: Response) => {
      //* update job service function
      let job = await jobService.updateJob(req);

      //* Check if job type is string
      if (typeof job === "string") {
        return ApiResponse.BAD_REQUEST({ res, message: job });
      }

      return ApiResponse.OK({ res, message: "job updated successfully.", payload: job });
    },
  },

  //? Delete job Controller Function
  deleteJob: {
    //* Validation for delete job
    validation: validator({
      params: Joi.object({
        id: Joi.string().required(),
      }),
    }),

    //* delete job controller function
    handler: async (req: Request, res: Response) => {
      //* delete job service function
      let job = await jobService.deleteJob(req);

      //* Check if job type is string
      if (typeof job === "string") {
        return ApiResponse.BAD_REQUEST({ res, message: job });
      }

      return ApiResponse.OK({ res, message: "job deleted successfully.", payload: job });
    },
  },
};
