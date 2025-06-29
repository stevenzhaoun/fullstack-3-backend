import { Request, Response } from "express";
import prisma from "../prismaClient";

export const createOrder = async (request: Request, response: Response) => {
    const { email, name, total, productIds } = request.body;
    
    await prisma.order.create({
        data: {
            email: email,
            name: name,
            total: total,
            prodcuts: {
                connect: productIds.map((id: number) => ({ id }))
            }
        }
    });
    
    response.status(201).json({ message: 'Order created successfully' });
}

export const updateOrder = async (request: Request, response: Response) => {
    const { id } = request.params;
    const order = await prisma.order.findUnique({
        where: {
            id: Number(id),
        },
        include: {
            prodcuts: true
        }
    });

    if (!order) {
        response.status(404).send('Order not found');
        return;
    }

    await prisma.order.update({
        where: {
            id: Number(id)
        },
        data: {
            email: request.body.email || order.email,
            name: request.body.name || order.name,
            total: request.body.total || order.total,
            prodcuts: request.body.productIds ? {
                set: request.body.productIds.map((id: number) => ({ id }))
            } : undefined
        }
    });
    
    response.json({ message: 'Order updated successfully' });
}

export const listOrders = async (request: Request, response: Response) => {
    const orders = await prisma.order.findMany({
        include: {
            prodcuts: true
        }
    });
    response.json(orders);
}

export const getOrder = async (request: Request, response: Response) => {
    const { id } = request.params;
    const order = await prisma.order.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            prodcuts: true
        }
    });

    if (!order) {
        response.status(404).send('Order not found');
        return;
    }

    response.json(order);
}

export const deleteOrder = async (request: Request, response: Response) => {
    const { id } = request.params;
    const order = await prisma.order.findUnique({
        where: {
            id: Number(id)
        }
    });
    
    if (!order) {
        response.status(404).send('Order not found');
        return;
    }

    await prisma.order.delete({
        where: {
            id: Number(id)
        }
    });
    
    response.json({ message: 'Order deleted successfully' });
} 