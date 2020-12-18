import { Router } from "express";

import { AircraftReservationsController } from "../controllers/AircraftReservationsController";
import { OrganizationAircraftController } from "../controllers/OrganizationAircraftController";
import { OrganizationRolesController } from "../controllers/OrganizationRolesController";
import { OrganizationsController } from "../controllers/OrganizationsController";
import { SessionController } from "../controllers/SessionController";
import { UsersController } from "../controllers/UsersController";

import passport from "../config/passport";

const router = Router();

router.get("/organizations", OrganizationsController.list);
router.post("/organizations", OrganizationsController.create);
router.get("/organizations/:id", OrganizationsController.read);
router.patch("/organizations/:id", OrganizationsController.update);
router.delete("/organizations/:id", OrganizationsController.destroy);

router.get("/organizations/:organizationId/aircraft", OrganizationAircraftController.list);
router.post("/organizations/:organizationId/aircraft", OrganizationAircraftController.create);
router.get("/organizations/:organizationId/aircraft/:id", OrganizationAircraftController.read);
router.patch("/organizations/:organizationId/aircraft/:id", OrganizationAircraftController.update);
router.delete("/organizations/:organizationId/aircraft/:id", OrganizationAircraftController.destroy);

router.get("/organizations/:organizationId/roles", OrganizationRolesController.list);
router.post("/organizations/:organizationId/roles", OrganizationRolesController.create);
router.get("/organizations/:organizationId/roles/:id", OrganizationRolesController.read);
router.patch("/organizations/:organizationId/roles/:id", OrganizationRolesController.update);
router.delete("/organizations/:organizationId/roles/:id", OrganizationRolesController.destroy);

router.get("/aircraft/:aircraftId/reservations", AircraftReservationsController.list);
router.post("/aircraft/:aircraftId/reservations", AircraftReservationsController.create);
router.get("/aircraft/:aircraftId/reservations/:id", AircraftReservationsController.read);
router.patch("/aircraft/:aircraftId/reservations/:id", AircraftReservationsController.update);
router.delete("/aircraft/:aircraftId/reservations/:id", AircraftReservationsController.destroy);

router.get("/users", UsersController.list);
router.post("/users", UsersController.create);
router.get("/users/:id", UsersController.read);
router.patch("/users/:id", UsersController.update);
router.delete("/users/:id", UsersController.destroy);

router.post("/session", passport.authenticate("local"), SessionController.create);
router.get("/session",  SessionController.read);
router.delete("/session", SessionController.destroy);

export default router;
