import db from "../model/index";
import { Request } from "express";
import { helper } from "../common/utils/index";
import { message } from "../common/constants";

interface _query {
  id?: string;
  isActive?: boolean;
}

//? /* Function based job repo */
export const jobRepository = {
  //* Register User repository function
  createJob: async (req: Request) => {
    return await db.Job.create(req.body);
  },

  //* Find all job repository function
  fetchAllJob: async (req: Request) => {
    const criteria: _query = {
      isActive: true,
    };

    return await db.Job.findAll({
      where: criteria,
      raw: true,
      nest: true,
    });
  },

  //* Find job by id repository function
  fetchJobById: async (req: Request) => {
    const criteria: _query = {
      ...(req.params.id && { id: req.params.id }),
    };

    return await db.Job.findOne({
      where: criteria,
      raw: true,
      nest: true,
    });
  },

  //* update job repository function
  updateJob: async (req: Request) => {
    return await db.Job.update(req.body, {
      where: {
        id: req.params.id,
      },
      raw: true,
      nest: true,
    });
  },

  //* delete job
  deleteJob: async (id: string) => {
    let job = await db.Job.destroy({
      where: { id: id },
      raw: true,
      nest: true,
    });

    if (job <= 0) return message.FAILED;
    return;
  },
};
