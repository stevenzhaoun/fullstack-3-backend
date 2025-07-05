import prisma from "../prismaClient";
import { PERMISSIONS } from "../constants";
import bcrypt from "bcrypt";
const createAdminUser = async () => {
    await prisma.user.create({
        data: {
            name: 'admin',
            email: 'admin@admin.com',
            password: {
                create: {
                    hash: bcrypt.hashSync('admin', 10)
                }
            },
            role_id: 1
        },
    });

        console.log('Admin user created successfully');

}

createAdminUser()