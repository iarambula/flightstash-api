import { RequestHandler } from "express";

export class OrganizationRolesController {
  static list: RequestHandler = async (req, res, next) => {
    res.json({ list: req.params });
  };

  static create: RequestHandler = async (req, res, next) => {
    res.json({ create: req.params });
  };

  static read: RequestHandler = async (req, res, next) => {
    res.json({ read: req.params });
  };

  static update: RequestHandler = async (req, res, next) => {
    res.json({ update: req.params });
  };

  static destroy: RequestHandler = async (req, res, next) => {
    res.json({ destroy: req.params });
  };
}
