import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request, 
  response: Response, 
  next: NextFunction
  ) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError("Token missing", 401);
    }

    const token = authHeader.split(" ")[1];
    try{
      const { sub: user_id } = await verify(token, "80bab4aaf22c1c2c0f68045ff556f417") as IPayload;

      const usersRepository = new UsersRepository();

      const user = usersRepository.findById(user_id);

      if (!user) {
        throw new AppError("User does not exists", 401);
      }

      request.user = {
        id: user_id
      }

      next();
    } catch(err) {
      throw new AppError("Invalid token!", 401);
    }
    
}