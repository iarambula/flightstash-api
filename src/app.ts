import express, { Handler } from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import session from "express-session";

import ability from "./config/abilities";
import passport from "./config/passport";
import router from "./config/router";
import { forbiddenErrorHandler } from "./config/errorHandler";

const app = express();

app.use(morgan("dev") as Handler);
app.use(bodyParser.json());
app.use(session({ secret: "keyboardcat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(ability());
app.use(router);
app.use(forbiddenErrorHandler());

export default app;
