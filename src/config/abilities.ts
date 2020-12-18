import { Ability, AbilityBuilder } from '@casl/ability';
import { RequestHandler } from 'express';
import { User } from "../entities/User";
import { RoleName } from '../entities/UserOrganizationRole';

export const defineAbilitiesFor = (user: User) => {
  const { can, rules } = new AbilityBuilder<Ability>();

  if (user?.isAdmin) {
    can("manage", "all");
  } else if (user) {
    const ownerRoles = user.roles.filter(role => role.name === RoleName.OWNER);
    const ownerOrgIds = ownerRoles.map(org => org.id);

    const memberRoles = user.roles.filter(role => role.name === RoleName.MEMBER);
    const memberOrgIds = memberRoles.map(org => org.id);

    can("manage", "User", { id: user.id });

    can("manage", "Aircraft", { "organization.id": { $in: ownerOrgIds } });
    can("manage", "AircraftImage", { "aircraft.organization.id": { $in: ownerOrgIds } });
    can("manage", "Organization", { "id": { $in: ownerOrgIds } });
    can("manage", "Reservation", { "aircraft.organization.id": { $in: ownerOrgIds } });
    can("manage", "UserOrganizationRole", { "organization.id": { $in: ownerOrgIds } });

    can("read", "Aircraft", { "organization.id": { $in: memberOrgIds } });
    can("read", "AircraftImages", { "aircraft.organization.id": { $in: memberOrgIds } });
    can("read", "Organization", { "id": { $in: memberOrgIds } });
    can("manage", "Reservation", { "owner.id": user.id });
    can("read", "UserOrganizationRole", { "organization.id": { $in: memberOrgIds } });
  } else {
    can("create", "User", ["email", "password"]);
  }

  return new Ability(rules);
};

export const ability: () => RequestHandler = () => {
  return (req, res, next) => {
    req.ability = defineAbilitiesFor(req.user);
    next();
  };
};

export default ability;
