import db from "../model/index";
import { Request } from "express";
import { helper } from "../common/utils/index";

//? /* Interface for query parameters */
interface _query {
  email?: string;
  phone?: string;
  phoneCountry?: string;
}

//? /* Function based user repo */
export const userRepository = {
  //* Register User repository function
  registerUser: async (req: Request) => {
    req.body.password_hash = await helper.hashPassword({
      password: req.body.password,
    });
    return await db.User.create(req.body);
  },

  //* Find User repository function
  findUser: async (req: Request) => {
    const criteria: _query = {
      ...(req.body.email && { email: req.body.email }),
    };

    return await db.User.findOne({
      where: criteria,
      raw: true,
      nest: true,
    });
  },
};
