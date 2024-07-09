import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

const getTodos = async (userId: number) => {
  try {
    const res = await prisma.todo.findMany({
      where: {
        userId,
      },
    });
    console.log(res);
  } catch (error) {
    console.error("Error fetching todos", error);
  }
};

// createUser({ username: "kamrank", password: "myPass" });
// addTodo({ title: "Go to gym", description: "Please go to the gym", userId: 1 });
getTodos(1);
