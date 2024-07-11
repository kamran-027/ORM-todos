import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface User {
  username: string;
  password: string;
}

interface Todo {
  Title: string;
  Description?: string;
  userId: number;
}

//Creating a new User
export const addUser = async ({ username, password }: User) => {
  try {
    const res = await prisma.user.create({
      data: {
        username,
        password,
      },
    });
    console.log(res.id);

    return res.id;
  } catch (error) {
    console.error("Erro accoured while adding user", error);
  }
};

//Creating Todo for a user
export const addTodo = async ({ Title, Description, userId }: Todo) => {
  try {
    const res = await prisma.todo.create({
      data: {
        Title,
        Description,
        userId,
      },
    });
    console.log(res);
  } catch (error) {
    console.error("Error while adding todo", error);
  }
};

//Get Todos for specific user
export const getTodos = async (userId: number) => {
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
