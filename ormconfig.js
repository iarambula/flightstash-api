module.exports = [{
  name: "default",
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "ivan",
  password: "",
  database: "flightstash",
  entities: process.env.NODE_ENV === "production" ?
    ["build/entities/**/*.js"] :
    ["src/entities/**/*.ts"],
  migrations: process.env.NODE_ENV === "production" ?
    ["build/migrations/**/*.js"] :
    ["src/migrations/**/*.ts"],
  subscribers: process.env.NODE_ENV === "production" ?
    ["build/subscribers/**/*.js"] :
    ["src/subscribers/**/*.ts"],
  logging: true,
  cli: {
    entitiesDir: "src/entities",
    subscribersDir: "src/subscribers",
    migrationsDir: "src/migrations"
  }
}];
