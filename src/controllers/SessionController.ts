import { getRepository } from "typeorm";
import { RequestHandler } from "express";

import { User } from "../entities/User";

const userRepo = getRepository(User);

export class SessionController {
  static create: RequestHandler = async (req, res, next) => {
    res.json({ create: req.params });
  };

  static read: RequestHandler = async (req, res, next) => {
    const user = await userRepo.findOne();
    res.json({ user });
  };

  static destroy: RequestHandler = async (req, res, next) => {
    res.json({ destroy: req.params });
  };
}
