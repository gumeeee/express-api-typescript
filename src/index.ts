import express from "express";
import { config } from "dotenv";
import { MongoGetUsersRepository } from "./repository/get-users/mongo-get-users";
import { GetUsersController } from "./controllers/get-users/get-users";
import { MongoClient } from "./database/mongo";
import { MongoCreateUserRepository } from "./repository/create-user/mongo-create-user";
import { CreateUserController } from "./controllers/create-user/create-user";
import { MongoUpdateUserRepository } from "./repository/update-user/mongo-update-user";
import { UpdateUserController } from "./controllers/update-user/update-user";
import { MongoDeleteUserRepository } from "./repository/delete-user/mongo-delete-user";
import { DeleteUserController } from "./controllers/delete-user/delete-user";

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

  app.patch("/users/:id", async (req, res) => {
    const mongoUpdateUserRepository = new MongoUpdateUserRepository();
    const updateUserController = new UpdateUserController(
      mongoUpdateUserRepository
    );

    const { body: requestBody, params } = req;

    const { body, statusCode } = await updateUserController.handle({
      body: requestBody,
      params,
    });

    res.status(statusCode).send(body);
  });

  app.delete("/users/:id", async (req, res) => {
    const mongoDeleteUserRepository = new MongoDeleteUserRepository();
    const deleteUserController = new DeleteUserController(
      mongoDeleteUserRepository
    );

    const { params } = req;

    const { body, statusCode } = await deleteUserController.handle({
      params,
    });

    res.status(statusCode).send(body);
  });

  const port = process.env.PORT || 8000;

  app.listen(port, () => console.log(`Server is running on port ${port}`));
};

main();
