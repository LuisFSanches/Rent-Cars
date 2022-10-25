import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
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
      throw new Error("Token missing");
    }

    const token = authHeader.split(" ")[1];
    try{
      const { sub: user_id } = await verify(token, "80bab4aaf22c1c2c0f68045ff556f417") as IPayload;

      const usersRepository = new UsersRepository();

      const user = usersRepository.findById(user_id);

      if (!user) {
        throw new Error("User does not exists");
      }

      next();
    } catch(err) {
      throw new Error("Invalid token!");
    }
    
}