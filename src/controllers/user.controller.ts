import { Request, Response } from "express";
import { ApiResponse } from "../common/utils/index";
import { userService } from "../services/user.service";
import { validator } from "../middlewares/validator";
import Joi from "joi";
import { message } from "../common/constants/index";

//* Function based user controller modules
export const userController = {
  //? Register User Controller Function
  registerUser: {
    //* Validation for register user
    validation: validator({
      body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      }),
    }),

    //* Register user controller function
    handler: async (req: Request, res: Response) => {
      //* Register user service function
      let user = await userService.registerUser(req);

      //* Check if user type is string
      if (typeof user === "string") {
        return ApiResponse.BAD_REQUEST({ res, message: user });
      }

      return ApiResponse.OK({ res, message: "User created successfully.", payload: user });
    },
  },

  // ? Login User Controller Function
  loginUser: {
    //* Validation for login user
    validation: validator({
      body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      }),
    }),

    //* Login user controller function
    handler: async (req: Request, res: Response) => {
      //* Login user service function
      let user = await userService.loginUser(req);

      //* Check if user is not found
      if (user === message.USER_NOT_FOUND) {
        return ApiResponse.NOT_FOUND({ res, message: message.USER_NOT_FOUND });
      }

      //* Check if user is already verified
      if (typeof user == "string") {
        return ApiResponse.BAD_REQUEST({ res, message: user });
      }

      return ApiResponse.OK({ res, message: "User logged in successfully.", payload: user });
    },
  },
};
