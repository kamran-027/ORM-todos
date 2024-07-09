"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
//Creating a new user locally
const createUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ username, password }) {
    try {
        const res = yield prisma.user.create({
            data: {
                username,
                password,
            },
        });
        console.log(res);
    }
    catch (error) {
        console.error("Erro accoured while adding user", error);
    }
});
//Creating Todo for a user
const addTodo = (_a) => __awaiter(void 0, [_a], void 0, function* ({ title, description, userId }) {
    try {
        const res = yield prisma.todo.create({
            data: {
                Title: title,
                Description: description,
                userId: userId,
            },
        });
        console.log(res);
    }
    catch (error) {
        console.error("Error while adding todo", error);
    }
});
const getTodos = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield prisma.todo.findMany({
            where: {
                userId,
            },
        });
        console.log(res);
    }
    catch (error) {
        console.error("Error fetching todos", error);
    }
});
// createUser({ username: "kamrank", password: "myPass" });
// addTodo({ title: "Go to gym", description: "Please go to the gym", userId: 1 });
getTodos(1);
