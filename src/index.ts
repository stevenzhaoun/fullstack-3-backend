import express, { Request, Response } from "express";
import prisma from "./prismaClient";

const app = express();

app.get('/', (request: Request, response: Response) => {
    console.log('Got request')
    response.send('I got your request!')
})

app.get('/roles', async (request: Request, response: Response) => {
    const roles = await prisma.role.findMany({
        include: {
            permissions: true,
        },
    });
    response.json(roles);
})

app.listen(8888, () => {
    console.log('Server is running on port 8888')
})