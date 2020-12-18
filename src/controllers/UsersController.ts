import { getRepository } from "typeorm";
import { RequestHandler } from "express";
import { ForbiddenError } from "@casl/ability";
import { permittedFieldsOf } from "@casl/ability/extra"
import pick from "lodash/pick";

import { User } from "../entities/User";
import { plainToClass } from "class-transformer";

const userRepo = getRepository(User);

export class UsersController {
  static list: RequestHandler = async (req, res, next) => {
    const users = await userRepo.find();
    res.json({ users });
  };

  static create: RequestHandler = async (req, res, next) => {
    const fields = permittedFieldsOf(req.ability, "create", User);
    const user = userRepo.create(pick(req.body, fields) as User);
    ForbiddenError.from(req.ability).throwUnlessCan("create", user);
    res.json({ create: req.params, fields, user });
  };

  static read: RequestHandler = async (req, res, next) => {
    const user = await userRepo.findOneOrFail(req.params.id);
    const fields = permittedFieldsOf(req.ability, "read", user);
    ForbiddenError.from(req.ability).throwUnlessCan("read", user);
    res.json({ user: pick(user, fields) });
  };

  static update: RequestHandler = async (req, res, next) => {
    res.json({ update: req.params });
  };

  static destroy: RequestHandler = async (req, res, next) => {
    res.json({ destroy: req.params });
  };
}
