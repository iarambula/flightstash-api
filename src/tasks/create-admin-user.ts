import { createConnection, getRepository } from "typeorm";

import { Reservation } from "../entities/Reservation";
import { User } from "../entities/User";

const createAdminUser = async () => {
  const connection = await createConnection("default");

  const userRepo = getRepository(User);
  const adminUser = await userRepo.findOne({ isAdmin: true });

  if (adminUser) {
    console.log("Admin user already exists");
    console.log(adminUser);
  } else {
    const user = userRepo.create({
      email: "iarambula11@gmail.com",
      password: "secret",
      isAdmin: true
    });
    await userRepo.save(user);
  }

  await connection.close();
};

createAdminUser();
