import { NextFunction, Request, Response } from "express";
import { ApiResponse, helper } from "../common/utils/index";
import db from "../model/index";
import { message, enums } from "../common/constants/index";

//* Interface for auth options parameters
export interface AuthOptions {
  isTokenRequired?: boolean;
  usersAllowed?: string[];
}

//* Interface for find user from database
export interface User {
  id: string;
  email: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const auth = ({ isTokenRequired = true, usersAllowed = [] }: AuthOptions) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //* get token from request header and remove Bearer from it
    const token = (req.header("x-auth-token") || req.header("Authorization"))?.replace(/Bearer +/g, "");

    //* check if token is required and token is present in the request header or not`
    if (token === undefined) return ApiResponse.UNAUTHORIZED({ res, message: "Access denied. No token provided." });

    //* check if token is required and token is present in the request header or not
    if (isTokenRequired && !token) return ApiResponse.UNAUTHORIZED({ res, message: "Access denied. No token provided." });

    //* check if token is not required and token is present in the request header or not
    if (!isTokenRequired && !token) return next();

    //* decode token and get user details from it
    let decoded: any = await helper.decodeToken({ token });

    // * check if docoded token is valid or not
    if (!decoded) return ApiResponse.UNAUTHORIZED({ res, message: "Access denied. Invalid token." });

    //* check if token is valid or not
    if (decoded?.exp < Date.now() / 1000) return ApiResponse.UNAUTHORIZED({ res, message: "Access denied. Token expired." });

    //* check if user is present in the database or not
    let user: User = await db.User.findOne({ where: { id: decoded.id }, raw: true, nest: true });

    //* check if user is present in the database or not
    if (!user) return ApiResponse.UNAUTHORIZED({ res, message: "Access denied. Invalid token." });

    //* check if user is active or not
    if (!user.isActive) return ApiResponse.UNAUTHORIZED({ res, message: "Access denied. User is not active." });

    //* Make user object and assign user details to it
    req.user = {
      id: user.id,
    };
    next();
  };
};
export default auth;
