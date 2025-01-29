import express from "express";
import { config } from "dotenv";
import { MongoGetUsersRepository } from "./repository/get-users/mongo-get-users";
import { GetUsersController } from "./controllers/get-users/get-users";
import { MongoClient } from "./database/mongo";
import { MongoCreateUserRepository } from "./repository/create-user/mongo-create-user";
import { CreateUserController } from "./controllers/create-user/create-user";

const main = async () => {
  config();

  const app = express();

  app.use(express.json());

  await MongoClient.connect();

  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUsersController(mongoGetUsersRepository);

    const { body, statusCode } = await getUsersController.handle();

    res.status(statusCode).send(body);
  });

  app.post("/users", async (req, res) => {
    const mongoCreateUserRepository = new MongoCreateUserRepository();
    const createUserController = new CreateUserController(
      mongoCreateUserRepository
    );

    const { body: requestBody } = req;

    const { body, statusCode } = await createUserController.handle({
      body: requestBody,
    });

    res.status(statusCode).send(body);
  });

  const port = process.env.PORT || 8000;

  app.listen(port, () => console.log(`Server is running on port ${port}`));
};

main();
