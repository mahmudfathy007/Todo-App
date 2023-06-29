import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllTodos = async (req, res) => {
  try {
    const { userName } = req.params;
    let todos;

    if (userName) {
      todos = await prisma.todo.findMany({
        where: {
          user: {
            userName: userName,
          },
        },
        select: {
          id: true,
          title: true,
        },
      });
    } else {
      todos = await prisma.todo.findMany({
        select: {
          id: true,
          title: true,
        },
      });
    }

    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving todos" });
  }
};

export const createTodo = async (req, res) => {
  try {
    const { userName } = req.params;
    const { title } = req.body;

    if (!title || !userName) {
      return res.status(400).json({ message: "Title and userName are required" });
    }

    const user = await prisma.user.findUnique({ where: { userName: userName } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const createdTodo = await prisma.todo.create({
      data: {
        title,
        userId: user.id,
      },
    });

    res.json(createdTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating todo" });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { userName, id } = req.params;

    if (!userName || !id) {
      return res.status(400).json({ message: "userName and id are required" });
    }

    const user = await prisma.user.findUnique({ where: { userName: userName } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const deletedTodo = await prisma.todo.delete({
      where: {
        id: id,
      },
    });

    res.json(deletedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting todo" });
  }
};

