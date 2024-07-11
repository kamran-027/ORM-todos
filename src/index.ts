import express, { Request, Response } from "express";
import zod from "zod";
import { addTodo, addUser, getTodos } from "./common/function";
import { PrismaClient } from "@prisma/client";

const app = express();
const port = 3000;
const prisma = new PrismaClient();

app.use(express.json());

const userSchema = zod.object({
  username: zod.string().min(3),
  password: zod.string(),
});

const todoSchema = zod.object({
  Title: zod.string().min(3),
  Description: zod.string().optional(),
  userId: zod.number(),
});

app.post("/signup", async (req: Request, res: Response) => {
  if (!userSchema.safeParse(req.body)) {
    return res.json({
      error: "Check the deails again",
    });
  }

  //Checking for existing users
  const existingUser = await prisma.user.findFirst({
    where: {
      username: req.body.username,
    },
  });

  if (existingUser) {
    return res.json({
      error: "User already exists",
    });
  }

  const userId = await addUser(req.body);

  res.json({ message: `User with id ${userId} created successfully!` });
});

app.post("/addTodo", async (req: Request, res: Response) => {
  if (!todoSchema.safeParse(req.body)) {
    return res.json({
      error: "Please check the details again",
    });
  }

  await addTodo(req.body);

  res.json({
    message: "Todo added successfully!",
  });
});

app.get("/getTodos/:userId", async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);

  const existingUser = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  console.log(existingUser);

  if (!existingUser) {
    return res.json({
      error: "User does not exist",
    });
  }

  const todos = await getTodos(userId);

  res.status(200).json({
    todos: todos,
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
