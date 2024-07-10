import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import { ITodo } from "./models/ITodo";

const app = express();
const prisma = new PrismaClient();
const port = 3000;

app.use(express.json());

interface User {
  username: string;
  password: string;
}

interface Todo {
  title: string;
  description?: string;
  userId: number;
}

//Creating a new user locally
const createUser = async ({ username, password }: User) => {
  try {
    const res = await prisma.user.create({
      data: {
        username,
        password,
      },
    });
    console.log(res);
  } catch (error) {
    console.error("Erro accoured while adding user", error);
  }
};

//Creating Todo for a user
const addTodo = async ({ title, description, userId }: Todo) => {
  try {
    const res = await prisma.todo.create({
      data: {
        Title: title,
        Description: description,
        userId: userId,
      },
    });
    console.log(res);
  } catch (error) {
    console.error("Error while adding todo", error);
  }
};

//Get Todos for specific user
const getTodos = async (userId: number) => {
  try {
    const res = await prisma.todo.findMany({
      where: {
        userId,
      },
    });
    console.log(res);
    return res;
  } catch (error) {
    console.error("Error fetching todos", error);
  }
};

// createUser({ username: "kamrank", password: "myPass" });
// addTodo({ title: "Go to gym", description: "Please go to the gym", userId: 1 });
// getTodos(1);

app.post("/getTodos", async (req: Request, res: Response) => {
  const response: ITodo[] = (await getTodos(Number(req.query.userId))) ?? [];

  res.json(response);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
