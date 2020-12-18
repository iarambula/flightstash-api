import passport from "passport";
import { Strategy as LocalStrategy, VerifyFunction } from "passport-local";
import { getRepository } from "typeorm";

import { User } from "../entities/User";

const userRepo = getRepository(User);

const verify: VerifyFunction = async (email, password, done) => {
  try {
    const user = await userRepo.findOne({ email }, { select: ["id", "email", "password"] });
    if (!user) { return done(null, false) }
    if (!await user.verifyPassword(password)) { return done(null, false) }
    return done(null, user);
  } catch (error) {
    done(error);
  }
};

passport.use(new LocalStrategy({ usernameField: "email" }, verify));

passport.serializeUser<User, number>((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser<User, number>(async (id, done) => {
  try {
    const user = await userRepo.findOne(id, { relations: ["roles", "roles.organization"] });
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

export default passport;
