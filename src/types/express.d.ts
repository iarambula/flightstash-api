type FlighstashUser = import("../entities/User").User;
declare namespace Express {
  export interface User extends FlighstashUser { }
  export interface Request {
    ability: import("@casl/ability").Ability;
  }
}