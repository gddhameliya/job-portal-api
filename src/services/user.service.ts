import { userRepository } from "../repositories/user.repository";
import { Request } from "express";
import { enums, message } from "../common/constants/index";
import { helper } from "../common/utils/index";
import config from "../config/env.config";

//* Function based user service modules
export const userService = {
  //* Register User Service Function
  registerUser: async (req: Request) => {
    let user = await userRepository.findUser(req);
    if (user) return message.USER_ALREADY_EXIST;

    let userData = await userRepository.registerUser(req);
    let token = await helper.generateToken({
      data: { id: userData.id, email: userData.email },
    });
    userData.dataValues.token = token;
    return userData;
  },

  //* Login User Service Function
  loginUser: async (req: Request) => {
    let user = await userRepository.findUser(req);
    if (!user) return message.USER_NOT_FOUND;

    if (
      req.body.password &&
      !(await helper.comparePassword({
        password: req.body.password,
        hashedPassword: user.password_hash,
      }))
    ) {
      return message.INVALID_PASSWORD;
    }

    let userData = await userRepository.findUser(req);

    delete userData.password_hash;
    return {
      ...userData,
      token: await helper.generateToken({
        data: { id: userData.id, email: userData.email },
      }),
    };
  },
};
