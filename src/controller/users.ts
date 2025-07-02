import { Request, Response } from "express";
import prisma from "../prismaClient";
import bcrypt from "bcrypt";

export const createUser = async (request:Request, response: Response) => {
    const { name, email, password, role_id } = request.body;
    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            role: {
                connect: {
                    id: role_id
                }
            },
            password: {
                create: {
                    hash: bcrypt.hashSync(password, 10)
                }
            }
        }
    })
    response.status(201).json(user);
}


export const updateUser = async (request: Request, response: Response) => {
    const { id } = request.params;
    const user = await prisma.user.findUnique({
        where: {
            id: Number(id),

        }
    })

    if(!user) {
        response.status(404).send('User not found');
        return
    }

    const updatedUser = await prisma.user.update({
        where: {
            id: Number(id)
        },
        data: {
            name: request.body.name || user.name,
            email: request.body.email || user.email,
            role: {
                connect: {
                    id: request.body.role_id || user.role_id
                }
            }
        }
    })
    response.json(updatedUser);
}


export const listUsers = async (request: Request, response: Response) => {
    const users = await prisma.user.findMany({
        include: {
            role: true
        },
        orderBy: {
            id: 'asc'
        }
    });
    response.json(users);
}

export const getUser = async (request: Request, response: Response) => {
    const { id } = request.params;
    const user = await prisma.user.findUnique({
        where: {
            id: Number(id)
        }
    })

    if (!user) {
        response.status(404).send('User not found');
        return
    }

    response.json(user);
}

export const deleteUser = async (request: Request, response: Response) => {
    const { id } = request.params;
    const user = await prisma.user.findUnique({
        where: {
            id: Number(id)
        }
    })
    if(!user) {
        response.status(404).send('User not found');
        return
    }

    await prisma.user.delete({
        where: {
            id: Number(id)
        }
    })
    response.json({ message: 'User deleted successfully' });
}   